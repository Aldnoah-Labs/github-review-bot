
const request = require('request-promise'),
    messages = require('./messages');

const getGithubUrl = (escapedURL) => {
    return escapedURL.replace(/\\/, '');
}

const parseGithubData = (payload) => {
    return {
        assigner: payload.pull_request.user.login || "",
        PRUrl: getGithubUrl(payload.pull_request.html_url || ""),
        action: payload.action || "",
        state: payload.review ? payload.review.state : '',
        title: payload.pull_request.title || "",
        repository: {
            name: payload.repository.name,
            url: payload.repository.url
        }
    }
}

let sendNotification = ({ assigner, PRUrl, title, action, repository }) => {
    request({
        url: process.env.SLACK_WEBHOOKS_URL,
        method: 'POST',
        body: messages.createSlackBody(assigner, PRUrl, title, action, repository),
        json: true
    })
}

module.exports = {
    parseGithubData: parseGithubData,
    getGithubUrl: getGithubUrl,
    sendNotification: sendNotification
}
