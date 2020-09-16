const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * This schema is for each game.
 * This does not determine the winning team, but only winning side and stores the stats for a game.
 */

const schema = new Schema({
  gameDuration: {
    type: Number,
  },
  winner: {
    type: String,
    enum: ['Blue', 'Red'],
  },
  team1Players: [{
    type: String,
    required: true,
  }],
  team2Players: [{
    type: String,
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
  team1Inhibitors: {
    type: Number,
  },
  team2Inhibitors: {
    type: Number,
  },
  team1Bans: [{
    championId: {
      type: String,
    },
    pickTurn: {
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
