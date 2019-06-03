const header = document.querySelector("#header");
const mainbox = document.querySelector("#main");
const tweet_input = document.querySelector("#tweet_input");
const btnline = document.querySelector("#btnline");
const imgupbtn = document.querySelector("#imgupbtn");
const imgup = document.querySelector("#imgup");
const tweet_up = document.querySelector("#tweet_up");
const imgup_content = document.querySelector("#imgup_content");

let accounticon_img = document.querySelectorAll(".accounticon img");

let imgup_file = [];
let formdata = new FormData();
let now_tweetget_flg = false;
let lasttweet = 0;

window.addEventListener("load",function(){
    obj_resize();
    tweetget();
});
window.addEventListener("scroll",function(){
    const contentheight = document.body.clientHeight;
    const scroll_y_bottom = window.scrollY + window.innerHeight;
    if(contentheight < scroll_y_bottom && !now_tweetget_flg){
        now_tweetget_flg = true;
        tweetget();
    }
});


const interval = Math.floor(1000 / 60 * 10);
let timer;
window.addEventListener("resize",function(){
    if(timer !== false){
        clearTimeout(timer);
    }
    timer = setTimeout(obj_resize(),interval);
});

tweet_input.addEventListener("focus",function(){
    btnline.style.display = "block";
    tweet_input.classList.add("focus");
});
tweet_input.addEventListener("blur",function(){
    if(tweet_input.innerHTML.length === 0 && imgup_file.length === 0){
        tweet_input.classList.remove("focus");
        btnline.style.display = "none";
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
            tmpspan.addEventListener("click",imgup_delete);

        };
        reader.readAsDataURL(this.files[x]);
        formdata.append("file" + x,this.files[x]);
    };
    if(imgup_file.length > 0){
        imgup_content.style.display = "block";
        tweet_input.classList.add("focus");

    }
});

tweet_up.addEventListener("click",function(){
    for(let x = 0;x < imgup_file.length;x++){
        formdata.append("imgup_file[]",imgup_file[x]);

    }
    formdata.append("tweet",tweet_input.innerHTML);
    var request = new XMLHttpRequest();
    request.open("POST", "imgup.php");
    request.send(formdata);
    request.onreadystatechange = function(){
    if ((request.readyState == 4) && (request.status == 200)) {
/*            formdata = new FormData();
            imgup_content.innerHTML = "";
            imgup_content.style.display = "none";
            imgup.value = "";
            tweet_input.innerHTML = "";
            tweet_input.classList.remove("focus");
            imgup_file = [];
*/
            location.reload();
        }
    };
})
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
                onetweetbox.appendChild(accounticon);
                onetweetbox.appendChild(onetweet);
                document.querySelector(".center").appendChild(onetweetbox);
                now_tweetget_flg = false;
            }
            accounticon_img = document.querySelectorAll(".accounticon img");
            obj_resize();
        }
    }
}
const obj_resize = function(){
    for(let x = 0;x < accounticon_img.length;x++){
        accounticon_img[x].width = accounticon_img[x].parentNode.clientHeight * 0.8;
        accounticon_img[x].height = accounticon_img[x].parentNode.clientHeight * 0.8;
    }
    mainbox.style.marginTop = header.clientHeight + "px";
    document.querySelector("#firstbox").classList.remove("reload");

}
