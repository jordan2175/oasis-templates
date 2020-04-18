// --------------------------------------------------------------------------------
// Setup the document based on data from the SetupSidebar
// This is called from a button on the SetupSidebar page
// --------------------------------------------------------------------------------
function setupDocument(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname, dociprmode) {
  tcshortname = tcshortname.toLowerCase();
  setupFrontMatter(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname);
  setupStatusSection(tcfullname, tcshortname);
  setupIPR(tcshortname, dociprmode);
  setupCitation(docname, docver, docstage, docrev, tcshortname);
  resetFooter();
  setupFooter(docname, docver, docstage, docrev, docdate);
}

// --------------------------------------------------------------------------------
// Setup the front matter based on data from the SetupSidebar
// This is called from the setupDocument() function
// --------------------------------------------------------------------------------
function setupFrontMatter(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname) {
  var docstagefull = convertStageToLong(docstage);
  
  if (body.findText('##docname##')) {
    body.replaceText('##docname##', docname);
  }
  if (body.findText('##docver##')) {
    body.replaceText('##docver##', docver);
  }

  if (body.findText('##docstage##')) {
    body.replaceText('##docstage##', docstagefull);
  }
  
  if (body.findText('##docrev##')) {
    body.replaceText('##docrev##', docrev);
  }
  
  if (body.findText('##docdate##')) {
    body.replaceText('##docdate##', docdate);
  }
  
  if (body.findText('##officialtcname##')) {
    var re = body.findText('##officialtcname##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    var tcwebpage = 'https://www.oasis-open.org/committees/' + tcshortname + "/";
    t.setLinkUrl(start, end, tcwebpage);
    body.replaceText('##officialtcname##', tcfullname);
  } 
  
}

// --------------------------------------------------------------------------------
// Update the Status section based on data from the SetupSidebar
// This is called from the setupDocument() function
// --------------------------------------------------------------------------------
function setupStatusSection(tcfullname, tcshortname) {
  
  if (body.findText('##tcstatusfullname##')) {
    body.replaceText('##tcstatusfullname##', tcfullname);
  }

  if (body.findText('##tctechpage##')) {
    var re = body.findText('##tctechpage##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    var tctechpage = 'https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=' + tcshortname + '#technical';
    t.setLinkUrl(start, end, tctechpage);
    body.replaceText('##tctechpage##', tctechpage);
  }  
  
  if (body.findText('##tcsendacommentpage##')) {
    var re = body.findText('##tcsendacommentpage##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    var tcsendacommentpage = 'https://www.oasis-open.org/committees/comments/index.php?wg_abbrev=' + tcshortname;
    t.setLinkUrl(start, end, tcsendacommentpage);
    body.replaceText('##tcsendacommentpage##', "Send A Comment");
  }

  if (body.findText('##tcwebpage##')) {
    var re = body.findText('##tcwebpage##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    var tcwebpage = 'https://www.oasis-open.org/committees/' + tcshortname + "/";
    t.setLinkUrl(start, end, tcwebpage);
    body.replaceText('##tcwebpage##', tcwebpage);
  }
}


// --------------------------------------------------------------------------------
// Setup the IPR section based on data from the SetupSidebar
// This is called from the setupDocument() function
// --------------------------------------------------------------------------------
function setupIPR(tcshortname, dociprmode) {
  var iprname;
  var iprurl;
  
  switch(dociprmode) {
  case "na":
    iprname = 'Non-Assertion';
    iprurl = 'https://www.oasis-open.org/policies-guidelines/ipr#Non-Assertion-Mode';
    break;
  case "rflt":
    iprname = 'RF on Limited Terms';
    iprurl = 'https://www.oasis-open.org/policies-guidelines/ipr#RF-on-Limited-Mode';
    break;
  case "rfrt":
    iprname = 'RF on RAND Terms';
    iprurl = 'https://www.oasis-open.org/policies-guidelines/ipr#RF-on-RAND-Mode';
    break;
  case "rd":
    iprname = 'RAND';
    iprurl = 'https://www.oasis-open.org/policies-guidelines/ipr#RAND-Mode';
    break;
  default:
    iprname = 'Non-Assertion';
    iprurl = 'https://www.oasis-open.org/policies-guidelines/ipr#Non-Assertion-Mode';
  }
  
  if (body.findText('##dociprmode##')) {
    var re = body.findText('##dociprmode##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    t.setLinkUrl(start, end, iprurl);

    // Set document IPR declaration
    body.replaceText('##dociprmode##', iprname);
  }
  
  if (body.findText('##tciprpage##')) {
    var re = body.findText('##tciprpage##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    var tciprpage = 'https://www.oasis-open.org/committees/' + tcshortname + '/ipr.php';
    t.setLinkUrl(start, end, tciprpage);
    body.replaceText('##tciprpage##', tciprpage);
  }
}


// --------------------------------------------------------------------------------
// Setup the Citation section based on data from the SetupSidebar
// This is called from the setupDocument() function
// --------------------------------------------------------------------------------
function setupCitation(docname, docver, docstage, docrev, tcshortname) {
  // The passed in docname will be something like "Playbook Requirements"
  // We need to remove the spaces
  docname = docname.replace(/\ /g, '-');
  var citationName = docname + '-v' + docver;

  if (body.findText('##citationlabel##')) {
    body.replaceText('##citationlabel##', citationName);
  }

  if (body.findText('##doclink##')) {
    var re = body.findText('##doclink##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    
    var doclinkname = docname.toLowerCase();
    var doclinkpage = 'https://docs.oasis-open.org/' + tcshortname + '/' + doclinkname + '/v' + docver + '/' + docstage + docrev + '/' + doclinkname + '-v' + docver + '-' + docstage + docrev + '.html';
    t.setLinkUrl(start, end, doclinkpage);
    body.replaceText('##doclink##', doclinkpage);
  }

  if (body.findText('##doclinklatest##')) {
    var re = body.findText('##doclinklatest##');
    var start = re.getStartOffset();
    var end = re.getEndOffsetInclusive();
    var element = re.getElement();
    var t = element.asText();
    
    var doclinkname = docname.toLowerCase();
    var doclinkpage = 'https://docs.oasis-open.org/' + tcshortname + '/' + doclinkname + '/v' + docver + '/' + doclinkname + '-v' + docver + '.html';
    t.setLinkUrl(start, end, doclinkpage);
    body.replaceText('##doclinklatest##', doclinkpage);
  }
}

// --------------------------------------------------------------------------------
// Setup the footer based on data from the sidebars
// This is called from the updateFooter() and setupDocument() functions
// --------------------------------------------------------------------------------
function setupFooter(docname, docver, docstage, docrev, docdate) {
  var footer = doc.getFooter();
  var paragraphs = footer.getParagraphs();
  var doctrack = convertStageToTrack(docstage);
  
  // Build the filename based on provided data
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

  // Update the first line of the footer
  e0 = paragraphs[0];

  // Update filename name on first line of footer
  e0.replaceText('##docfilename##', docfilename);
      
  // Update the Working Draft ##, but only if this is a WD.
  if (docstage === "wd") {
    // Update document revision
    e0.replaceText('##docrev##', docrev);
  }
  else {
    // Remove the Working Draft ## for CSD, CS, CND, CN, but only if it is found
    e0.replaceText('Working Draft ##docrev##', "");
  }

  // Update the document date
  e0.replaceText('##docdate##', docdate);

  // Update the second line of the footer
  e1 = paragraphs[1];
  
  // Update document track type (standards track, non-standards track, standards track draft, etc)
  e1.replaceText('##doctrack##', doctrack);
}
