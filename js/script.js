const header = document.querySelector("header");
const mainbox = document.querySelector("#main");
const tweet_input = document.querySelector("#tweet_input");
const btnline = document.querySelector("#btnline");
const imgupbtn = document.querySelector("#imgupbtn");
const imgup = document.querySelector("#imgup");
const imgup_content = document.querySelector("#imgup_content");
mainbox.style.marginTop = header.clientHeight + "px";

tweet_input.addEventListener("focus",function(){
    btnline.style.display = "block";
    tweet_input.classList.add("focus");
});
tweet_input.addEventListener("blur",function(){
    console.log("blur");
    if(tweet_input.innerHTML.length === 0){
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
        if(x >= 4){
            break;
        }
        const reader = new FileReader();
        reader.onload = function(e){
           imgup_content.innerHTML += '<img src="' + e.target.result + '">';
        };
        reader.readAsDataURL(this.files[x]);
    };
    if(this.files.length > 0){
        imgup_content.style.display = "block";
        tweet_input.classList.add("focus");

    }
});
