function footerAlign(){
  /* create bottom padding on the body to accomadate footer */
  $('footer').css('height', 'auto');
  var footerHeight = $('footer').outerHeight();
  $('body').css('padding-bottom', footerHeight);
  $('footer').css('height', footerHeight);
}

function headerAlign(){
  /* create top padding on the body to accomadate header */
  $('header').css('height', 'auto');
  var headerHeight = $('header').outerHeight();
  $('body').css('padding-top', headerHeight);
  $('header').css('height', headerHeight);
}

$().ready(()=>{
  footerAlign();
})

$().ready(()=>{
  headerAlign();
})

$(window).resize(()=>{
  footerAlign();
})

$(window).resize(()=>{
  headerAlign();
})
