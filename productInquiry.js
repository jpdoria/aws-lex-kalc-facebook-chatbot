const lexResponses = require('./lexResponses');

const regularProducts = ['cookies', 'sauces', 'savories'];

// ---------- Product prices ----------
const checkPrice = function productPrice(product, sessionAttributes, callback) {
  const str = product.toLowerCase();

  if (str === 'cookies') {
    callback(lexResponses.close(
      sessionAttributes,
      'Fulfilled',
      {
        contentType: 'PlainText',
        content: 'COOKIES: Regular Oatmeal Cookies (Jar of 24) - P270.00, and Sugar-Free Oatmeal Cookies (Jar of 12) - P225.00',
      }));
  } else if (str === 'sauces') {
    callback(lexResponses.close(
      sessionAttributes,
      'Fulfilled',
      {
        contentType: 'PlainText',
        content: 'SAUCES: Aliguetti - P280.00, Tomato Garlic - P230.00, Basil Pesto - P260.00, Malunggay Pesto - P240.00, Spinach Tinapa Pesto - P260.00, Tinapasta - P260.00, Tuyo in Olive Oil - P220.00, Gourmet Tinapa - P230.00, and Tuyo Puttanesca - P280.00',
      }));
  } else if (str === 'savories') {
    callback(lexResponses.close(
      sessionAttributes,
      'Fulfilled',
      {
        contentType: 'PlainText',
        content: 'SAVORIES: Crispy Shrimps - P190.00, Crispy Squid Rings - P230.00 and Melba Toasts - P90.00',
      }));
  }
};

// ---------- Product validation ----------
const validateBuild = function buildValidation(isValid, violatedSlot, messageContent) {
  if (messageContent === null) {
    return {
      isValid,
      violatedSlot,
    };
  }

  return {
    isValid,
    violatedSlot,
    message: {
      contentType: 'PlainText',
      content: messageContent,
    },
  };
};

const validateProduct = function productValidation(product) {
  if (product && regularProducts.indexOf(product.toLowerCase()) === -1) {
    console.log(`error: ${product.toLowerCase()} not found`);
    return validateBuild(false, 'products', `We are very sorry. We do not have ${product.toLowerCase()}.`);
  }

  return validateBuild(true, null, null);
};

// ---------- Product inquiry ----------
module.exports = function productInquiry(intentRequest, callback) {
  const sessionAttributes = intentRequest.sessionAttributes;
  const product = intentRequest.currentIntent.slots.products;
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    const intentName = intentRequest.currentIntent.name;
    const slots = intentRequest.currentIntent.slots;
    const inputTranscript = intentRequest.inputTranscript;
    const validationResult = validateProduct(product);

    console.log(`inputTranscript: ${inputTranscript}`);

    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;

      callback(lexResponses.elicit(
        sessionAttributes,
        intentName,
        slots,
        validationResult.violatedSlot,
        validationResult.message));
      return;
    }

    callback(lexResponses.delegate(sessionAttributes, slots));
  } else if (source === 'FulfillmentCodeHook') {
    console.log(`info: Sending prices for ${product}`);
    checkPrice(product, sessionAttributes, callback);
    console.log('Done.');
  }
};
