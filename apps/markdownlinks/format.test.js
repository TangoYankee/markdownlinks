const { format, allIndexOf, allLinkPositions,
    validLinkPositions, findMarkdownLink, httpLinkAddress } = require('./format');


// App should fail to replace the user-inputted link if:
    // Issue: What if there is a space in the link address?
    // What if the display text or link address are blank/only spaces?

//Reference message for remainder of tests
var test_message_one = "Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)";
var expected_message_one = "Here[ in my <https://dmv.ca.gov|car> I) feel <https://www.osha.com/|safest of all>. <https://example.com|Example site>";

// Messages exclusive to format function
var test_message_two = "[code](codeforamerica.com)";
var expected_message_two = "<https://codeforamerica.com|code>";

var test_message_three = "What if it's [blank]() []() [](www.osha.com)?";
var expected_message_three = "What if it's [blank]() []() [](www.osha.com)?";

var test_message_four = "What it's a [space](nas a.gov) [ ](nasa.gov)?";
var expected_message_four = "What it's a [space](nas a.gov) [ ](nasa.gov)?";

var test_message_five = ")( [] :warning: A mess of [(]Directions to Glen Cove ](google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746)Marina)"
var expected_message_five = ")( [] :warning: A mess of <https://google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746|(]Directions to Glen Cove >Marina)"


var format_text = [[test_message_one, expected_message_one], [test_message_two, expected_message_two],
[test_message_three, expected_message_three], [test_message_four, expected_message_four],
[test_message_five, expected_message_five]];
test.each(format_text)(
    'receive markdown hyperlink syntax, return slack hyperlink syntax', (test_message, expected_message) => {
        expect(format(test_message)).toEqual(expected_message);
    });


var brackets_parentheses = [16, 52, 91];
var parentheses = [28, 31, 75, 104];
var brackets = [4, 12, 38, 78];
test.each([[test_message_one, "](", brackets_parentheses], [test_message_one, ")", parentheses], [test_message_one, "[", brackets]])(
    'finds all the positions of a character in a string', (text, char, expected_array) => {
        expect(allIndexOf(text, char)).toEqual(expected_array);
    });


var all_link_positions = [[12, 16, 28], [38, 52, 75], [78, 91, 104]];
test.each([[brackets_parentheses, brackets, parentheses, all_link_positions]])(
    'all of the positions of characters which compose markdown syntax links', (brackets_parentheses, brackets, parentheses, expected_array) => {
        expect(allLinkPositions(brackets_parentheses, brackets, parentheses)).toEqual(expected_array);
    });


var is_valid_link_positions = [[[12, 16, 28], true], [[undefined, 34, 23], false], [[56], false], [[12, 6, 20], false], [["0",1,2], false]];
test.each(is_valid_link_positions)(
    'check that the set of positions for characters could represent a hyperlink', (link_positions, expected_boolean) => {
        expect(validLinkPositions(link_positions)).toBe(expected_boolean);
    });

    
var markdown_link = [[[12, 16, 28], test_message_one, "[car](dmv.ca.gov)"], [[38, 52, 75], test_message_one, "[safest of all](https://www.osha.com/)"], [[78, 91, 104], test_message_one, "[Example site](example.com)"]];
test.each(markdown_link)(
    'identify entire portion of markdown syntax', (link_positions, text, expected_markdown) => {
        expect(findMarkdownLink(link_positions, text)).toEqual(expected_markdown);
    });


var http_links = [["dmv.ca.gov", "https://dmv.ca.gov"], ["hTtp://example.com", "hTtp://example.com"], ["Https://www.osha.com/", "Https://www.osha.com/"]]
test.each(http_links)(
    'ensure that each link has http or https in the url', (input_link, expected_link) => {
        expect(httpLinkAddress(input_link)).toEqual(expected_link);
    });
