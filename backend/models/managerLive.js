const mongoose = require("mongoose");

const managerLiveSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  livePicks: [
    {
      matchday: {
        type: Number,
        required: true
      },
      matchdayId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Matchday'
      },
      activeChip: {
        type: String,
        default: null
      },
      matchdayPoints: {
        type: Number,
        default: null
      },
      matchdayRank: {
        type: Number,
        default: null
      },
      picks: [
        { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true},
         playerPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true},
         playerTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
         multiplier: { type: Number, required: true},
         nowCost: { type: Number, required: true},
         IsCaptain: { type: Boolean, required: true},
         IsViceCaptain: { type: Boolean, required: true},
         position: { type: Number, required: true},
         points: { type: Number, default: null}
      }
      ],
    }
  ],
});

module.exports = mongoose.model("ManagerLive", managerLiveSchema);
