// --------------------------------------------------------------------------------
// Reset the footer back to the vanilla template
// This is called directly from a button on the UpdateSidebar page
// --------------------------------------------------------------------------------
function resetFooter() {
  var footer = doc.getFooter();
  var paragraphs = footer.getParagraphs();
  var doctrack = "##doctrack##\t";

  // Update the first line of the footer
  e0 = paragraphs[0];
  e0.replaceText('^.*$', '##docfilename##\tWorking Draft ##docrev##\t##docdate##');
 
  // Update the second line of the footer
  e1 = paragraphs[1];
  e1.replaceText('^[a-zA-Z\-\\s]+\t', doctrack);
}
