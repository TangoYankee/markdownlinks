// Good for checking whether it is a valid address? Handles instances like ht:// or ww.
// domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

var format = (text) => {
  /* receive markdown hyperlink syntax, return slack hyperlink syntax */
  var bracketsParentheses = allIndexOf(text, '](')
  var brackets = allIndexOf(text, '[')
  var parentheses = allIndexOf(text, ')')
  if (bracketsParentheses) {
    let message = text
    const foundAllLinkPositions = allLinkPositions(bracketsParentheses, brackets, parentheses)
    // TODO: Create an array to hold objects for links.
    for (var linkPositions of foundAllLinkPositions) {
      if (validLinkPositions(linkPositions)) {
        const linkString = findLinkString(linkPositions, text)
        const unhttpedLinkAddress = findLinkAddress(linkPositions, text)
        const linkAddress = httpLinkAddress(unhttpedLinkAddress)
        const messageLink = createMessageLink(linkAddress, linkString)
        const markdownLink = findMarkdownLink(linkPositions, text)
        // TODO: move link address, messageLink, and markdownLink checks into follow 'if' statement
        if (checkLinkString(linkString) && checkLinkAddress(unhttpedLinkAddress)) {
        // TODO: Create object to hold values
        /*
          {
            cacheKeyFromUrl: "" (remove the prefixes to standardize the cacheKey and threatUrl syntax)
            unhttpedLinkAddress: "" (to check original link in safe browse)
            markdownLink: "" (to replace value in message)
            messageLink: "" (to replace value in message)
            threatMatch: "" (to have value added later)
            sharedAsHttps: "" (boolean. make a function to specifically check for https in original link)
          }
        */
          // TODO: add object to array of values
          message = replaceLink(markdownLink, messageLink, message)
        }
      }
    }
    return message
  } else {
    return text
  }
}

// Functions to check for threats

var allIndexOf = (text, searchChar) => {
  /* find all the positions of a character in a string */
  let startIndex = 0; let index; const indices = []; let count = 0
  while ((index = text.indexOf(searchChar, startIndex)) > -1 && count < 20) {
    indices.push(index)
    startIndex = index + 1
    count++
  }
  return indices
}

var allLinkPositions = (bracketsParentheses, brackets, parentheses) => {
  /* all of the positions of characters which compose markdown syntax links.
  a closed bracket/open parenthesis pair is used as the link indicator */
  const allPositions = []
  const bracketsParenthesesLen = bracketsParentheses.length
  for (var i = 0; i < bracketsParenthesesLen; i++) {
    const previousPosition = findPreviousPosition(i, bracketsParentheses)
    const currentPosition = bracketsParentheses[i]
    const nextPosition = findNextPosition(i, bracketsParentheses, bracketsParenthesesLen, parentheses)

    const positions = [undefined, currentPosition, undefined]
    positions[0] = findOpenBracket(brackets, currentPosition, previousPosition)
    positions[2] = findClosedParenthensis(parentheses, currentPosition, nextPosition)

    allPositions.push(positions)
  }
  return allPositions
}

var findPreviousPosition = (i, bracketsParentheses) => {
  /* find the bracket/parenthesis pair that occurs before the current one */
  if (i === 0) {
    return 0
  } else {
    var j = i - 1
    return bracketsParentheses[j]
  }
}

var findNextPosition = (i, bracketsParentheses, bracketParenthesesLen, parentheses) => {
  /* find the bracket/parenthesis pair that occurs after the current one */
  if (i === (bracketParenthesesLen - 1)) {
    return parentheses[parentheses.length - 1]
  } else {
    var k = i + 1
    return bracketsParentheses[k]
  }
}

var findClosedParenthensis = (parentheses, currentPosition, nextPosition) => {
  /* find the position of the closed parenthesis, associated with the hyperlink */
  const filteredParentheses = parentheses.filter(parenthesis => parenthesis > currentPosition && parenthesis <= nextPosition)
  return filteredParentheses[0]
}

var findOpenBracket = (brackets, currentPosition, previousPosition) => {
  /* find the position of the open bracket associated with the hyperlink */
  const filteredBrackets = brackets.filter(bracket => bracket < currentPosition && bracket >= previousPosition)
  return filteredBrackets.pop()
}

var validLinkPositions = (linkPositions) => {
  /* check that the set of positions for characters could represent a hyperlink */
  const hasValues = linkPositions.every(value => value >= 0)
  const hasNumbers = linkPositions.every(value => typeof (value) === 'number')
  const correctLength = linkPositions.length === 3
  const correctOrder = (linkPositions[0] < linkPositions[1] && linkPositions[1] < linkPositions[2])
  return (correctLength && hasValues && hasNumbers && correctOrder)
}

var findMarkdownLink = (linkPositions, text) => {
  /* identify entire portion of markdown syntax */
  return text.slice(linkPositions[0], linkPositions[2] + 1)
}

var findLinkString = (linkPositions, text) => {
  /* identify text portion of hyperlink from message string */
  return text.slice(linkPositions[0] + 1, linkPositions[1])
}

var checkLinkString = (linkString) => {
  /* link string cannot be blank or only spaces */
  var linkStringTrim = linkString.trim()
  if (linkStringTrim) {
    return true
  } else {
    return false
  }
}

var findLinkAddress = (linkPositions, text) => {
  /* identify url portion of link from message string */
  return text.slice(linkPositions[1] + 2, linkPositions[2])
}

var checkLinkAddress = (linkAddress) => {
  /* unhttpedLinkAddress cannot blank or contains a space in the url itself */
  var linkAddressTrim = linkAddress.trim()
  var linkAddressSpace = linkAddressTrim.includes(' ')
  if (linkAddressTrim && !linkAddressSpace) {
    return true
  } else {
    return false
  }
}

var httpLinkAddress = (linkAddress) => {
  /* ensure that each link has http or https in the url */
  const lowerCaseAddress = linkAddress.toLowerCase()
  if (lowerCaseAddress.includes('http://') || lowerCaseAddress.includes('https://')) {
    return linkAddress
  } else {
    return `https://${linkAddress}`
  }
}

var createMessageLink = (linkAddress, displayText) => {
  /* create slack syntax for text and url */
  return `<${linkAddress}|${displayText}>`
}

var replaceLink = (markdownLink, messageLink, message) => {
  /* identify and replace the hyperlink based on its exact structure */
  return message.replace(markdownLink, messageLink, message)
}

module.exports = {
  format,
  allIndexOf,
  allLinkPositions,
  validLinkPositions,
  findMarkdownLink,
  httpLinkAddress,
  checkLinkString,
  checkLinkAddress
}
