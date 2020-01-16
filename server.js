require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 1337,
    morgan = require('morgan'),
    helpers = require('./helpers'),
    bodyParser = require('body-parser');



// Configuration and Module Setup
app.listen(port, () => {
    console.log('App running on port ' + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Get messages from Github
app.post('/github', (request, response) => {
    let githubData = helpers.parseGithubData(JSON.parse(request.body.payload));

    helpers.sendNotification(githubData)
    response.status(200).json({});
});



// Just testing :P
app.get('/ping', (request, response) => {
    response.json({
        "bot": "ping jugs"
    });
});