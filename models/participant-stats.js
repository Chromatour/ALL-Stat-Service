const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  participantId: {
    type: Number,
    required: true,
    unique: true,
  },
  champion: {
    type: String,
    required: true,
  },
  goldEarned: {
    type: Number,
    required: true,
  },
  totalDamageTaken: {
    type: Number,
    required: true,
  },
  totalDamageDealtToChampions: {
    type: Number,
    required: true,
  },
  CS: {
    type: Number,
    required: true,
  },
  visionScore: {
    type: Number,
    required: true,
  },
  CCScore: {
    type: Number,
    required: true,
  },
  kills: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  assists: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('participants', schema);
