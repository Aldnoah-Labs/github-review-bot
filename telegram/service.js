const TelegramBot = require("node-telegram-bot-api");

const newService = (token) => new TelegramBot(token, {polling: true})


const sendNotification = (bot, channelID, message, reply_markup, parse_mode="markdown") =>
    bot.sendMessage(channelID, message, {
            parse_mode,
            reply_markup,
        })

const sendPullRequestNotification = (bot, channelID ,{ messageAction, user, title, repository, PRUrl } ) => { 
    console.log(user)
bot.sendMessage(channelID, `${user.name} ${messageAction} untuk *${title}* di  *${repository.name}*`,        {
        parse_mode: "markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Buka Code",
                        url: PRUrl
                    }
                ]
            ]
        }
    })
}

module.exports = {
    newService,
    sendNotification,
    sendPullRequestNotification
}
