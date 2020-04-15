// --------------------------------------------------------------------------------
// Reset the footer back to the vanilla template
// This is called directly from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function resetFooter() {
  var footer = doc.getFooter();
  var paragraphs = footer.getParagraphs();
  var docname = "##docfilename##";
  var doctrack = "##doctrack##";
  var docdate = "##docdate##";
  var docrev = "##docrev##";
  
  // Update the first line of the footer
  e0 = paragraphs[0];

  // Update document name
  e0.replaceText('^[a-zA-Z0-9\-\.]+', docname);

  // Update document revision
  if (e0.findText('Working Draft [0-9]+')) {
    var n = "Working Draft " + docrev;
    e0.replaceText('Working Draft [0-9]+', n);
  }
  else {
    // Add the Working Draft ## back in if it is missing
    var n = docfilename + "\tWorking Draft " + docrev + "\t##docdate##";
    e0.replaceText('^.*$', n);
  }
  
  // Update the document date
  e0.replaceText('\\d{2}\\s\\w+\\s\\d{4}$', docdate);
  
  
  // Update the second line of the footer
  e1 = paragraphs[1];
  
  // Update document track type (standards track, non-standards track, standards track draft, etc)
  if (e1.findText('Non-Standards Track Draft')) {
    e1.replaceText('Non-Standards Track Draft', doctrack);
  }
  else if (e1.findText('Non-Standards Track')) {
    e1.replaceText('Non-Standards Track', doctrack);
  }
  else if (e1.findText('Standards Track Draft')) {
    e1.replaceText('Standards Track Draft', doctrack);
  }
  else if (e1.findText('Standards Track')) {
    e1.replaceText('Standards Track', doctrack);
  }
}
