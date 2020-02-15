'use strict'


class BlockTemplate{
  constructor(responseType){
    this.reponseType = responseType
  }

  divider(){
    return {
      type: 'divider'
    }
  }

  get responseHead (blocks) {
    return {
      responseType: this.reponseType,
      blocks: blocks
    }
  }

  get text (type, text) {
    return {
      type: type,
      text: text
    }
  }

  get elements (type, elements) {
    return {
      type: type,
      elements: elements
    }
  }
}

// const contextTemplate = () => {
//   return {
//     type: 'context',
//     elements: []
//   }
// }

// const dividerTemplate = () => {
//   return {
//     type: 'divider'
//   }
// }

// const mrkdwnTemplate = (text) => {
//   return {
//     type: 'mrkdwn',
//     text: text
//   }
// }

// const responseHeadTemplate = (responseType, blocks) => {
//   return {
//     response_type: responseType,
//     blocks: blocks
//   }
// }

// const sectionTemplate = (text) => {
//   return {
//     type: 'section',
//     text: text
//   }
// }

const removeButtonTemplate = () => {
  return {
    type: 'actions',
    elements: [
      {
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
    ]
  }
}

// const messageRemovedTemplate = (text) => {
//   return {
//     response_type: 'in_channel',
//     replace_original: 'true',
//     text: text
//   }
// }

module.exports = {
  BlockTemplate
}
