const lexResponses = require('./lexResponses');

// ---------- Goodbye message ----------
const sayGoodbye = function bazaarSchedules(sessionAttributes, callback) {
  callback(lexResponses.close(
    sessionAttributes,
    'Fulfilled',
    {
      contentType: 'PlainText',
      content: 'You\'re welcome! Goodbye!',
    }));
};

// ---------- Goodbye ----------
module.exports = function thanksGoodbye(intentRequest, callback) {
  const source = intentRequest.invocationSource;
  const sessionAttributes = intentRequest.sessionAttributes;

  if (source === 'FulfillmentCodeHook') {
    console.log('info: Saying goodbye');
    sayGoodbye(sessionAttributes, callback);
    console.log('Done.');
  }
};
