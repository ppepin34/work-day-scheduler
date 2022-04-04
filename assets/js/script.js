var currentTime = moment();
var currentDay = document.getElementById("currentDay");

// update day to current day
var updateDay = function () {
    currentDay.innerHTML = currentTime.format("dddd, MMMM Do")
};

// compare currentTime against ids for class assignment
var updateTime = function () {
    // pull ids from html
    var times = $("li p").toArray();
    var currentHour = currentTime.format("H");
    currentHour = parseInt(currentHour);

    // run for loop to check against currentTime
    for (var i = 0; i < times.length; i++) {
        // get id from array
        var id = parseInt(times[i].id);

        //check id against time
        if (currentHour < id) {
            $(times[i]).removeClass("present past")
            $(times[i]).addClass("future");
        }
        else if (currentHour === id) {
            $(times[i]).removeClass("future past")
            $(times[i]).addClass("present");
        } else if (currentHour > id) {
            $(times[i]).removeClass("present future")
            $(times[i]).addClass("past");
        };
    };
}

updateDay();
updateTime();