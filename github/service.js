const ACTION = require('./entity');

const getGithubUrl = (escapedURL) => {
    return escapedURL.replace(/\\/, '');
}

const parseWebhookPayload = (payload) => {
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

const getMessageBasedOnActionType = (actionType) => {
    switch(actionType) {
        case ACTION.APPROVED :
            return 'telah menyetujui pull request '
        break;
        case ACTION.CLOSED :
            return 'telah menutup pull request '
        break;
        case ACTION.REVIEW_REQUESTED:
            return 'telah membuka pull request '
        break;
        case ACTION.REOPENED:
            return 'telah membuka kembali pull request '
        break;
        default:
            return `melakukan action ${actionType} `
        break;
    };
}


module.exports = {
    parseWebhookPayload,
    getGithubUrl,
    getMessageBasedOnActionType
}