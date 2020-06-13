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
  team1Players: [{
    type: ObjectId,
    required: true,
  }],
  team2Players: [{
    type: ObjectId,
    requided: true,
  }],
  team1Gold: {
    type: Number,
  },
  team2Gold: {
    type: Number,
  },
  team1Dragons: {
    type: Number,
  },
  team2Dragons: {
    type: Number,
  },
  team1Turrets: {
    type: Number,
  },
  team2Turrets: {
    type: Number,
  },
  team1Heralds: {
    type: Number,
  },
  team2Heralds: {
    type: Number,
  },
  team1Barons: {
    type: Number,
  },
  team2Barons: {
    type: Number,
  },
  team1Bans: [{
    champion: {
      type: String,
    },
    banTurn: {
      type: Number,
    },
  }],
  team2Bans: [{
    champion: {
      type: String,
    },
    banTurn: {
      type: Number,
    },
  }],

}, {
  timestamps: true,
});

module.exports = mongoose.model('games', schema);
