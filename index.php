<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">

<link rel="shortcut icon" type="image/x-icon" href="//www.nejigram.com/assets/img/itemicon.ico" />
<title>twlike</title>
<link rel='stylesheet' href='../../css/default_style.css?<?=time();?>' type='text/css' />
<link rel='stylesheet' href='css/style.css?<?=time();?>' type='text/css' />
<script src='js/script.js?<?=time();?>' async></script>
</head>
<body>
<header id="header">
    <div class="into">
        <ul class="menu">
        <li><img src="../../assets/images/icon/001.png"><span>ホーム</span></li>
        <li><img src="../../assets/images/icon/064.png"><span>モーメント</span></li>
        <li><img src="../../assets/images/icon/003.png"><span>通知</span></li>
        <li><img src="../../assets/images/icon/019.png"><span>メッセージ</span></li>
        </ul>
        <div class="homeicon">
            <img src="../../assets/images/icon/158.png">
        </div>
        <div class="rightarea">
            <div class="searchbox">
                <input type="search" placeholder="キーワード検索"><img src="../../assets/images/icon/087_1.png">
            </div>
            <div class="accounticon">
                <img src="../../assets/images/animal/01-min.jpg">
            </div>
            <button class="tweetbtn">ツイート</button>
        </div>
    </div>
</header>
<div class="main" id="main">

    <div class="left">
        <div class="mydataarea">
            <div class="img">
                <img src="../../assets/images/animal/02-min.jpg">
            </div>
            <div class="data">
                <div class="accounticon">
                    <img src="../../assets/images/animal/01-min.jpg">
                </div>
                <div class="accountdata">
                    <div class="name">
                        aaa
                    </div>
                    <div class="disc">
                        <p>まさしきねがいに　いさかうとも</p>
                        <p>銀河のかなたに　　ともにわらい</p>
                    </div>
                </div>
            </div>
            <div class="data2">
                <div class="">
                    <p class="">ツイート</p>
                    <p class=""><?=count(scandir("./tweet/")) -2;?></p>
                </div>
                <div class="">
                    <p class="">ツイート</p>
                    <p class="">111</p>
                </div>
                <div class="">
                    <p class="">ツイート</p>
                    <p class="">111</p>
                </div>
            </div>
        </div>
    </div>
    <div class="center">
    <p id="test">aaa</p>
        <div class="tweetline">
            <div class="sendarea">
                <div class="accounticon">
                    <img src=" ../../assets/images/animal/01-min.jpg">
                 </div>
                <div class="tweetbox">
                    <div id="tweet_input" contenteditable="true"></div>
                    <p id="imgup_content"></p>
                </div>
            </div>
            <div class="btnline hide" id="btnline">
                <button id="imgupbtn"><img src="../../assets/images/icon/300.png" width="100%"></button>
                <button id="tweet_up">ツイート</button>
            </div>
        </div>
    </div>
    <div class="right">
        お知らせなど。
    </div>

</div>
<input type="file" id="imgup" multiple>
<div class="reload" id="firstbox"><img src="../../assets/images/icon/loading01.gif"></div>
<div class="popupimgbox hide" id="popupimgbox">
    <img src="../../assets/images/animal/01-min.jpg">
    <div id="imgprevbox"><img src="../../assets/images/icon/287.png" class="left" id="imgprev"></div><div id="imgnextbox"><img src="../../assets/images/icon/286.png" class="right" id="imgnext"></div>
</div>
</body>
<html>
