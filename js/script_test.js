const accounticon_img = document.querySelectorAll(".accounticon img");

window.addEventListener("load",function(){

    obj_resize();
});

const interval = Math.floor(1000 / 60 * 10);
let timer;
window.addEventListener("resize",function(){
    if(timer !== false){
        clearTimeout(timer);
    }
    timer = setTimeout(obj_resize(),interval);
});

const obj_resize = function(){
    for(let x = 0;x < accounticon_img.length;x++){
        accounticon_img[x].width = accounticon_img[x].parentNode.clientHeight * 0.8;
        accounticon_img[x].height = accounticon_img[x].parentNode.clientHeight * 0.8;

    }
}
