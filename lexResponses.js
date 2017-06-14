// ---------- Choose next course of action based on bot configuration ----------
module.exports.delegate = function actionDelegate(sessionAttributes, slots) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots,
    },
  };
};

// ---------- Inform Lex that the user is expected to provide a slot value ----------
module.exports.elicit = function actionElicit(
  sessionAttributes,
  intentName,
  slots,
  slotToElicit,
  message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
    },
  };
};

// ---------- Inform Lex not to expect a response from the user ----------
module.exports.close = function actionClose(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
    },
  };
};
