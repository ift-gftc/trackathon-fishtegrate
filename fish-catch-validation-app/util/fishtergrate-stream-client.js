const StreamrClient = require('streamr-client');

const API_KEY = 'zblD1FJoQY-UnoOsEUHq6ATmFQwP8HSV6t7YH6LfKetg';
const STREAM_ID = 'FpnIJdi5SuWpENN1XQZ63w';

const client = new StreamrClient({
    // See below for more options
    auth: {
        apiKey: API_KEY
    }
});


let publish = (data) => {
    client.publish(STREAM_ID, data);
}

module.exports = { client, publish };