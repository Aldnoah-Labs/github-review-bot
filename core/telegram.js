const TelegramBot = require("node-telegram-bot-api"),
      token = process.env.TELEGRAM_TOKEN ;

module.exports = {
    bot: new TelegramBot(token, {polling: true}),
}