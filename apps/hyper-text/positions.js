const setAllHyperTextPositions = (text) => {
  /* locations of Markdown syntax hypertext in the user message */
  var bracketsParentheses = allIndexOf(text, '](')
  var brackets = allIndexOf(text, '[')
  var parentheses = allIndexOf(text, ')')
  if (bracketsParentheses) {
    return allHyperTextPositions(bracketsParentheses, brackets, parentheses)
  } else {
    return ''
  }
}

const allIndexOf = (text, searchChar) => {
  /* positions of a character in a string */
  let startIndex = 0; let index; const indices = []; let count = 0
  while ((index = text.indexOf(searchChar, startIndex)) > -1 && count < 20) {
    indices.push(index)
    startIndex = index + 1
    count++
  }
  return indices
}

const allHyperTextPositions = (bracketsParentheses, brackets, parentheses) => {
  /* positions of characters for markdown syntax hyper text, 
    indicated by a bracket/open parenthesis pair */
  var allPositions = []
  var bracketsParenthesesLen = bracketsParentheses.length
  for (var i = 0; i < bracketsParenthesesLen; i++) {
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
  /* the bracket/parenthesis pair which occurs before the current one */
  if (i === 0) {
    return 0
  } else {
    var j = i - 1
    return bracketsParentheses[j]
  }
}

const findNextPosition = (i, bracketsParentheses, bracketParenthesesLen, parentheses) => {
  /* the bracket/parenthesis pair which occurs after the current one */
  if (i === (bracketParenthesesLen - 1)) {
    return parentheses[parentheses.length - 1]
  } else {
    var k = i + 1
    return bracketsParentheses[k]
  }
}

const findClosedParenthensis = (parentheses, currentPosition, nextPosition) => {
  /* the position of the closed parenthesis, associated with the hyperlink */
  var filteredParentheses = parentheses.filter(parenthesis => parenthesis > currentPosition && parenthesis <= nextPosition)
  return filteredParentheses[0]
}

const findOpenBracket = (brackets, currentPosition, previousPosition) => {
  /* the position of the open bracket associated with the hyperlink */
  var filteredBrackets = brackets.filter(bracket => bracket < currentPosition && bracket >= previousPosition)
  return filteredBrackets.pop()
}

const validHyperTextPositions = (linkPositions) => {
  /* the set of positions for characters could represent a hyperlink */
  var hasValues = linkPositions.every(value => value >= 0)
  var hasNumbers = linkPositions.every(value => typeof (value) === 'number')
  var correctLength = linkPositions.length === 3
  var correctOrder = (linkPositions[0] < linkPositions[1] && linkPositions[1] < linkPositions[2])
  return (correctLength && hasValues && hasNumbers && correctOrder)
}

module.exports = {
  setAllHyperTextPositions,
  allIndexOf,
  allHyperTextPositions,
  validHyperTextPositions
}
