const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.DB || 'mongodb://localhost/fonts-creator', { useNewUrlParser: true });
};
