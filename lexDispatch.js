const bazaarScheduleInquiry = require('./bazaarScheduleInquiry');
const productInquiry = require('./productInquiry');
const sayGoodbye = require('./goodbye');

// ---------- Dispatch ----------
module.exports = function doDispatch(intentRequest, callback) {
  const userId = intentRequest.userId;
  const intentName = intentRequest.currentIntent.name;

  console.log(`userId: ${userId}`);
  console.log(`intentName: ${intentName}`);

  if (intentName === 'ProductInquiry') {
    return productInquiry(intentRequest, callback);
  } else if (intentName === 'BazaarScheduleInquiry') {
    return bazaarScheduleInquiry(intentRequest, callback);
  } else if (intentName === 'ThanksGoodbye') {
    return sayGoodbye(intentRequest, callback);
  }

  throw new Error(`Intent with name ${intentName} is not supported.`);
};
