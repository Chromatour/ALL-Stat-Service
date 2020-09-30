const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  challongeMatchId: {
    type: String,
    required: true,
  },
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  numberOfGames: {
    type: Number,
    required: true,
  },
  team1Wins: {
    type: Number,
    default: 0,
  },
  team2Wins: {
    type: Number,
    default: 0,
  },
  games: [{
    type: ObjectId,
    ref: 'games',
  }],
  tournamentCodes: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('matches', schema);
