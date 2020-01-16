const constants = require('./constants');


const getActionType = (actionType) => {
    if (actionType === constants.APPROVED) {
        return 'telah *menyetujui* pull request'
    }
    else if (actionType === constants.CLOSED) {
        return 'telah *menutup* pull request '
    }
    else if (actionType === constants.REVIEW_REQUESTED) {
        return 'telah *membuka* pull request '
    }
    else if (actionType === constants.REOPENED) {
        return 'telah *membuka kembali* pull request '
    } else {
        return `melakukan action ${action_type} `
    }
}

const createSlackBody = (name, url, title, actionType, repository) =>
    ({
        mkdwn: true,
        text: `${name} ${getActionType(actionType)} untuk  <${url}|${title}> di <${repository.url}|${repository.name}> `,
    });



module.exports = {
    createSlackBody
}