const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    data: {
      type: Map,
      of: Array
    },
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Glyph', schema);
