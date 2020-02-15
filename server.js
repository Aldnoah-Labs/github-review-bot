require('dotenv').config();

const express = require('express'),
    app = express(),
    http = require('http'),
    port = process.env.PORT || 1337,
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    telegram = require('./telegram/service.js'),
    github = require('./github/service'),
    users = require('./users/service'),
    config = require('./config'),
    { createTerminus, HealthCheckError } = require('@godaddy/terminus')

const telegramBot = telegram.newService(config.TELEGRAM_TOKEN)

/**
 * Health Check Services
 */
const readinessProbe = ({ http }) => async () => {
    const isServerListening = http.listening 
    
    if (!isServerListening) {
        throw HealthCheckError
    }
}

const terminusOptions = {
    healthChecks: {
        '/livez': () => {},
        '/readyz': readinessProbe({ app })
      },
    timeout: 1000, // in miliseconds
    beforeShutdown: () => {
        console.log("server will be closed")
    }
}

/* 
 * Express Middlewares 
 */
app.use(helmet())
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
})


const server = http.createServer(app)

createTerminus(server, terminusOptions)

server.listen(port, () => {
    console.log('App running on port ' + port);
})
