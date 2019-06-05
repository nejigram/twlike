const
    header = document.querySelector("#header"),
    mainbox = document.querySelector("#main");
    tweet_input = document.querySelector("#tweet_input"),
    btnline = document.querySelector("#btnline"),
    imgupbtn = document.querySelector("#imgupbtn"),
    imgup = document.querySelector("#imgup"),
    tweet_up = document.querySelector("#tweet_up"),
    imgup_content = document.querySelector("#imgup_content"),
    interval = Math.floor(1000 / 60 * 10),

    __click = window.ontouchstart===null?"touchstart":"click",
    imgprevbox = document.querySelector("#imgprevbox"),
    imgnextbox = document.querySelector("#imgnextbox"),
    imgprev = document.querySelector("#imgprev"),
    imgnext = document.querySelector("#imgnext");

let
    popupimgbox = document.querySelector("#popupimgbox"),
    accounticon_img = document.querySelectorAll(".accounticon img"),
    imgup_file = [],
    formdata = new FormData(),
    now_tweetget_flg = false,
    lasttweet = 0,
    timer,
    popupimgdata = {};

window.addEventListener("load",function(){
    obj_resize();
    tweetget();
});
window.addEventListener("scroll",function(){
    bottomget();
},{passive:true});


window.addEventListener("resize",function(){
    if(timer !== false){
        clearTimeout(timer);
    }
    timer = setTimeout(obj_resize(),interval);
});


popupimgbox.addEventListener(__click,function(){
    this.classList.add("hide");
});


tweet_input.addEventListener("focus",function(){
    btnline.classList.remove("hide");
//    btnline.style.display = "block";
    tweet_input.classList.add("focus");
});
tweet_input.addEventListener("blur",function(){
    if(tweet_input.innerHTML.length === 0 && imgup_file.length === 0){
        tweet_input.classList.remove("focus");
//        btnline.style.display = "none";
        btnline.classList.add("hide");
    }
});

imgupbtn.addEventListener("mousedown",function(e){
    tweet_input.focus();
    imgup.click();
    e.preventDefault();
});

imgup.addEventListener("change",function(e){
    let x = 0;
    for(x = 0;x < this.files.length;x++){
        if(imgup_file.length >= 4){
            break;
        }
        imgup_file.push(this.files[x].name);
        const reader = new FileReader();
        reader.onload = function(e){
            const tmpimg = document.createElement("img");
            tmpimg.src = e.target.result;
            const tmpspan = document.createElement("span");
            tmpspan.appendChild(document.createTextNode("×"));
            tmpspan.classList.add("imgup_delete");
            imgup_content.appendChild(tmpimg);
            imgup_content.appendChild(tmpspan);
            tmpspan.addEventListener(__click,imgup_delete);

        };
        reader.readAsDataURL(this.files[x]);
        formdata.append("file" + x,this.files[x]);
    };
    if(imgup_file.length > 0){
        imgup_content.style.display = "block";
        tweet_input.classList.add("focus");

    }
});

tweet_up.addEventListener(__click,function(){
    for(let x = 0;x < imgup_file.length;x++){
        formdata.append("imgup_file[]",imgup_file[x]);

    }
    formdata.append("tweet",tweet_input.innerHTML);
    var request = new XMLHttpRequest();
    request.open("POST", "imgup.php");
    request.send(formdata);
    request.onreadystatechange = function(){
    if ((request.readyState == 4) && (request.status == 200)) {
            location.reload();
        }
    };
})


imgprevbox.addEventListener(__click,function(e){
    if(popupimgdata.now_idx <= 0){
        e.stopPropagation();
        return false;
    }
    popupimgdata.now_idx -= 1;
    set_popupimg(popupimgdata.ar[popupimgdata.now][popupimgdata.now_idx],popupimgdata.now_idx);
    e.stopPropagation();
});
imgnextbox.addEventListener(__click,function(e){
    if(popupimgdata.idxmax <= popupimgdata.now_idx){
        e.stopPropagation();
        return false;
    }
    popupimgdata.now_idx += 1;
    set_popupimg(popupimgdata.ar[popupimgdata.now][popupimgdata.now_idx],popupimgdata.now_idx);
    e.stopPropagation();
});

const imgup_delete = function(){
    const idx = [].indexOf.call(document.querySelectorAll(".imgup_delete"),this);
    imgup_file.splice(idx,1);
    this.previousElementSibling.remove();
    this.remove();
    if(imgup_content.childElementCount === 0){
        imgup_content.style.display = "none";
        imgup.value = "";
        if(tweet_input.innerHTML.length === 0 && imgup_file.length === 0){
            tweet_input.classList.remove("focus");
            btnline.style.display = "none";
        }
    }

}

const rand = function(n){
    return Math.floor(Math.random() * n) + 1;
}
const tweetget = function(){

    const rq = new XMLHttpRequest();
    rq.open("GET","fileinc.php?lasttweet=" + lasttweet);
    rq.send();
    rq.onreadystatechange = function(){
        if ((rq.readyState == 4) && (rq.status == 200)) {

            if(rq.responseText === "nocontent"){
                return false;
            }
            const rdata = JSON.parse(rq.responseText);
            lasttweet = rdata.lasttweet;
            let ar = {};
            for(let x = 0;x < rdata.tweet.length;x++){

                const onetweetbox = document.createElement("div");
                onetweetbox.classList.add("onetweetbox");
                const accounticon = document.createElement("div");
                accounticon.classList.add("accounticon");
                const img = document.createElement("img");
                img.src = "../../assets/images/animal/01-min.jpg";
                accounticon.appendChild(img);
                const onetweet = document.createElement("div");
                onetweet.classList.add("onetweet");
                onetweet.innerHTML = rdata.tweet[x].content;


                if(rdata.tweet[x].imgs){
                    ar[rdata.tweet[x].microtime] = [];

                    const imgs = document.createElement("div");
                    imgs.classList.add("imgline");
                    let i = 0;
                    for(i = 0; i < rdata.tweet[x].imgs.length;i++){
                        const tmpimg = document.createElement("img");
                        tmpimg.src = "img/" + rdata.tweet[x].microtime + "/" + rdata.tweet[x].imgs[i];
                        imgs.setAttribute("data-idxmax",i);
                        tmpimg.setAttribute("data-idx",i);
                        imgs.appendChild(tmpimg);
                        ar[rdata.tweet[x].microtime].push(tmpimg.src);

                        tmpimg.addEventListener(__click,function(){
                            popupimgbox.classList.remove("hide");
                            popupimgdata.idxmax = tmpimg.parentNode.getAttribute("data-idxmax");
                            popupimgdata.now = rdata.tweet[x].microtime;
                            set_popupimg(tmpimg.src,tmpimg.getAttribute("data-idx"));

                        });
                    }
                    onetweet.appendChild(imgs);
                }
                onetweetbox.appendChild(accounticon);
                onetweetbox.appendChild(onetweet);
                document.querySelector(".center").appendChild(onetweetbox);
                now_tweetget_flg = false;
            }
            popupimgdata.ar = ar;
            accounticon_img = document.querySelectorAll(".accounticon img");
            obj_resize();
        }
    }
}
let set_popupimg_flg = false;
const set_popupimg = function(src,idx){
    if(set_popupimg_flg){
        return false;
    }
    set_popupimg_flg = true;
    popupimgbox = "";
    popupimgbox = document.querySelector("#popupimgbox");

    popupimgbox.firstElementChild.src = src;
    popupimgbox.firstElementChild.addEventListener("load",function(){
        popupimgbox.firstElementChild.style.marginTop = "0px";
        popupimgbox.firstElementChild.style.marginTop = ((popupimgbox.clientHeight - popupimgbox.firstElementChild.clientHeight) /2) + "px";
        popupimgdata.now_idx = parseInt(idx);

        imgprev.style.opacity = 1;
        imgnext.style.opacity = 1;
        if(popupimgdata.now_idx === 0){
            imgprev.style.opacity = 0.2;
        }
        if(popupimgdata.idxmax <= popupimgdata.now_idx){
            imgnext.style.opacity = 0.2;
        }
        set_popupimg_flg = false;

    });

}


const obj_resize = function(){
    popupimgbox = "";
    popupimgbox = document.querySelector("#popupimgbox");
    for(let x = 0;x < accounticon_img.length;x++){
        accounticon_img[x].width = accounticon_img[x].parentNode.clientHeight * 0.8;
        accounticon_img[x].height = accounticon_img[x].parentNode.clientHeight * 0.8;
    }
    mainbox.style.marginTop = header.clientHeight + "px";
    document.querySelector("#firstbox").classList.add("hide");
    popupimgbox.classList.add("hide");

}
const bottomget = function(){
    const contentheight = document.body.clientHeight;
    const scroll_y_bottom = window.scrollY + window.innerHeight;
    if(contentheight < scroll_y_bottom && !now_tweetget_flg){
        now_tweetget_flg = true;
        tweetget();
    }
}
