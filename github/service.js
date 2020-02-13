
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

const getMessageBasedOnActionType = (actionType) => {
    if (actionType === GITHUB_ACTION.APPROVED) {
        return 'telah *menyetujui* pull request'
    }
    else if (actionType === GITHUB_ACTION.CLOSED) {
        return 'telah *menutup* pull request '
    }
    else if (actionType === GITHUB_ACTION.REVIEW_REQUESTED) {
        return 'telah *membuka* pull request '
    }
    else if (actionType === GITHUB_ACTION.REOPENED) {
        return 'telah *membuka kembali* pull request '
    } else {
        return `melakukan action ${action_type} `
    }
}

module.exports = {
    parseGithubData: parseGithubData,
    getGithubUrl: getGithubUrl,
    getMessageBasedOnActionType: getMessageBasedOnActionType
}