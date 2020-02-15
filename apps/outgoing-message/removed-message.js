'use strict'

const { BlockTemplate } = require('./block-templates')

class RemovedMessage {
  constructor () {
    this.blockTemplate = new BlockTemplate('in_channel')
    this.blocks = []
  }

  _replaceText () {
    return '_A member of your workspace removed this message_'
  }

  _replaceMessage (replaceOriginal, text) {
    responseHead = this.blockTemplate.responseHead(text)
    return responseHead.replace_original = replaceOriginal
  }

  getRemoved () {
    return this._replaceMessage(true, this._replaceText)
  }
}

module.exports = {
  RemovedMessage
}
