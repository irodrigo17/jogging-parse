exports.week = function(weeks, date){
  var dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);
  for(var i = 0; i < weeks.length; ++i){
    var week = weeks[i];
    if(dateOnly >= week.startDate && dateOnly <= week.endDate){
      return week;
    }
  }
  return null;
}

exports.createWeek = function(date){
  var weekDates = this.weekDates(date);
  var week = {
    startDate: weekDates[0],
    endDate: weekDates[1],
    distance: 0,
    time: 0,
    jogs: 0
  };
  return week;
}

exports.weekDates = function(date){
  var now = new Date(date);
  // reset time
  now.setHours(0,0,0,0);

  // get the previous monday
  var monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  // get next sunday
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  return [monday, sunday];
}
