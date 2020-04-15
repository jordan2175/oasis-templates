// Written by Bret Jordan
// https://github.com/jordan2175/oasis-templates
// Last updated 2020-04-14
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
  .addItem('Setup Document', 'showSetupSidebar')
  .addItem('Update Document', 'showUpdateSidebar')
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
// Populate the UpdateSidebar with the current values from the document
// This is called from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function getDataUpdateSidebar() {
  var paragraphs = body.getParagraphs();
  var e2 = paragraphs[2];
  var e3 = paragraphs[3];
  var e4 = paragraphs[4];
  
  var e2Text = e2.getText();
  var e2TextSplit = e2Text.match(/^(.*)\sVersion\s(\d\.\d+)$/);
  var initialdocname = e2TextSplit[1];
  var initialdocver = e2TextSplit[2];                               
  
  var e3Text = e3.getText();
  var e3TextSplit = e3Text.match(/^(.*)\s(\d+)$/);
  var docstagelong = e3TextSplit[1];
  var initialdocstage = convertStageToShort(docstagelong);
  var initialdocrev = e3TextSplit[2];
  
  var docdate = e4.getText();
  var docparts = docdate.split(' ');
  // We have a spelled out monht like April, we need the month number like 04
  var month = convertMonthToNumber(docparts[1]);
 
  var initialdocdate = docparts[2] + "-" + month + "-" + docparts[0];
  return [initialdocname, initialdocver, initialdocstage, initialdocrev, initialdocdate];
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
