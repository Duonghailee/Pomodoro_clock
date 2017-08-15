//minus break by one
var newTime = false;
var breakValue = $('#break').text();
var sessionValue = $('#session').text();
var break_block = false; //block the clock when it is running
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

        sessionValue++;
        $('#session').text(sessionValue);
        $('#session-value').text(sessionValue);
    }

);


var isPause = true;
var x;
var remaining;
var reset = true;
var oldBreakValue;
//initializing time elapsed when circle is click
$('#break-clock').on("click", function(e) {
    e.preventDefault();
    break_block = !break_block;

    isPause = !isPause;
    breakValue = $('#break').text();

    var duration = breakValue * 60, //to second
        display = '#break-value';



    if (!isPause && reset) {

        startTimer(duration, display);

    }



});

function startTimer(duration, display) {
    var timer = duration;
    var min, sec;
    if (!isPause) {

        x = setInterval(function() {
            reset = false;
            if (newTime) {
                clearInterval(x);
                reset = true;
                newTime = false;
            }
            if (!isPause) {
                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);

                //adding 0 if i < 10
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;

                $(display).text(min + ":" + sec);
                timer--;
                //remaining = timer;
                if (timer < 0) {
                    reset = true;
                    clearInterval(x); //stop clock
                }
            }

        }, 1000);
    }


}