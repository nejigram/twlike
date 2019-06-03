<?php
if(isset($_GET["lasttweet"])){
    if($_GET["lasttweet"]){
        $lasttweet = $_GET["lasttweet"];
    }
}

if(!isset($lasttweet)){
    $ar = explode(" ",microtime());
    $lasttweet = floor(($ar[0] + $ar[1]) * 10000);
}

$files = scandir("tweet");
rsort($files);
$x = 0;
$y = 0;

while($x < 10 && $y < count($files)){
    if($files[$y] !== "." && $files[$y] !== ".."){
        $ar = explode(".",$files[$y]);
        if($ar[0] < $lasttweet){
            $rdata["tweet"][$x]["date"] = date("Y-m-d H:i:s",floor($ar[0] * 0.0001));
            $rdata["tweet"][$x]["content"] = nl2br(file_get_contents("tweet/" .$files[$y]));
            $rdata["lasttweet"] = $ar[0];
            $x++;
        }
    }
    $y++;
}
if(isset($rdata)){
    echo json_encode($rdata);
}else{
    echo "nocontent";
}
?>
