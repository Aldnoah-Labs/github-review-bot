require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 1337,
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config/config.js'),
    telegram = require('./telegram/service.js');

const telegramBot = telegram.newService(config.TELEGRAM_TOKEN)

// telegram.bot.on('callback_query', (callbackQuery) => {

//         const message = callbackQuery.message;
//         const category = callbackQuery.data;
     
//         // URLLabels.push({
//         //     url: tempSiteURL,
//         //     label: category,
//         // });
     
//         // tempSiteURL = '';

//         console.log("message", message)
//         console.log("data", category)
     
//         // telegram.bot.sendMessage(321013815, `URL has been labeled with category "${category}"`);
// });
// Configuration and Module Setup
app.listen(port, () => {
    console.log('App running on port ' + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Get messages from Github
// app.post('/github', (request, response) => {
//     let githubData = helpers.parseGithubData(JSON.parse(request.body.payload));

//     // helpers.sendNotification(githubData)
//     response.status(200).json({});
// });



// Just testing :P
app.get('/ping', (request, response) => {
    telegramBot.sendMessage(321013815, `@ridhoassuryadi meminta code review untuk *Svelte Template* bertujuan ${"`bersih bersih`"}`,        {
        parse_mode: "markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Buka Code",
                        url: "https://sean.cat/"
                    }
                ]
            ]
        }
    })
    response.json({
        "bot": "ping jugs"
    });
});