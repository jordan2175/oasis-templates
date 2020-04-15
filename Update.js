// --------------------------------------------------------------------------------
// Update the document based on data from the UpdateSidebar
// This is called from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function updateDocument(docname, docver, docstage, docrev, docdate) {
  updateFrontMatter(docstage, docrev, docdate);
  updateFooter(docname, docver, docstage, docrev, docdate);
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
  
  // TODO Update Citation
}


// --------------------------------------------------------------------------------
// Update the footer based on data from the UpdateSidebar
// This is called from the updateDocument() and setupDocument() functions
// --------------------------------------------------------------------------------
function updateFooter(docname, docver, docstage, docrev, docdate) {
  var footer = doc.getFooter();
  var paragraphs = footer.getParagraphs();

  // We get input that says which stage the document is in, so we need to figure out the track type
  var doctrack = 'Standards Track Draft';
  if (docstage === "wd") {
    doctrack = 'Standards Track Draft';
  }
  else if (docstage === "csd") {
    doctrack = 'Standards Track Draft';
  }
  else if (docstage === "cs") {
    doctrack = 'Standards Track';
  }
  else if (docstage === "cnd") {
    doctrack = 'Non-Standards Track Draft';
  }
  else if (docstage === "cn") {
    doctrack = 'Non-Standards Track';
  }


  for (var i in paragraphs) {
    var element = paragraphs[i];
    
    // Update the first line of the footer
    if (i == 0) {
      // Update the filename on the first line of the footer
      var docfilename = "";
    
      // The passed in docname will be something like "Playbook Requirements"
      // We need to make this lower case and remove the spaces
      docname = docname.toLowerCase();
      docname = docname.replace(/\ /g, '-');
      if (docstage === "wd" || docstage === "csd" || docstage === "cnd") {
        docfilename = "draft-" + docname + '-v' + docver + '-' + docstage + docrev;
      }
      else {
        docfilename = docname + '-v' + docver + '-' + docstage + docrev;
      }

      // Update document name
      if (element.findText('##docfilename##')) {
        element.replaceText('##docfilename##', docfilename);
      }
      else {
        element.replaceText('^[a-zA-Z0-9\-\.]+', docfilename);
      }

      
      // Update the Working Draft ##, but only if this is a WD.
      if (docstage === "wd") {
        // Update document revision
        if (element.findText('##docrev##')) {
          element.replaceText('##docrev##', docrev);
        }
        else if (element.findText('Working Draft [0-9]+')) {
          var n = "Working Draft " + docrev;
          element.replaceText('Working Draft [0-9]+', n);
        }
        else {
          // Add the Working Draft ## back in if it is missing
          var n = docfilename + "\tWorking Draft " + docrev + "\t##docdate##";
          element.replaceText('^.*$', n);
        }
      }
      else {
        // Remove the Working Draft ## for CSD, CS, CND, CN, but only if it is found
        if (element.findText('##docrev##')) {
          element.replaceText('##docrev##', "");
        }
        else if (element.findText('Working Draft [0-9]+')) {
          element.replaceText('Working Draft [0-9]+', "");
        }
      }


      // Update the document date
      if (element.findText('##docdate##')) {
        element.replaceText('##docdate##', docdate);
      }
      else {
        element.replaceText('\\d{2}\\s\\w+\\s\\d{4}$', docdate);
      }
    }
    // End update first line
    
    
    // Update the second line of the footer
    if (i == 1) {
      // Update document track type (standards track, non-standards track, standards track draft, etc)
      if (element.findText('##doctrack##')) {
        element.replaceText('##doctrack##', doctrack);
      }
      else if (element.findText('Non-Standards Track Draft')) {
        element.replaceText('Non-Standards Track Draft', doctrack);
      }
      else if (element.findText('Non-Standards Track')) {
        element.replaceText('Non-Standards Track', doctrack);
      }
      else if (element.findText('Standards Track Draft')) {
        element.replaceText('Standards Track Draft', doctrack);
      }
      else if (element.findText('Standards Track')) {
        element.replaceText('Standards Track', doctrack);
      }
    }

  }
}
