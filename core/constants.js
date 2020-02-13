const TELEGRAM_CHANNEL = {
    ALDNOAH: -309287978,
    TESTING: 321013815
}

const GITHUB_ACTION = {
    REVIEW_REQUESTED: 'review_requested',
    SUBMITTED: 'submitted',
    APPROVED: 'approved',
    CHANGES_REQUESTED: 'changes_requested',
    COMMENTED: 'commented',
    CLOSED: 'closed',
    REOPENED: 'reopened'
};

// @TODO remove to db json
const USERS = [
    {
        id: 0,
        telegramID: "@ridho_assuryadi",
        name: "Ridho",
        githubUsername: "ridhoassuryadi"
    },
    {
        id: 1,
        telegramID: "@agusfikri",
        name: "Agus",
        githubUsername: "ikrydev"
    },
    {
        id: 2,
        telegramID: "@aldiskatel",
        name: "Aldi",
        githubUsername: "aldiskatel"
    },
    {
        id: 3,
        telegramID: "@anjar_bording",
        name: "Anjar",
        githubUsername: "gnosprinting"
    },
    {
        id: 4,
        telegramID: "@anjar_bording",
        name: "Anjar",
        githubUsername: ""
    },
]

const DEFAULT_USERS = {
        id: 0,
        telegramID: "Anonym",
        name: "Seseorang",
        githubUsername: "-"
}

module.exports = {
    TELEGRAM_CHANNEL,
    USERS,
    GITHUB_ACTION,
    DEFAULT_USERS
}