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
  },
  team2Wins: {
    type: Number,
  },
  games: [{
    type: ObjectId,
    ref: 'games'
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('matches', schema);