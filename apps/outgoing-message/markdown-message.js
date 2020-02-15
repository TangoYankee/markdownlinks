'use strict'

const { BlockTemplate } = require('./block-templates')

class MarkdownMessage {
  constructor (incomingMessage) {
    this.incomingMessage = incomingMessage
    this.blocks = []
    this.blockTemplate = new BlockTemplate('in_channel')
  }

  _sharedByText () {
    return `-shared by <@${this.incomingMessage.sharedBy}>`
  }

  _mrkdwnSection (mrkdwnText) {
    text = this.blockTemplate.text('mrkdwn', mrkdwnText)
    return this.blockTemplate.text('section', text)
  }

  // This does not belong here.
  _threatMatches () {
    for (this.hypertext in this.hypertexts) {
      {
        var markdownLink = hypertext.markdownHypertextSyntax
        let messageLink = hypertext.slackHypertextSyntax
        var threatMatch = hypertext.threatMatch
        // This does not belong here
        var threatEmoji
        if (threatMatch !== '') {
          threatEmoji = safeBrowseThreatsData[threatMatch].emoji
          messageLink = appendEmoji(markdownLink, threatEmoji)
        } else if (threatMatch === '' && messageData.safeBrowseSuccess) {
          threatEmoji = safeBrowseThreatsData.NONE_FOUND.emoji
          messageLink = appendEmoji(messageLink, threatEmoji)
        }
        var sharedAsHttpSecure = link.sharedAsHttpSecure
        if (!sharedAsHttpSecure) {
          var httpSecureEmoji = sharedWithoutHttpsData.emoji
          messageLink = appendEmoji(messageLink, httpSecureEmoji)
        }
        message = message.replace(markdownLink, messageLink, message)
      }
    }
  }

  _removeButtonElements () {
    return {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Remove Message'
      },
      value: 'remove_message',
      style: 'danger',
      confirm: {
        title: {
          type: 'plain_text',
          text: 'Confirm Message Removal'
        },
        text: {
          type: 'mrkdwn',
          text: 'Are you sure you would like to remove this message?'
        },
        confirm: {
          type: 'plain_text',
          text: 'Yes, remove message'
        },
        deny: {
          type: 'plain_text',
          text: 'No, keep message'
        }
      }
    }
  }

  _arrangeBlocks () {
    this.blocks.push(this._mrkdwnSection(this._sharedByText))
    this.blocks.push(this.blockTemplate.divider())
    this.blocks.push(this.blockTemplate.elements('actions', this._removeButtonElements))
  }
}

module.exports = {
  MarkdownMessage
}
