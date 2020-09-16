const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  teamAbbreviation: {
    type: String,
    required: true,
    unique: true,
  },
  players: [{
    type: String,
    required: true,
    unique: true,
  }],
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

}, {
  timestamps: true,
});

module.exports = mongoose.model('teamStats', schema);
