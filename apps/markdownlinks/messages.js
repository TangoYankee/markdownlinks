var messages = {}

messages.helpMessage = (userId) => {
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`
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
          }
        ]
      }
    ]
  }
}

messages.errorMessage = () => {
  return {
    "response_type": "ephemeral",
    "blocks": [
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
// TODO: add section for warning_message
// Warning guidelines
// - must leave room for discretion
// - must inform advisory comes from google
//   - https://developers.google.com/safe-browsing/v4/advisory
//   - Advisory page provides information on phishing/unwanted software/software engineering/malware

// If no threats are found, add context message indicating as such
// If a threat is found, add context message with link to google advisory

// Construct the request to look for "phishing", "social_engineering", "malware" [for any OS], or "unwanted_software" [for any OS]
// If the link is associated with a risk, tag it as potentially harmful
// tag it as one of the listed categories. If there are multiple threats categories, use the tag 'multiple'. If there are no threats, use the tag "none"

// threatContext = (threats)
// called by "mardownMessage"
// Possible combination of messages:
// - no threats documented -<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :face_with_monocle: shared without https
// - :warning: suspected <malware|http://www.stopbadware.org/> -<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :warning: suspected <social engineering|https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html> -<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :warning: suspected <unwanted software|https://www.google.com/about/unwanted-software-policy.html> -<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :warning: multiple suspected threats -<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :warning: unknown suspected threat-<Google Advisories|https://developers.google.com/safe-browsing/v4/advisory>
// - :negative_squared_cross_mark: error in checking for threats
// Either no threats, threats, https, or https and threats. Never https and no threats. Error states may always be added to link, regardless of errors which alread exist on the specific link or general message
// What if the threat is http? Only show the suspect threat as it takes priority. Don't clutter it with multiple errors
// What if the error link is also http? Show both the error and the http monocle. Don't let user assume no document threats were found/not found.

messages.markdownMessage = (markdownFormat, userId) => {
  return {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `${markdownFormat}`
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `-shared by <@${userId}>`
          }
        ]
      }
    ]
  }
}

exports.data = messages
