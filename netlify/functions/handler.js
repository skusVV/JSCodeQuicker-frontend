exports.handler = async (event, context) => {
    const {queryStringParameters} = event;
    return {
        statusCode: 200,
        body: 'Hello World!',
    }
}