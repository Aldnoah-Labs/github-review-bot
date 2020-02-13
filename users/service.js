const USER = require('./entity');

const getUserBasedOnGithubUsername = (githubUsername) => {
    let user =  USER.ACCOUNTS.find(usr => usr.githubUsername == githubUsername)

    if (user === undefined){
        return USER.DEFAULT_ACCOUNT
    }

    return user
}

module.exports = {
    getUserBasedOnGithubUsername
}