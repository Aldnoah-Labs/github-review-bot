var request = require('request');
const getGithubUrl = (escapedURL) => {
    return escapedURL.replace(/\\/, '');
}

const parseGithubData = (payload) => {
    console.log('action', payload.action);
    console.log('user')
    console.log('url', payload.pull_request.html_url)
    return {
        assigner: payload.pull_request.user.login || "",
        PRUrl: getGithubUrl(payload.pull_request.html_url),
        action: payload.action || "",
        state: payload.review ? payload.review.state : ''
    }
}


const sendNewPRPing = (data, reviewerName) => {
    let promise = new Promise((resolve, reject) => {
        request.post({
            url: config.slack_webhook,
            json: messages.newPRMessage(data, reviewerName)
        }, (err, httpResponse, body) => {
            if (err) {
                reject({
                    "error": true,
                    "httpResponse": httpResponse,
                    "body": err
                });
            }
            resolve({
                "error": false,
                "body": body
            });
        });
    });

    return promise;
};

let getRealName = (githubName) => {
    let promise = new Promise((resolve, reject) => {
        request.get({
            url: 'https://api.github.com/users/' + githubName,
            headers: {
                'User-Agent': 'review-bot'
            }
        }, (err, httpResponse, body) => {
            body = JSON.parse(body);
            if (err) {
                reject({
                    "error": true,
                    "httpResponse": httpResponse,
                    "body": err
                });
            }
            resolve({
                "githubUsername": body.login,
                "name": body.name
            });
        });
    });

    return promise;
};

module.exports = {
    parseGithubData: parseGithubData,
    getRealName: getRealName,
    getGithubUrl: getGithubUrl
}
