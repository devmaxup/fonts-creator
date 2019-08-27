const api = require('./api');
const db = require('./db');
const debug = require('./debug');
const pagination = require('./pagination');

module.exports = function (app) {
  debug(app);
  api(app);
  db(app);
  pagination(app);
};
