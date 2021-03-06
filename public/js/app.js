'use strict'

const footerOffset = 25

const footerAlign = () => {
  /* create bottom padding on the body to accommodate footer */
  $('footer').css('height', 'auto')
  var footerHeight = $('footer').outerHeight()
  $('body').css('padding-bottom', footerHeight + footerOffset)
  $('footer').css('height', footerHeight)
}

const headerAlign = () => {
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
