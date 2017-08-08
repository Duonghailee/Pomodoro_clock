$('button').click(function() {
    var curr = $('#in').val();
    console.log(curr);
    var val = $(this).attr("value");
    switch (val) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '.':
        case '%':
        case '0':
        case '+':
        case '-':
        case '*':
        case '/':
            $('#in').val(curr + val);
            break;
        case 'AC':
        case 'CE':
            $('#in').val('');
            break;
        case 'delete':
            currArr = $('#in').val().split('');
            currArr.pop();
            $('#in').val(currArr.join(''));
            break;
        case '=':
            var result = eval($('#in').val());
            $('#in').val(result);
            break;
    }

});

$('input').keyup(function(e) {
    if (/[^0-9\+\-\*\/\.]/g.test(this.value)) {
        // Filter non-digits from input value.
        this.value = this.value.replace(/[^0-9\+\-\*\/\.]/g, "");
    }
});