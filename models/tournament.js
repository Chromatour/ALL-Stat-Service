const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  tournamentName: {
    type: String,
    required: true,
    trim: true,
  },
  tournamentId: {
    type: String,
    required: true,
  },
  challongeTournamentId: {
    type: String,
    required: true,
  },
  numberOfTeams: {
    type: Number,
  },
  division: {
    type: String,
  },
  numberOfMatches: {
    type: Number,
  },
  numberOfMatchesPlayed: {
    type: Number,
  },
  year: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

schema.index({
  tournamentName: 1,
  division: 1,
  year: 1,
}, {
  unique: true,
});

module.exports = mongoose.model('tournaments', schema);
