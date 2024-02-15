c
const twilio = require('twilio');

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const fromNumber = 'your_twilio_phone_number';
const toNumber = 'recipient_phone_number';

const client = twilio(accountSid, authToken);

const messageContent = 'Hello, this is a test SMS from your Twilio account!';

client.messages
  .create({
    body: messageContent,
    from: fromNumber,
    to: toNumber
  })
  .then((message) => console.log(`SMS sent with SID: ${message.sid}`))
  .catch((error) => console.error(`Error sending SMS: ${error.message}`));