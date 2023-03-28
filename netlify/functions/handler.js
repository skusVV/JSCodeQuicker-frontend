const express = require('express');
const app = express();

app.get('/api/my-endpoint', (req, res) => {
    res.json({ message: 'Hello from Netlify functions!' });
});

exports.handler = async (event, context) => {
    const { path, httpMethod, headers, queryStringParameters, body } = event;

    // pass the incoming request to our Express app
    app(req, res);

    // return a response
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Request processed successfully.' })
    };
};