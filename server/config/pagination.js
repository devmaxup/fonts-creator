const mongoosePaginate = require('mongoose-paginate');

module.exports = function () {
  mongoosePaginate.paginate.options = {
    lean: true,
    limit: 40,
  };
};
