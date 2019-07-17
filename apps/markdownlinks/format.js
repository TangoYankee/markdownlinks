format = (text) => {
    /*receive markdown hyperlink syntax, return slack hyperlink syntax */
    var brackets_parentheses = allIndexOf(text, "](");
    var brackets = allIndexOf(text, "[");
    var parentheses = allIndexOf(text, ")");
    if (brackets_parentheses) {
        let message = text;
        let all_link_positions = allLinkPositions(brackets_parentheses, brackets, parentheses);
        for (link_positions of all_link_positions) {
            if (validLinkPositions(link_positions)) {
                let link_string = findLinkString(link_positions, text);
                let unhttped_link_address = findLinkAddress(link_positions, text);
                let link_address = httpLinkAddress(unhttped_link_address);
                let message_link = createMessageLink(link_address, link_string);
                let markdown_link = findMarkdownLink(link_positions, text);
                if (checkLinkString(link_string) && checkLinkAddress(unhttped_link_address)) {
                    message = replaceLink(markdown_link, message_link, message);
                }
            }
        }
        return message;
    } else {
        return text;
    }
}


allIndexOf = (text, search_char) => {
    /*find all the positions of a character in a string*/
    let start_index = 0, index, indices = [], count = 0;
    while ((index = text.indexOf(search_char, start_index)) > -1 && count < 20) {
        indices.push(index);
        start_index = index + 1;
        count++;
    }
    return indices;
}


allLinkPositions = (brackets_parentheses, brackets, parentheses) => {
    /*all of the positions of characters which compose markdown syntax links.
    a closed bracket/open parenthesis pair is used as the link indicator*/
    let all_positions = [];
    let brackets_parentheses_len = brackets_parentheses.length;
    for (var i = 0; i < brackets_parentheses_len; i++) {
        let previous_position = findPreviousPosition(i, brackets_parentheses);
        let current_position = brackets_parentheses[i]
        let next_position = findNextPosition(i, brackets_parentheses, brackets_parentheses_len, parentheses);

        let positions = [undefined, current_position, undefined];
        positions[0] = findOpenBracket(brackets, current_position, previous_position);
        positions[2] = findClosedParenthensis(parentheses, current_position, next_position);

        all_positions.push(positions);
    }
    return all_positions;
}


findPreviousPosition = (i, brackets_parentheses) => {
    /*find the bracket/parenthesis pair that occurs before the current one*/
    if (i == 0) {
        return 0;
    } else {
        var j = i - 1;
        return brackets_parentheses[j];
    }
}


findNextPosition = (i, brackets_parentheses, bracket_parentheses_len, parentheses) => {
    /*find the bracket/parenthesis pair that occurs after the current one*/
    if (i == (bracket_parentheses_len - 1)) {
        return parentheses[parentheses.length - 1];
    } else {
        var k = i + 1;
        return brackets_parentheses[k];
    }
}


findClosedParenthensis = (parentheses, current_position, next_position) => {
    /*Find the position of the closed parenthesis, associated with the hyperlink*/
    let filtered_parentheses = parentheses.filter(parenthesis => parenthesis > current_position && parenthesis <= next_position);
    return filtered_parentheses[0];
}


findOpenBracket = (brackets, current_position, previous_position) => {
    /*Find the position of the open bracket associated with the hyperlink*/
    let filtered_brackets = brackets.filter(bracket => bracket < current_position && bracket >= previous_position);
    return filtered_brackets.pop();
}


validLinkPositions = (link_positions) => {
    /*check that the set of positions for characters could represent a hyperlink*/
    let has_values = link_positions.every(value => value >= 0);
    let has_numbers = link_positions.every(value => typeof (value) === 'number');
    let correct_length = link_positions.length == 3;
    let correct_order = (link_positions[0] < link_positions[1] && link_positions[1] < link_positions[2])
    return (correct_length && has_values && has_numbers && correct_order)
}


findMarkdownLink = (link_positions, text) => {
    /*identify entire portion of markdown syntax*/
    return text.slice(link_positions[0], link_positions[2] + 1);
}


findLinkString = (link_positions, text) => {
    /*identify text portion of hyperlink from message string*/
    return text.slice(link_positions[0] + 1, link_positions[1]);
}


checkLinkString = (link_string) => {
    /*link string cannot be blank or only spaces*/
    link_string_trim = link_string.trim();
    if (link_string_trim) {
        return true;
    } else {
        return false;
    }
}


findLinkAddress = (link_positions, text) => {
    /*identify url portion of link from message string*/
    return text.slice(link_positions[1] + 2, link_positions[2]);
}


checkLinkAddress = (link_address) => {
    /*unhttped_link_address cannot blank or contains a space in the url itself*/
    var link_address_trim = link_address.trim();
    var link_address_space = link_address_trim.includes(" ");
    if (link_address_trim && !link_address_space) {
        return true;
    } else {
        return false;
    }
}


httpLinkAddress = (link_address) => {
    /*ensure that each link has http or https in the url*/
    let lower_case_address = link_address.toLowerCase();
    if (lower_case_address.includes("http://") || lower_case_address.includes("https://")) {
        return link_address;
    } else {
        return `https://${link_address}`;
    }
}


createMessageLink = (link_address, display_text) => {
    /*create slack syntax for text and url*/
    return `<${link_address}|${display_text}>`;
}


replaceLink = (markdown_link, message_link, message) => {
    /*identify and replace the hyperlink based on its exact structure*/
    return message.replace(markdown_link, message_link, message);
}


module.exports = {
    format, allIndexOf, allLinkPositions, validLinkPositions,
    findMarkdownLink, httpLinkAddress, checkLinkString, checkLinkAddress};
