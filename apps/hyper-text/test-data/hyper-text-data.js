
const inputMessageOne = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
const expectedMessageOne = 'Here[ in my <https://dmv.ca.gov|car> I) feel <https://www.osha.com/|safest of all>. <https://example.com|Example site>'

const inputMessageTwo = '[code](codeforamerica.com)'
const expectedMessageTwo = '<https://codeforamerica.com|code>'

const inputMessageThree = "What if it's [blank]() []() [](www.osha.com)?"
const expectedMessageThree = "What if it's [blank]() []() [](www.osha.com)?"

const inputMessageFour = "What it's a [space](nas a.gov) [ ](nasa.gov)?"
const expectedMessageFour = "What it's a [space](nas a.gov) [ ](nasa.gov)?"

const inputMessageFive = ')( [] :warning: A mess of [(]Directions to Glen Cove ](Google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746)Marina)'
const expectedMessageFive = ')( [] :warning: A mess of <https://google.com/maps/place/glen+cove+marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746|(]Directions to Glen Cove >Marina)'

const messages = [
  [inputMessageOne, expectedMessageOne],
  [inputMessageTwo, expectedMessageTwo],
  [inputMessageThree, expectedMessageThree],
  [inputMessageFour, expectedMessageFour],
  [inputMessageFive, expectedMessageFive]
]

module.exports = {
  messages
}
