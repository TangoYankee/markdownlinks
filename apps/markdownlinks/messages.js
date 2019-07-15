messages = {};


messages.helpMessage = (user_id) => {
    return {
        "response_type": "ephemeral",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:confetti_ball: *welcome,* <@${user_id}>!\n_format your hyperlinks like this..._`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*returned message*\n _create <https://markdownguide.org/|nice links>._"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "visit https://markdownlinks.io"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "support <https://www.codeforamerica.org/donate|code for america>"
                    }
                ]
            }
        ]
    }
}

messages.errorMessage = () => {
    return {
        "response_type": "ephemeral",
        "blocks":[
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":warning:please provide input text"
                }
            },
                {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*For instructions, write...* _/markdownlinks help_"
                }
            }
        ]
    }
}


messages.markdownMessage = (markdown_format, user_id) => {
    return {
        "response_type": "in_channel",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${markdown_format}`
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `-shared by <@${user_id}>`
                    }
                ]
            }
        ]
    }
}

exports.data = messages;
