const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


const rules = {
    testCoverage: `
        Can you cover this code with unit test?
        Please, apply next rules:
            1. Every expect statement be wrapped on "it".
            2. Not allowed use multiple expects in one "it" block.
            3. Use "Jest" library.
            4. Feel free to make an assumption regarding frameworks.
            5. For marcdown symbols use word \`\`\`javascript, not \`\`\`js. it's required to format code with Marcdown: \`\`\`javascript
`,
    simplifyCode: `
        Can you simplify this code?
        Please, apply next rules:
            1. It should be easy to read.
            2. Try not to use javascript methods that mutate state. Such as: push, pop, splice. Use pure methods.
            3. Feel free to create smaller functions if needed.
            4. Feel free to make an assumption regarding frameworks.
            5. For marcdown symbols use word \`\`\`javascript, not \`\`\`js. it's required to format code with Marcdown: \`\`\`javascript
            6. Use this styleguide for code: https://github.com/airbnb/javascript/blob/master/README.md  
            7. Use approach from functional Programming in Javascript           
            8. Move Magic numbers, string etc to constants. 
`
};

const extractCode = text => {
    try {
        return text.split('```javascript')[1].split('```')[0]
    } catch (e) {
        return text;
    }
};

const handler = async (event, context) => {
    try {
        const { content, rulesType } = JSON.parse(event.body);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: Buffer.from(content, "utf-8").toString() + rules[rulesType]}],
    });

        return {
            statusCode: 200,
            body: JSON.stringify({
                content: extractCode(completion.data.choices[0].message.content),
            }),
        };
    } catch (e) {
        console.log('err', e)
        return {
            statusCode: 500,
            body: JSON.stringify({content: 'Oooops. Try one more time.'}),
        };
    }
};

module.exports = { handler };