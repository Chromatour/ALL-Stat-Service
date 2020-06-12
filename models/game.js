const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  gameId: {
    type: Number,
  },
  gameDuration: {
    type: Number,
  },
  winner: {
    type: String,
    enum: ['Blue', 'Red'],
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('providers', schema);