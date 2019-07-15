messages = {};


messages.helpMessage = (feedback) => {
    return {
        "response_type": "ephemeral",
        "blocks": [{
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${feedback}`
            }
        }, {
            "type": "section",
            "text": 
                {
                    "type": "mrkdwn",
                    "text": "*Guide*\nUse /markdownlinks to format your links like so: "
                }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*User Input*\n/markdownlinks make [markdown](https://www.markdownguide.org/) links with [us](http://markdownlinks.io)"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Returned message*\n make <https://www.markdownguide.org/|markdown> links with <http://markdownlinks.io|us>"
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
