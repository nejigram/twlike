<?php

$ar = explode(" ",microtime());
$nowtime = floor(($ar[0] + $ar[1]) * 10000);
echo $nowtime;

if(count($_FILES) > 0){
    mkdir("./img/" .$nowtime,0707);
    foreach($_FILES as $tmp){
        if(in_array($tmp["name"],$_POST["imgup_file"])){
            $imgname = $tmp["name"];
            move_uploaded_file($tmp["tmp_name"],"img/" .$nowtime ."/" .$imgname);
        }
    }
}

$filename = "tweet/" .$nowtime .".dat";
$ar = array("<div>" => "","</div>" => "\n","<br />" => "\n","<br>" => "\n");
file_put_contents($filename,strip_tags(strtr($_POST["tweet"],$ar)));
?>
