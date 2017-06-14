const lexDispatch = require('./lexDispatch');

// ---------- Main handler ----------
exports.handler = (event, handler, callback) => {
  try {
    lexDispatch(event, (response) => {
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};
