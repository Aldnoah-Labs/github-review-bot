const request = require('request-promise');

const slackBody = {
    mkdwn: true,
    text: `Ridho minta *code review* untuk 
    [I'm an inline-style link with title `,
    attachments: [
        {
            "fallback": "Review Requested",
            "color": "#f1c40f",
            "fields": [
                {
                    "title": "New Review Request",
                    "value": "*Hey " + "ridho" + "* " +
                        "\n" + "edo" + " needs your review!" +
                        "\nTime to stock up some :cookie: and :coffee:, and give that PR some :heart:" +
                        "\n\n<" + "https://github.com" + "|View Pull Request>",
                    "mrkdwn": true
                }
            ],
            "mrkdwn_in": ["fields"],
        }
    ]
}
https://hooks.slack.com/services/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
request({
    url: "https://hooks.slack.com/services/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",
    method: 'POST',
    body: slackBody,
    json: true
})