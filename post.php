<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="post_styles.css"/>
</head>
<body>

<?php
$start_time = time();

function get_X() {
    $X_boxes = $_POST['xCheckBox'];
    if(empty($X_boxes)) {
        echo("You didn't select X.");
    } else {
        $i = count($X_boxes);
        if ($i > 1)
        {
            echo("You should select only 1 X: <br>");
        } else
        {
            return $X_boxes[0];
        }
    }
    return "";
}

function get_Y() {
    $y = $_POST['Y'];
    if ($y < 5 && $y > -5) {
        return $y;
    }
    return "";
}

function get_R() {
    $r = $_POST['R'];
    if ($r < 5 && $r > 2) {
        return $r;
    }
    return "";
}


function calculate_result($x, $y, $r) {
    #rectangle
    if ($x >= 0 && $x <= $r
        &&
        $y <= 0 && $y >= (-$r/2)) {
        return "Попадает";
    } else
        #triangle
        if ($x <= 0 && $x >= (-$r)
            &&
            $y >=0 && $y <= $r
            &&
            $y <= ($x + $r)) {
        return "Попадает";
    } else
        #circle
        if ($x >= 0 && $x <= $r
            &&
            $y >= 0 && $y <= $r
            &&
            ($x*$x + $y*$y) <= ($r*$r)) {
        return "Попадает";
    } else {
        return "Не попадает";
    }
}


$X_val =  get_X();
if ($X_val == "") {
    return;
}
$Y_val = get_Y();

if ($Y_val == "") {
    echo("You didn't set Y.");
    return;
}
$R_val = get_R();
if ($R_val == "") {
    echo("You didn't set R.");
    return;
}

$result = calculate_result($X_val, $Y_val, $R_val);

##$q = intval($_GET['q']);
##
##$con = mysqli_connect('localhost','peter','abc123','my_db');
##if (!$con) {
##    die('Could not connect: ' . mysqli_error($con));
##}
##
##mysqli_select_db($con,"ajax_demo");
##$sql="SELECT * FROM user WHERE id = '".$q."'";
##$result = mysqli_query($con,$sql);

echo "Today is " . date("Y/m/d G:i:s") . "<br>";
$end_time = time();
$work_time = $end_time - $start_time;
echo "Work time: " .$work_time. " seconds<br>";

echo "
<table id=\"answers\" width=\"100%\">
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
    </tr>";

echo "<tr>";
echo "<td class='answer-item'>".$X_val."</td>";
echo "<td class='answer-item'>".$Y_val."</td>";
echo "<td class='answer-item'>".$R_val."</td>";
echo "<td class='answer-item'>".$result."</td>";
echo "</tr>";

echo "</table>";
##mysqli_close($con);
?>
</body>
</html>
