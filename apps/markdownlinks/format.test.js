const { format, allIndexOf, allLinkPositions,
    validLinkPositions, findMarkdownLink, httpLinkAddress } = require('./format');


// App should fail to replace the user-inputted link if:
    // Issue: What if there is a space in the link address?
    // What if the display text or link address are blank/only spaces?


var test_message = "Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)";
var expected_message = "Here[ in my <https://dmv.ca.gov|car> I) feel <https://www.osha.com/|safest of all>. <https://example.com|Example site>";
var test_message_two = "[code](codeforamerica.com)"
var expected_message_two = "<https://codeforamerica.com|code>"
var test_urls = ["dmv.ca.gov", "https://www.osha.com/", "example.com", "http://github.com/tangoyankee/", "youtube.com", "https://openoakland.org", "tangled.city", "slack.com/apps",
    "google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746"];
var test_texts = ["My Car", "Safety First", "Registered Domain", "GitHub Repository", "Brain Drain videos", "Civic Hacking", "Tactical Urbanism", "Applications", "Glen Cove Marina"];


var fromat_text = [[test_message, expected_message], [test_message_two, expected_message_two]]
test.each(fromat_text)(
    'receive markdown hyperlink syntax, return slack hyperlink syntax', (input, output) => {
        expect(format(input)).toEqual(output);
    });


var brackets_parentheses = [16, 52, 91];
var parentheses = [28, 31, 75, 104];
var brackets = [4, 12, 38, 78];
test.each([[test_message, "](", brackets_parentheses], [test_message, ")", parentheses], [test_message, "[", brackets]])(
    'finds all the positions of a character in a string', (text, char, expected_array) => {
        expect(allIndexOf(text, char)).toEqual(expected_array);
    });


var all_link_positions = [[12, 16, 28], [38, 52, 75], [78, 91, 104]];
test.each([[brackets_parentheses, brackets, parentheses, all_link_positions]])(
    'all of the positions of characters which compose markdown syntax links', (brackets_parentheses, brackets, parentheses, expected_array) => {
        expect(allLinkPositions(brackets_parentheses, brackets, parentheses)).toEqual(expected_array);
    });


var is_valid_link_positions = [[[12, 16, 28], true], [[undefined, 34, 23], false], [[56], false], [[12, 6, 20], false]];
test.each(is_valid_link_positions)(
    'check that the set of positions for characters could represent a hyperlink', (link_positions, expected_boolean) => {
        expect(validLinkPositions(link_positions)).toBe(expected_boolean);
    });

    
var markdown_link = [[[12, 16, 28], test_message, "[car](dmv.ca.gov)"], [[38, 52, 75], test_message, "[safest of all](https://www.osha.com/)"], [[78, 91, 104], test_message, "[Example site](example.com)"]];
test.each(markdown_link)(
    'identify entire portion of markdown syntax', (link_positions, text, expected_markdown) => {
        expect(findMarkdownLink(link_positions, text)).toEqual(expected_markdown);
    });


var http_links = [["dmv.ca.gov", "https://dmv.ca.gov"], ["hTtp://example.com", "hTtp://example.com"], ["Https://www.osha.com/", "Https://www.osha.com/"]]
test.each(http_links)(
    'ensure that each link has http or https in the url', (input_link, expected_link) => {
        expect(httpLinkAddress(input_link)).toEqual(expected_link);
    });
