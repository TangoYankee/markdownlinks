var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}


function footerAlign(){
    $('footer').css('height', 'auto');
    var footerHeight = $('footer').outerHeight();
    $('body').css('padding-bottom', footerHeight);
    $('footer').css('height', footerHeight);
}


function headerAlign(){
    $('header').css('height', 'auto');
    var headerHeight = $('header').outerHeight();
    $('body').css('padding-top', headerHeight);
    $('header').css('height', headerHeight);
}


$(document).ready(()=>{
    footerAlign();
    headerAlign();
})


$(window).resize(()=>{
    footerAlign();
    headerAlign();
})
