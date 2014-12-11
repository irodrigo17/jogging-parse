
// average speed and distance
Parse.Cloud.define("report", function(request, response) {
  var query = new Parse.Query("Jog");
  query.equalTo("user", request.params.user);
  query.ascending("date");
  query.find({
    success: function(results) {
      var weeks = require("cloud/weeks.js");
      var weeksArray = [];
      for(var i = 0; i < results.length; ++i){
        var jog = results[i];
        var date = jog.get("date");
        var week = weeks.week(weeksArray, date);
        if(week == null){
          week = weeks.createWeek(date);
          console.log("created week: " + week.startDate + " - " + week.endDate + " for date: " + date);
          weeksArray[weeksArray.length] = week;
        }
        else{
          console.log("found week: " + week.startDate + " - " + week.endDate + " for date: " + date);
        }

        week.distance += jog.get("distance");
        week.time += jog.get("time");
        week.jogs++;
      }
      response.success(weeksArray);
    },
    error: function() {
      response.error("query failed");
    }
  });
});
