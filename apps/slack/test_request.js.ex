var slack_request = {
    'body': {
        token: '',
        team_id: '',
        team_domain: '',
        channel_id: '',
        channel_name: '',
        user_id: '',
        user_name: '',
        command: '',
        text: '',
        response_url: '',
        trigger_id: ''
    },
    'headers': {
        'user-agent': '',
        'accept-encoding': '',
        accept: '',
        'x-slack-signature': '',
        'x-slack-request-timestamp': '',
        'content-length': '',
        'content-type': '',
        host: '',
        'cache-control': '',
        'x-forwarded-for': ''
    }
};

module.exports = slack_request;
