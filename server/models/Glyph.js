const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unicode: {
      type: Number,
    },
    advanceWidth: {
      type: Number,
    },
    pathData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Glyph', schema);
