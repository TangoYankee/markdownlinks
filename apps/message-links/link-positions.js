const setAllLinkPositions = (text) => {
    var bracketsParentheses = allIndexOf(text, '](')
    var brackets = allIndexOf(text, '[')
    var parentheses = allIndexOf(text, ')')
    if (bracketsParentheses){
        return allLinkPositions(bracketsParentheses, brackets, parentheses)
    } else {
        return ""
    }
}

const allIndexOf = (text, searchChar) => {
    /* find all the positions of a character in a string */
    let startIndex = 0; let index; var indices = []; let count = 0
    while ((index = text.indexOf(searchChar, startIndex)) > -1 && count < 20) {
      indices.push(index)
      startIndex = index + 1
      count++
    }
    return indices
  }

const allLinkPositions = (bracketsParentheses, brackets, parentheses) => {
    /* all of the positions of characters which compose markdown syntax links.
      a closed bracket/open parenthesis pair is used as the link indicator */
    var allPositions = []
    var bracketsParenthesesLen = bracketsParentheses.length
    for (let i = 0; i < bracketsParenthesesLen; i++) {
      var previousPosition = findPreviousPosition(i, bracketsParentheses)
      var currentPosition = bracketsParentheses[i]
      var nextPosition = findNextPosition(i, bracketsParentheses, bracketsParenthesesLen, parentheses)
  
      var positions = [undefined, currentPosition, undefined]
      positions[0] = findOpenBracket(brackets, currentPosition, previousPosition)
      positions[2] = findClosedParenthensis(parentheses, currentPosition, nextPosition)
  
      allPositions.push(positions)
    }
    return allPositions
  }

const findPreviousPosition = (i, bracketsParentheses) => {
    /* find the bracket/parenthesis pair that occurs before the current one */
    if (i === 0) {
      return 0
    } else {
      var j = i - 1
      return bracketsParentheses[j]
    }
  }
  
const findNextPosition = (i, bracketsParentheses, bracketParenthesesLen, parentheses) => {
    /* find the bracket/parenthesis pair that occurs after the current one */
    if (i === (bracketParenthesesLen - 1)) {
      return parentheses[parentheses.length - 1]
    } else {
      var k = i + 1
      return bracketsParentheses[k]
    }
  }

const findOpenBracket = (brackets, currentPosition, previousPosition) => {
    /* find the position of the open bracket associated with the hyperlink */
    var filteredBrackets = brackets.filter(bracket => bracket < currentPosition && bracket >= previousPosition)
    return filteredBrackets.pop()
  }
  
const findClosedParenthensis = (parentheses, currentPosition, nextPosition) => {
    /* find the position of the closed parenthesis, associated with the hyperlink */
    var filteredParentheses = parentheses.filter(parenthesis => parenthesis > currentPosition && parenthesis <= nextPosition)
    return filteredParentheses[0]
  }

const validLinkPositions = (linkPositions) => {
    /* check that the set of positions for characters could represent a hyperlink */
    var hasValues = linkPositions.every(value => value >= 0)
    var hasNumbers = linkPositions.every(value => typeof (value) === 'number')
    var correctLength = linkPositions.length === 3
    var correctOrder = (linkPositions[0] < linkPositions[1] && linkPositions[1] < linkPositions[2])
    return (correctLength && hasValues && hasNumbers && correctOrder)
  }

module.exports = {
    setAllLinkPositions,
    allIndexOf,
    allLinkPositions,
    validLinkPositions
}