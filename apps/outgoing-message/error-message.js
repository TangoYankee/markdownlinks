'use strict'

const { BlockTemplate } = require('./block-templates')

class ErrorMessage {
  /* handle out of bounds cases */
  constructor () {
    this.blockTemplate = new BlockTemplate('ephemeral')
    this.blocks = []
  }

  _warningText () {
    return ':warning:please provide input text'
  }

  _instructionsText () {
    return '*For instructions, write...* _/markdownlinks help_'
  }

  _mrkdwnSection (mrkdwnText) {
    text = this.blockTemplate.text('mrkdwn', mrkdwnText)
    return this.blockTemplate.text('section', text)
  }

  _arrangeBlocks () {
    this.blocks.push(this._mrkdwnSection(this._warningText))
    this.blocks.push(this._mrkdwnSection(this._instructionsText))
  }

  getError () {
    return this.blockTemplate.responseHead(this._arrangeBlocks())
  }
}

module.exports = {
  ErrorMessage
}
