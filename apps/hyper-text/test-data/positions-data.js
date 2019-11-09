/* base arrays for character position tests */
const bracketsParentheses = [16, 52, 91]
const parentheses = [28, 31, 75, 104]
const brackets = [4, 12, 38, 78]

const message = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
const charsInMessage = [
  [message, '](', bracketsParentheses],
  [message, ')', parentheses],
  [message, '[', brackets]
]
const expectedHyperTextPositions = [
    [12, 16, 28],
    [38, 52, 75],
    [78, 91, 104]
]
const charPositions = [
    [bracketsParentheses, brackets, parentheses, expectedHyperTextPositions]
]
const areValidPositions = [
    [
        [12, 16, 28], true
    ], 
    [
        [undefined, 34, 23], false
    ],
    [
        [56], false
    ],
    [
        [12, 6, 20], false
    ],
    [
        ['0', 1, 2], false
    ]
]

module.exports = {
    charsInMessage,
    charPositions,
    areValidPositions
}
