function updateTimer() {
    //check to see if Break or Activity is active and adjust timer value accordingly
    //if timer is running, adjust time by amount activityTime or breakTime were adjusted
    //if timer is not running, set timer value to value of activityTime or breakTime
    return;
}

function pauseTimer() {
    //pause timer, update clickTo verbiage
    return;
}

function startTimer() {
    //if stopped or paused, start timer
    return;
}

function changeTime(e) {
    var caller = e.target.className.split('_');
    var callTarget = "." + caller[1] + "Time";
    // console.log(caller);
    var i = Number($(callTarget).val());
    // console.log("i=" + i);
    if (i > 0) {
        (caller[0] == "increment") ? i++ : i--;
    } else if (i === 0) {
        if (caller[0] == "increment") {
            i++;
        }
    }
    $(callTarget).val(i);
    updateTimer();
}

$(document).ready(function() {
    $(".timer").on("click", startTimer);
    $("button").on("click", changeTime);
});
