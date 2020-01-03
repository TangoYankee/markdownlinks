'use strict'

var footerAlign = () => {
  /* create bottom padding on the body to accommodate footer */
  $('footer').css('height', 'auto')
  var footerHeight = $('footer').outerHeight()
  $('body').css('padding-bottom', footerHeight)
  $('footer').css('height', footerHeight)
}

var headerAlign = () => {
  /* create top padding on the body to accommodate header */
  $('header').css('height', 'auto')
  var headerHeight = $('header').outerHeight()
  $('body').css('padding-top', headerHeight)
  $('header').css('height', headerHeight)
}

$().ready(() => {
  footerAlign()
  headerAlign()
})

$(window).resize(() => {
  footerAlign()
  headerAlign()
})
