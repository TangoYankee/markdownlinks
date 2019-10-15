const { allIndexOf, allLinkPositions, validLinkPositions } = require('./link-positions')

/* reference message for remainder of tests */
var testMessageOne = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
/* base arrays for character position tests */
var bracketsParentheses = [16, 52, 91]
var parentheses = [28, 31, 75, 104]
var brackets = [4, 12, 38, 78]

var charPositions = [
  [testMessageOne, '](', bracketsParentheses],
  [testMessageOne, ')', parentheses],
  [testMessageOne, '[', brackets]]
test.each(charPositions)(
  'finds all the positions of a character in a string', (text, char, expectedArray) => {
    expect(allIndexOf(text, char)).toEqual(expectedArray)
  })

var foundAllLinkPositions = [[12, 16, 28], [38, 52, 75], [78, 91, 104]]
test.each([[bracketsParentheses, brackets, parentheses, foundAllLinkPositions]])(
'all of the positions of characters which compose markdown syntax links', (bracketsParentheses, brackets, parentheses, expectedArray) => {
    expect(allLinkPositions(bracketsParentheses, brackets, parentheses)).toEqual(expectedArray)
})

var isValidLinkPositions = [[[12, 16, 28], true], [[undefined, 34, 23], false], [[56], false], [[12, 6, 20], false], [['0', 1, 2], false]]
test.each(isValidLinkPositions)(
  'check that the set of positions for characters could represent a hyperlink', (linkPositions, expectedBoolean) => {
    expect(validLinkPositions(linkPositions)).toBe(expectedBoolean)
  })
