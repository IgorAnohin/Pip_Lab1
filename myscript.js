function draw_function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var min_element = width > height ? height : width;
    min_element /= 2;

    var radius_element = document.getElementById("radius");
    var radius = radius_element.value;

    if (radius == "") {
        radius = 2 * min_element / 10; //10%
    } else {
        radius *= min_element / 10;
    }

    ctx.beginPath();
    _draw_xy(ctx, width, height);

    ctx.fillStyle = "blue";

    ctx.moveTo(width/2, height/2);
    ctx.arc(width/2, height/2, radius, -Math.PI/2, 0);
    ctx.rect(width/2, height/2,radius,radius/2);

    ctx.moveTo(width/2 - radius, height/2);
    ctx.lineTo(width/2, height/2 - radius);
    ctx.lineTo(width/2, height/2);
    ctx.fill();

    ctx.stroke();
    ctx.fill();
}

function _draw_xy(ctx, width, height) {
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);

    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
}

function redraw() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_function();
}

function change_R(obj) {
    return _change_and_redraw(obj, 2, 5);
}

function change_Y(obj) {
    return _change_and_redraw(obj, -5, 5);
}

function _change_and_redraw(object, min_value, max_value) {
    var parameter = Number(object.value);

    if (isNaN(parameter) || object.value == "") {
        return false;
    }
    else {
        parameter = parseFloat(parameter.toFixed(3));
        if (parameter >= max_value) {
            object.value = max_value - 0.001;
        }
        if (parameter <= min_value) {
            object.value = min_value + 0.001;
        }
        redraw();
    }
    return true;
}


function input_R(val) {
    return _input_and_redraw(val, 2, 5);
}

function input_Y(val) {
    return _input_and_redraw(val, -5, 5);
}

function _input_and_redraw(new_value, min_value, max_value) {
    var parameter = Number(new_value);

    if (isNaN(parameter)) {
        return false;
    }
    parameter = parseFloat(parameter.toFixed(3));
    if (parameter > min_value && parameter < max_value) {
        redraw();
    }

    return true;
}

$(window).load(function () {
    $('input[type="text"]').on('keypress', function() {
        var keys = ['0','1','2','3','4','5','6','7','8','9','.','-'];
        if (event.key == '.' && this.value == "") {
            this.value = 0;
        }
        if (event.key == '.' || event.key == '-') {
            if (this.value.indexOf(event.key) > -1) {
                //already have a dot or minus
                return false
            }
        }
        return keys.indexOf(event.key) > -1
    })
});

$(window).load(function () {
    $('input[type="text"]').on('paste', function() {
        var paste_data = Number(event.clipboardData.getData('text/plain'));
        return !isNaN(paste_data);
    })
});

$(window).load(function () {
    $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });
});

$(window).load(function () {
    document.addEventListener('change', function(e){
        check_submit_avalible();
    })
});

function check_submit_avalible() {
    var inputs=document.getElementsByTagName('input'),i=0;
    var X_tip = false;
    var Y_tip = false;
    var R_tip = false;

    do {
        switch (inputs[i].type) {
            case 'checkbox':
                if (inputs[i].checked == true) {
                    X_tip = true
                }
                break;
            case 'text':
                switch (inputs[i].id) {
                    case "Y":
                        if (inputs[i].value != "") {
                            Y_tip = true
                        }
                        break;
                    case 'radius':
                        if (inputs[i].value != "") {
                            R_tip = true
                        }
                        break;
                }
                break;
        }
    } while(inputs[++i]);

    var sub_but = document.getElementById("magic_button");
    if (X_tip && Y_tip && R_tip) {
        sub_but.disabled = false;
    } else {
        sub_but.disabled = true;
    }
}

