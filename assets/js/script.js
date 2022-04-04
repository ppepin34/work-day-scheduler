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

    //gets currentHour in military time
    var currentHour = currentTime.format("H");
    currentHour = parseInt(currentHour);

    // run for loop to check hour against ID and update classes
    for (var i = 0; i < times.length; i++) {
        // get id from array
        var id = parseInt(times[i].id);

        //check for past
        if (currentHour < id) {
            $(times[i]).removeClass("present past")
            $(times[i]).addClass("future");
        }

        // check for present
        else if (currentHour === id) {
            $(times[i]).removeClass("future past")
            $(times[i]).addClass("present");
        }

        // check for future
        else if (currentHour > id) {
            $(times[i]).removeClass("present future")
            $(times[i]).addClass("past");
        };
    };
}

updateDay();
updateTime();

// interval to update
setInterval(function(){
    updateTime();
}, 300000)