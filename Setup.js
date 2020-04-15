// --------------------------------------------------------------------------------
// Setup the document based on data from the SetupSidebar
// This is called from a button on the SetupSidebar page
// --------------------------------------------------------------------------------
function setupDocument(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname, dociprmode) {
  tcshortname = tcshortname.toLowerCase();
  setupFrontMatter(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname);
  setupStatusSection(tcfullname, tcshortname, dociprmode);
  updateFooter(docname, docver, docstage, docrev, docdate);
}

// --------------------------------------------------------------------------------
// Setup the front matter based on data from the SetupSidebar
// This is called from the setupDocument() function
// --------------------------------------------------------------------------------
function setupFrontMatter(docname, docver, docstage, docrev, docdate, tcfullname, tcshortname) {
  var docstagefull;
  switch(docstage) {
  case "wd":
    docstagefull = 'Working Draft';
    break;
  case "csd":
    docstagefull = 'Committee Specification Draft';
    break;
  case "cs":
    docstagefull = 'Committee Specification';
    break;
  case "cnd":
    docstagefull = 'Committee Note Draft';
    break;
  case "cn":
    docstagefull = 'Committee Note';
    break;
  default:
    docstagefull = 'Working Draft';
  }

  
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
function setupStatusSection(tcfullname, tcshortname, dociprmode) {
  
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

  setupIPR(tcshortname, dociprmode);
}


// --------------------------------------------------------------------------------
// Update the IPR section based on data from the SetupSidebar
// This is called from the setupStatusSection() function
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
