const TelegramBot = require("node-telegram-bot-api");

const newService = (token) => new TelegramBot(token, {polling: true})


const sendNotification = (bot, channelID, message, reply_markup, parse_mode="markdown") =>
bot.sendMessage(channelID, message, {
        parse_mode,
        reply_markup,
    })

module.exports = {
    newService,
    sendNotification
}




