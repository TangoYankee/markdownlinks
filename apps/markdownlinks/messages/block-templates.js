const contextTemplate = () => {
    return {
      "type": "context",
      "elements": []
    }
  }

  const dividerTemplate = () => {
    return {
      "type": "divider"
    }
  }

  const mrkdwnTemplate = (text) => {
    return {
        "type": "mrkdwn",
        "text": text
      }
}

const responseHeadTemplate = (responseType, blocks) => {
    return {
        "response_type": responseType,
        "blocks": blocks
      }
}

const sectionTemplate = (text) => {
    return {
        "type": "section",
        "text": text
}
}

module.exports = {
    contextTemplate,
    dividerTemplate,
    mrkdwnTemplate,
    responseHeadTemplate,
    sectionTemplate
}
