//minus break by one
var newTime = false;
var newTime_session = false;
var breakValue = $('#break').text();
var sessionValue = $('#session').text();
var break_block = false; //block the break clock adjustment when it is running
var session_block = false; //block the session clock adjustment when it is running
var break_clock = "off"; //default hide the break-clock, only turn on when sesison clock off
var session_clock = "on";

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





var isPause_session = true;

var y;


var reset_session = true;
var time_remaining;


// for session 
//initializing time elapsed when circle is click
$('#session-clock').on("click", function(e) {
    e.preventDefault();
    session_block = !session_block;

    isPause_session = !isPause_session;
    sessionValue = $('#session').text();

    var duration = sessionValue * 60, //to second
        display = '#session-value';

    // reset_session = !reset_session;
    if (!isPause_session && reset_session || newTime_session) {

        startTimer_session(duration, display);

    } else {
        startTimer_session(time_remaining, display);
    }



});
//var width = 0;
//var elem = $('#myBar');

function startTimer_session(duration, display) {
    var timer = duration;
    var min, sec;

    if (!isPause_session) {

        y = setTimeout(function() {

            //var z = progress();
            //
            if (newTime_session) {
                clearTimeout(y);
                // reset_session = true;
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
                //remaining = timer;
                if (timer > 0) {
                    startTimer_session(duration - 1, display);
                } else { //timer < 0 , count off
                    break_clock = "on";
                    session_clock = "off";
                    reset_session = true;
                    clearTimeout(y); //stop clock
                    $('#session-clock').hide();
                    $('#break-clock').show();
                    newTime_session = true;
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
                    break_clock = "off";
                    session_clock = "on";
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