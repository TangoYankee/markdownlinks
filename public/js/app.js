
function footerAlign(){
    $('footer').css('height', 'auto');
    var footerHeight = $('footer').outerHeight();
    $('body').css('padding-bottom', footerHeight);
    $('footer').css('height', footerHeight);
}

$(document).ready(()=>{
    footerAlign();
})

$(window).resize(()=>{
    footerAlign();
})