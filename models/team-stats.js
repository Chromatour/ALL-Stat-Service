const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  players: [{
    type: ObjectId,
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
  winner: {
    type: String,
    enum: ['Blue', 'Red'],
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('playerStats', schema);