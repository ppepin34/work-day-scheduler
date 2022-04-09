var currentDay = document.getElementById("currentDay");
var toDo = [];

// compare currentTime against ids for class assignment
var updateTime = function () {

    // update time
    var currentTime = moment();

    // update day to current day
    currentDay.innerHTML = currentTime.format("dddd, MMMM Do");

    // pull ids from html
    var times = $("form textarea").toArray();

    // gets hour in military time
    var hour = currentTime.format("H");
    hour = parseInt(hour);

    // run for loop to check hour against ID and update classes
    for (var i = 0; i < times.length; i++) {
        // get id from array
        var id = parseInt(times[i].id);

        //check for past
        if (hour < id) {
            $(times[i]).removeClass("present past")
            $(times[i]).addClass("future");
        }

        // check for present
        else if (hour === id) {
            $(times[i]).removeClass("future past")
            $(times[i]).addClass("present");
        }

        // check for future
        else if (hour > id) {
            $(times[i]).removeClass("present future")
            $(times[i]).addClass("past");
        };
    };
};

$(".container textarea").click(function () {
    event.preventDefault();

    $(this).removeAttr("readonly")
        .removeClass("past present future");
});

$(".time-block").submit(function (event) {

    event.preventDefault();

    var toDoItem = this.children[1];

    // push id and text to array
    var id = toDoItem.id;
    var text = toDoItem.value;

    var toDoObj = {
        id: id,
        text: text
    };

    if (toDo.length === 0) {
        toDo.push(toDoObj)
    } else {
        for (var i = 0; i < toDo.length; i++) {
            console.log(i);
            if (toDo[i].id === id) {
                toDo[i].text = text
            }
            else {
                if (i === toDo.length - 1) {
                    toDo.push(toDoObj)
                }
            }
        }
    }

    // rearrange array?
    toDo.sort((a, b) => a.id - b.id);

    console.log(toDo);

    // reset css
    $(toDoItem).attr("readonly");

    // save toDo to localStorage
    localStorage.setItem("savedTasks", JSON.stringify(toDo));

    // updateTime
    updateTime();
});

// load savedTasks on reload
var loadTasks = function () {

    // get tasks from localStorage
    var savedTasks = localStorage.getItem("savedTasks");

    //check to see if tasks have been save, parse back into array of objects
    if (savedTasks === null) {
        return false;
    };

    toDo = JSON.parse(savedTasks);

    // assign each to it's proper space on 
    for (var i = 0; i < toDo.length; i++) {

        // find document that matches id
        if (document.getElementById(toDo[i].id)){
            
            //replace text in textarea with .text
            document.getElementById(toDo[i].id).value = toDo[i].text
        }


    }
}
loadTasks();

updateTime();

// interval to update
setInterval(function () {
    updateTime();
}, 300000)