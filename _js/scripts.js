var hasStarted = false;
var isPaused = false;
var timerInterval;
var currState = 'Activity'; // or 'Break'

function updateTime() {
    if (!isPaused) {
        var secStr = "";
        var minStr = "";

        var minSec = $(".timeRemaining").html().split(":");
        var min = Number(minSec[0]);
        var sec = Number(minSec[1]);

        if (sec === 0) {
            sec = 59;
            min--;
        } else {
            sec--;
        }

        if (sec < 10) {
            secStr = "0" + sec;
        } else {
            secStr = sec.toString();
        }

        if (min < 10) {
            minStr = "0" + min;
        } else {
            minStr = min.toString();
        }

        if (min < 1) {
            $(".timer").css("animation-name", "redTimer");
        } else {
            $(".timer").css("animation-name", "greenTimer");
        }

        var timeStr = minStr + ":" + secStr;
        $(".timeRemaining").html(timeStr);

        if (min === 0 && sec === 0) {
            updateActivity();
        }
    }

}

function updateActivity() {
    if (currState == "Activity") {
        currState = "Break";
        $(".phaseHeader").html(currState);
        timeStr = $("#breakTime").val() + ":00";
        $(".timeRemaining").html(timeStr);
        $(".timer").css("animation-name", "greenTimer");
    } else {
        resetTimer();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    setUpTimer();
}

function setUpTimer() {
    currState = "Activity";
    $(".phaseHeader").html(currState);
    timeStr = $("#activityTime").val() + ":00";
    $(".timeRemaining").html(timeStr);
    $(".timer").css("animation-name", "none");
    hasStarted = false;
    isPaused = false;
}

function togglePause() {
    if (isPaused) {
        isPaused = false;
        $(".phaseHeader").html(currState);
    } else {
        isPaused = true;
        $(".phaseHeader").html("Paused");
        $(".timer").css("animation-name", "yellowTimer");
    }
}

function startTimer() {
    //if stopped or paused, start timer
    setUpTimer();
    timerInterval = setInterval(updateTime, 1000);
    hasStarted = true;
    updateTime();
}

function alterTimeRemaining(caller, direction) {
    if (caller.toLowerCase() === currState.toLowerCase()) {
        var minSec = $(".timeRemaining").html().split(":");
        var secStr = minSec[1];
        var minStr = "";

        var min = Number(minSec[0]);

        if (direction == "increment") {
            min++;
        } else if (direction == "decrement" && min > 0) {
            min--;
        }

        if (min < 10) {
            minStr = "0" + min;
        } else {
            minStr = min.toString();
        }

        var timeStr = minStr + ":" + secStr;
        $(".timeRemaining").html(timeStr);
    }
}

function changeTimerState() {
    (hasStarted) ? togglePause() : startTimer();
}

function changeTime(e) {
    var caller = e.target.className.split('_');
    var callTarget = "." + caller[1] + "Time";
    var i = Number($(callTarget).val());
    if (caller[0] == "increment") {
        i++;
    } else if (caller[0] == "decrement" && i > 0) {
        i--;
    }
    $(callTarget).val(i);

    if (!hasStarted) {
        setUpTimer();
    } else {
        alterTimeRemaining(caller[1], caller[0]);
    }
}

$(document).ready(function() {
    $(".timer").on("click", changeTimerState);
    $(".timer").on("dblclick", resetTimer);
    $("button").on("click", changeTime);
    $("input").on("focusout", setUpTimer);
    $("input").on("keypress", function(e) {
        if (e.originalEvent.key == "Enter") {
            setUpTimer();
        }
    });
});
