// Written by Bret Jordan
// https://github.com/jordan2175/oasis-templates
// Last updated 2020-04-13
// Version 1.0
// Apache 2.0 License

// Permissions Needed
// View and manage Google Docs
// Display and run third-party web content in prompts and sidebars inside Google applications

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  var ui = DocumentApp.getUi();
  ui.createAddonMenu()
  .addItem('Name Document', 'setDocumentName')
  .addItem('Show Setup Sidebar', 'showSetupSidebar')
  .addItem('Show Update Sidebar', 'showUpdateSidebar')
  .addSubMenu(ui.createMenu('Heading Numbers')
              .addItem('1.2.3 (Markdown)', 'addMarkdownHeadingNumbers')
              .addItem('1.2.3 (Normal)', 'addSimpleHeadingNumbers')
              .addItem('Clear Heading Numbers', 'clearHeadingNumbers')
             )
  .addSeparator()
  .addItem('Table of Contents', 'addtoc')
  .addSeparator()
  .addItem('About', 'showAbout')
  .addToUi();
}


// --------------------------------------------------------------------------------
// Global variables
// --------------------------------------------------------------------------------
var ui = DocumentApp.getUi();
var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();



function showSetupSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('SetupSidebar').setTitle('OASIS Template Setup');
  ui.showSidebar(html);
}


function showUpdateSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('UpdateSidebar').setTitle('OASIS Template Editor');
  ui.showSidebar(html);
}


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

  
  if (body.findText('##specname##')) {
    body.replaceText('##specname##', docname);
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



// --------------------------------------------------------------------------------
// Update the document based on data from the UpdateSidebar
// This is called from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function updateDocument(docname, docver, docstage, docrev, docdate) {
  updateFrontMatter(docstage, docrev, docdate);
  updateFooter(docname, docver, docstage, docrev, docdate);
}


function updateFrontMatter(docstage, docrev, docdate) {
  var paragraphs = body.getParagraphs();
  var e3 = paragraphs[3];
  var e4 = paragraphs[4];

  var docstagefull;
  switch(docstage) {
  case "wd":
    docstagefull = 'Working Draft ' + docrev;
    break;
  case "csd":
    docstagefull = 'Committee Specification Draft ' + docrev;
    break;
  case "cs":
    docstagefull = 'Committee Specification ' + docrev;
    break;
  case "cnd":
    docstagefull = 'Committee Note Draft ' + docrev;
    break;
  case "cn":
    docstagefull = 'Committee Note ' + docrev;
    break;
  default:
    docstagefull = 'Working Draft ' + docrev;
  }
  
  e3.replaceText('^[a-zA-Z\ ]+\\d{2}$', docstagefull);
  e4.replaceText('^\\d{2}\\s\\w+\\s\\d{4}$', docdate);
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


// --------------------------------------------------------------------------------
// Reset the footer back to the vanilla template
// This is called directly from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function resetFooter() {
  var footer = doc.getFooter();
  var paragraphs = footer.getParagraphs();
  var docname = "##docname##";
  var doctrack = "##doctrack##";
  var docdate = "##docdate##";
  var docrev = "##docrev##";
  for (var i in paragraphs) {
    var element = paragraphs[i];
    
    // Update the first line of the footer
    if (i == 0) {
      // Update document name
      element.replaceText('^[a-zA-Z0-9\-\.]+', docname);

      
      // Update document revision
      if (element.findText('Working Draft [0-9]+')) {
        var n = "Working Draft " + docrev;
        element.replaceText('Working Draft [0-9]+', n);
      }
      else {
        // Add the Working Draft ## back in if it is missing
        var n = docfilename + "\tWorking Draft " + docrev + "\t##docdate##";
        element.replaceText('^.*$', n);
      }


      // Update the document date
      element.replaceText('\\d{2}\\s\\w+\\s\\d{4}$', docdate);
    }
    // End update first line
    
    
    // Update the second line of the footer
    if (i == 1) {
      // Update document track type (standards track, non-standards track, standards track draft, etc)
      if (element.findText('Non-Standards Track Draft')) {
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



// --------------------------------------------------------------------------------
// Ask the user for the document name and then set it
// --------------------------------------------------------------------------------
function setDocumentName() {
  var response = ui.prompt('Create Document Name', 'format of: draft<-doc-name-wd01>', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() == ui.Button.OK) {
    var docName = response.getResponseText();
    Logger.log('The document name entered was %s', docName);
    doc.setName(docName);
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('No document name entered, cancel was pressed');
  } else {
    Logger.log('No document name entered, the close button was clicked');
  }
}

