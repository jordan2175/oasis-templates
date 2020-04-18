// --------------------------------------------------------------------------------
// Update the document based on data from the UpdateSidebar
// This is called from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function updateDocument(docname, docver, docstage, docrev, docdate) {
  updateFrontMatter(docstage, docrev, docdate);
  //updateCitation(docname, docver, docstage, docrev, docdate);
  resetFooter();
  setupFooter(docname, docver, docstage, docrev, docdate);
}


// --------------------------------------------------------------------------------
// Update the front matter based on data from the UpdateSidebar
// This is called from the updateDocument()
// --------------------------------------------------------------------------------
function updateFrontMatter(docstage, docrev, docdate) {
  var paragraphs = body.getParagraphs();
  var e2 = paragraphs[2];
  var e3 = paragraphs[3];
  var e4 = paragraphs[4];
  
  var docstagefull = convertStageToLong(docstage) + " " + docrev;
  e3.replaceText('^[a-zA-Z\ ]+\\d{2}$', docstagefull);
  e4.replaceText('^\\d{2}\\s\\w+\\s\\d{4}$', docdate);
}


// --------------------------------------------------------------------------------
// Update the citation based on data from the UpdateSidebar
// This is called from the updateDocument()
// --------------------------------------------------------------------------------
function updateCitation(docname, docver, docstage, docrev, docdate) {
  var paragraphs = body.getParagraphs();
  var citationStartIndex = 0;

  // Find the paragraph that starts the Citation
  for (var i in paragraphs) {
    var element = paragraphs[i];
    if (element.findText('^Citation format:$')) {
        citationStartIndex = i;
        // No need to process the entire document so lets break
        break;
    }
  }  
  
  // Replace citation label [Foo-Bar-v1.0]
  var i1 = +citationStartIndex + 2;
  var e1 = paragraphs[i1];
  var citationName = docname.replace(/\ /g, '-');
  var citationFull1 = citationName + '-v' + docver;
  e1.replaceText('[a-zA-Z0-9\.\-]+', citationFull1);

  // Replace citation text
  var i2 = +citationStartIndex + 3;
  var e2 = paragraphs[i2];
  var citationFull2 = docname + ' Version ' + docver + '.';
  e2.replaceText('^[a-zA-Z0-9\\s]+Version\\s[\\d\.]+', citationFull2);  
  
  // Replace date in citation text
  e2.replaceText('\\d{2}\\s\\w+\\s\\d{4}', docdate);
  
  // Replace stage in citation text
  var stageName = convertStageToLong(docstage);
  var fullStage = 'OASIS ' + stageName + ' ' + docrev + '.';
  e2.replaceText('OASIS\\s[a-zA-Z\\s]+\\d+\.', fullStage);
  
  // First replace the two links with the defaults, this should make it easier 
  // as the code will be the same as the setup code
  var urlText = e2.findText('http.*html\.');
  urlText.getElement().asText().setLinkUrl(null);
  e2.replaceText('http.*html\.', '##doclink##. Latest version: ##doclinklatest##.');
}

