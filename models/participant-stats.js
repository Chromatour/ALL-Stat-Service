const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  corePlayerId: {
    type: ObjectId,
    required: true,
  },
  summonerName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  lane: {
    type: String,
    required: true,
  },
  stats: {
    win: {
      type: Boolean,
      required: true,
    },
    championId: {
      type: Number,
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
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('participants', schema);
