'use strict'

const { BlockTemplate } = require('./block-templates')

class HelpMessage {
  constructor (userID) {
    this.userID = userID
    this.blockTemplate = new BlockTemplate('ephemeral')
    this.blocks = []
  }

  _welcomeText () {
    return `:confetti_ball: *welcome,* <@${this.userId}>!\n_format your hyperlinks like this..._`
  }

  _exampleInputText () {
    return '*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._'
  }

  _exampleOutputText () {
    return '*returned message*\n _create <https://markdownguide.org/|nice links>._'
  }

  _homepageText () {
    return 'visit https://markdownlinks.io'
  }

  _mrkdwnSection (mrkdwnText) {
    text = this.blockTemplate.text('mrkdwn', mrkdwnText)
    return this.blockTemplate.text('section', text)
  }

  _arrangeBlocks () {
    this.blocks.push(this._mrkdwnSection(this._welcomeText))
    this.blocks.push(this._mrkdwnSection(this._exampleInputText))
    this.blocks.push(this._mrkdwnSection(this._exampleOutputText))
    this.blocks.push(this.blockTemplate.divider())
    this.blocks.push(this._mrkdwnSection(this._homepageText))
  }

  getHelp () {
    return this.blockTemplate.responseHead(this._arrangeBlocks())
  }
}

module.exports = {
  HelpMessage
}
