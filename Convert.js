function convertStageToLong(docstage) {
  var stages = { 
    "wd" : "Working Draft", 
    "csd" : "Committee Specification Draft",
    "cs" : "Committee Specification",
    "cnd" : "Committee Note Draft",
    "cn" : "Committee Note"
  };

  return stages[docstage];
}

function convertStageToShort(docstage) {
  var stages = { 
    "Working Draft" : "wd", 
    "Committee Specification Draft" : "csd",
    "Committee Specification" : "cs",
    "Committee Note Draft" : "cnd",
    "Committee Note" : "cn"
  };

  return stages[docstage];
}

function convertMonthToNumber(month) {
  var months = { 
    "January" : "01", 
    "February" : "02",
    "March" : "03",
    "April" : "04",
    "May" : "05",
    "June" : "06",
    "July" : "07",
    "August" : "08",
    "September" : "09",
    "October" : "10",
    "November" : "11",
    "December" : "12"
  };

  return months[month]; 
}
