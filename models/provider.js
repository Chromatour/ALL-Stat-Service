const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  providerId: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
  },

  callbackUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('providers', schema);
