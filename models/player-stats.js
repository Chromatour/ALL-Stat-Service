const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gamesPlayed: {
    type: Number,
  },
  gamesWon: {
    type: Number,
  },
  totalKills: {
    type: Number,
  },
  totalDeaths: {
    type: Number,
  },
  totalAssists: {
    type: Number,
  },
  totalCS: {
    type: Number,
  },
  totalGameTime: {
    type: Number,
  },
  winner: {
    type: String,
    enum: ['Blue', 'Red'],
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('playerStats', schema);
