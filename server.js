require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 1337,
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    telegram = require('./telegram/service.js'),
    github = require('./github/service'),
    users = require('./users/service'),
    config = require('./config')

const telegramBot = telegram.newService(config.TELEGRAM_TOKEN)

app.use(helmet())

app.listen(port, () => {
    console.log('App running on port ' + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Get messages from Github
app.post('/github', (request, response) => {
    const githubData = github.parseWebhookPayload(JSON.parse(request.body.payload));

    telegram.sendPullRequestNotification(telegramBot,config.TELEGRAM_CHANNEL_ID,{
        messageAction: github.getMessageBasedOnActionType(githubData.action),
        user: users.getUserBasedOnGithubUsername(githubData.assigner),
        title: githubData.title,
        repository: githubData.repository,
        PRUrl: githubData.PRUrl
    })
    response.status(200).json({});
});






// Just testing :P
app.get('/ping', (request, response) => {

    response.json({
        "bot": "ping juga"
    });
});