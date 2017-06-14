const lexResponses = require('./lexResponses');

// ---------- Bazaar schedules ----------
const checkSchedule = function bazaarSchedules(sessionAttributes, callback) {
  callback(lexResponses.close(
    sessionAttributes,
    'Fulfilled',
    {
      contentType: 'PlainText',
      content: 'June 13 (Tuesday) | American Women\'s Club of the Philippines Bazaar, SMX Convention Center, Pasay City. June 16, 17, 18 (Friday - Sunday) | Power Plant Mall (Concourse Level) and SM Aura Premier (Lower Ground Floor), and Glorietta 4 (Plains & Prints Area). June 23, 24, 25 (Friday - Sunday) | Power Plant Mall (Concourse Level) and Glorietta 4 (Plains & Prints Area). June 30, July 1, 2 (Friday - Sunday) | Power Plant Mall (Concourse Level) and Glorietta 4 (Plains & Prints Area). See you there!',
    }));
};

// ---------- Bazaar schedules inquiry ----------
module.exports = function bazaarScheduleInquiry(intentRequest, callback) {
  const source = intentRequest.invocationSource;
  const sessionAttributes = intentRequest.sessionAttributes;

  if (source === 'FulfillmentCodeHook') {
    console.log('info: Sending schedules');
    checkSchedule(sessionAttributes, callback);
    console.log('Done.');
  }
};
