const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.post('/api/v1/test-coverage', async (req, res) => {
    try {
        const { content, rulesType } = req.body;

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: Buffer.from(content, "utf-8").toString() + rules[rulesType]}],
    });

        return res.send({content: extractCode(completion.data.choices[0].message.content)})
    } catch (e) {
        console.log('err', e)
        return res.send({content: 'Oooops. Try one more time.'});
    }
});

const extractCode = text => {
    try {
        return text.split('```javascript')[1].split('```')[0]
    } catch (e) {
        return text;
    }

}

module.exports = app;
