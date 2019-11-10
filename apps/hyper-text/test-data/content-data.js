const validUrls = [
  ['nasa', false], ['', false], ['http://.example.com', false],
  ['nasa. gov', false], ['h://nasa.gov', false], ['https://www.nasa.gov', true],
  ['http://na sa.gov', false], ['https://google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746', true]
]
const text = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
const markdownHyperText = [
  [
    [12, 16, 28], text, '[car](dmv.ca.gov)'],
  [
    [38, 52, 75], text, '[safest of all](https://www.osha.com/)'],
  [
    [78, 91, 104], text, '[Example site](example.com)'
  ]
]
const displayTexts = [
  ['0', true],
  ['', false],
  [' ', false]
]
const httpUrls = [
  ['dmv.ca.gov', 'https://dmv.ca.gov'],
  ['http://example.com', 'http://example.com'],
  ['https://www.osha.com/', 'https://www.osha.com/']
]

module.exports = {
  validUrls,
  displayTexts,
  markdownHyperText,
  httpUrls
}
