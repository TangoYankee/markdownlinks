const { allIndexOf, allHyperTextPositions, validHyperTextPositions } = require('../positions')
const { charsInMessage, charPositions, areValidPositions } = require('../test-data/positions-data')

test.each(charsInMessage)(
  'allIndexOf() /* positions of a character in a string */', 
  (text, char, expectedPositions) => {
    expect(allIndexOf(text, char)).toEqual(expectedPositions)
  })

test.each(charPositions)(
  'allHyperTextPositions() /* positions of characters for markdown syntax hyper text */',
  (bracketsParentheses, brackets, parentheses, expectedHyperTextPositions) => {
    expect(allHyperTextPositions(bracketsParentheses, brackets, parentheses)).toEqual(expectedHyperTextPositions)
  })

test.each(areValidPositions)(
  'check that the set of positions for characters could represent a hyperHyperText', (HyperTextPositions, expectedBoolean) => {
    expect(validHyperTextPositions(HyperTextPositions)).toBe(expectedBoolean)
  })
