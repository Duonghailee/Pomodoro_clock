/* 
this is a classic and dummy version for beginner, where object-oriend is not reachable, I am working on the new version with 
object oriented terminology
----- please note : there are 2 timers, one is break timer and the other session timer, they run recurssively after each one is finished
*/


var newTime = false; // default there is no time adjustment
var newTime_session = false;
var breakValue = $('#break').text(); // storing timer value from users, automatically get new value 
var sessionValue = $('#session').text();
var break_block = false; //default clock is off and time is adjustable , when clock on, time ajust function is not working
var session_block = false;


/* 
function handle click event when user decreases break/sesison timer value by one */
$('#break-minus').click(function() {
        if (!break_block) {
            newTime = true;
            breakValue--;
            if (breakValue <= 1) {
                $('#break').text(1);
                $('#break-value').text(1);
                breakValue = 1;
            } else {
                $('#break').text(breakValue);
                $('#break-value').text(breakValue);
            }
        }
    }


);

//minus session by one
$('#session-minus').click(function() {
        if (!session_block) {
            newTime_session = true;
            sessionValue--;
            if (sessionValue <= 1) {
                $('#session').text(1);
                $('#session-value').text(1);
                sessionValue = 1;
            } else {
                $('#session').text(sessionValue);
                $('#session-value').text(sessionValue);
            }
        }
    }

);


/* 
function handle click event when user increases break/sesison timer value by one */
//plus break by one
$('#break-plus').click(function() {
        if (!break_block) {
            newTime = true;
            breakValue++;
            $('#break').text(breakValue);
            $('#break-value').text(breakValue);

        }

    }

);

//plus session by one
$('#session-plus').click(function() {
        if (!session_block) {
            newTime_session = true;
            sessionValue++;
            $('#session').text(sessionValue);
            $('#session-value').text(sessionValue);
        }
    }

);





var isPause_session = true; // variable storing 'pause state', isPause receives false that mean timer is running

var y; // storing timeout value and reset when necessary


var reset_session = true; // wake up when resume the timer
var time_remaining; // storing remaining timer after 'pause' click from user, 


// for session 
//initializing time elapsed when circle is click
$('#session-clock').on("click", function(e) {
    e.preventDefault();
    session_block = !session_block;

    isPause_session = !isPause_session;
    sessionValue = $('#session').text();

    var duration = sessionValue * 60, //convert mins to seconds
        display = '#session-value'; //where putting the time form mm : ss


    /* only start a new timer when user adjust the timer value  
     */
    if (!isPause_session && reset_session || newTime_session) {

        startTimer_session(duration, display);

    } else { // if user just pauses, then resume the timer by setTimeout for remaining timer
        startTimer_session(time_remaining, display);
    }



});


function startTimer_session(duration, display) {
    var timer = duration;
    var min, sec;

    if (!isPause_session) {

        y = setTimeout(function() {


            if (newTime_session) { // if user adjust the timer, then reset the clock, also re-set the newTime to false for next adjust.
                clearTimeout(y);
                newTime_session = false;
            }


            if (!isPause_session) {
                reset_session = false;
                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);

                //adding 0 if i < 10
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;

                $(display).text(min + ":" + sec);


                if (timer > 0) {
                    startTimer_session(duration - 1, display);
                } else { //timer < 0 , count off

                    reset_session = true; // clock counts off, reset to new cycle.
                    clearTimeout(y); //stop clock
                    $('#session-clock').hide();
                    $('#break-clock').show();
                    newTime_session = true; //rest these values for next turn of break-clock
                    isPause_session = true;
                    session_block = false;
                    $('#break-clock').trigger('click');
                }

            } else {
                time_remaining = timer;
                clearTimeout(y);
            }

        }, 50);
    }

}


// everthing looks similar to session clock, now is break-clock, kind of repeated code, second version coming soon.
// sorry for a non-refactorring code version


var isPause = true;
var x;
var reset = true;
var remaining;



//initializing  break time elapsed when circle is click
$('#break-clock').on("click", function(e) {
    e.preventDefault();
    break_block = !break_block;

    isPause = !isPause;
    breakValue = $('#break').text();

    var duration = breakValue * 60, //to second
        display = '#break-value';


    if (!isPause && reset || newTime) {

        startTimer(duration, display);

    } else {
        startTimer(remaining, display);
    }




});

function startTimer(duration, display) {
    var timer = duration;
    var min, sec;
    if (!isPause) {

        x = setTimeout(function() {

            if (newTime) {
                clearTimeout(x);
                newTime = false;
            }
            if (!isPause) {
                reset = false;
                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);

                //adding 0 if i < 10
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;

                $(display).text(min + ":" + sec);
                //remaining = timer;
                if (timer > 0) {
                    startTimer(duration - 1, display);
                } else {
                    reset = true;
                    clearTimeout(x); //stop clock
                    $('#session-clock').show();
                    $('#break-clock').hide();
                    newTime = true;
                    isPause = true;
                    break_block = false;
                    $('#session-clock').trigger('click');

                }

            } else {
                remaining = timer;
                clearTimeout(x);
            }
        }, 50);
    }


}