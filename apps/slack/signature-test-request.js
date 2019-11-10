var slackRequest = {
  body: {
    token: 'fake-token-value',
    team_id: 'fake-team-id',
    team_domain: 'fake-team-domain',
    channel_id: 'fake-channel-id',
    channel_name: 'fake-channel-name',
    user_id: 'fake-user-id',
    user_name: 'fake-user-name',
    command: 'fake-command',
    text: 'the lazy dog jumps over the quick brown fox',
    response_url: 'https://fake-response.url',
    trigger_id: 'fake-trigger-id'
  },
  headers: {
    'user-agent': '',
    'accept-encoding': '',
    accept: '',
    'x-slack-signature': 'v0=6a205d5c0edf4b801ef2f83e6c931d1e2d160ffcaad209df4506bce5ae9d6ffe',
    'x-slack-request-timestamp': '1531420618',
    'content-length': '',
    'content-type': '',
    host: '',
    'cache-control': '',
    'x-forwarded-for': ''
  }
}

module.exports = slackRequest
