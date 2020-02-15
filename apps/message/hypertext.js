class Hypertext {
  constructor (rawHypertext) {
  /* each link and its meta data stored in an object */
    this.rawHypertext = rawHypertext
    this.markdownHypertextSyntax = this.setMarkdownHypertextSyntax()
    this.dispayText = this.setDisplayText()
    this.destUrl = this.setDestUrl()
    this.httpDestUrl = this.setHttpDestUrl()
    this.urlDomainKey = this.setUrlDomainKey()
    this.sharedAsHttpSecure = this.sharedAsHttpSecure()
    this.inCache = false
    this.cacheDuration = ''
    this.threatMatch = ''
  }

  setMarkdownHypertextSyntax () {
    /* identify refined portion of markdown syntax, without extra leading opening brackets */
    var openBracket = '['
    var bracketParenPosition = this.rawHypertext.indexOf('](')
    var displayText = this.rawHypertext.slice(0, bracketParenPosition)
    var lastOpenBracketPosition = displayText.lastIndexOf(openBracket)
    return this.rawHypertext.slice(lastOpenBracketPosition)
  }

  setDisplayText () {
    /* identify text portion of hyperlink from message string */
    var bracketParenPosition = this.markdownHyperTextSyntax.indexOf('](')
    return this.markdownHyperTextSyntax.slice(1, bracketParenPosition)
  }

  setDestUrl () {
    /* identify url portion of link from message string, without padding spaces */
    var bracketParenPosition = this.markdownHypertextSyntax.indexOf('](')
    return this.markdownHypertextSyntax.slice(bracketParenPosition + 2, -1)
  }

  setHttpDestUrl () {
    /* each link has http or https in the url */
    var destUrlLower = this.destUrl.toLowerCase()
    if (destUrlLower.startsWith('http://') || destUrlLower.startsWith('https://')) {
      return this.destUrl
    } else {
      return `https://${this.destUrl}`
    }
  }

  setUrlDomainKey () {
    /* remove http(s) and www for consistency across safe browse, cache, and multiple user requests */
    var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return this.destUrl.replace(domainPrefixRegex, '')
  }

  setSharedAsHttpSecure () {
    /* url was originally prefaced with 'https' */
    var destUrlLower = this.destUrl.toLowerCase()
    return destUrlLower.startsWith('https://')
  }

  getSlackHypertextSyntax () {
    /* slack hypertext syntax for urls and text */
    return `<${this.httpDestUrl}|${this.displayText}>`
  }

  isValid () {
    /* display text cannot be blank or only spaces and url must fit the correct format */
    var displayTextTrim = this.displayText.trim()
    var destUrlLower = this.destUrl.toLowerCase()
    var domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
    if (displayTextTrim && destUrlLower.match(domainRegex)) {
      return true
    } else {
      return false
    }
  }
}

module.exports = {
  Hypertext
}
