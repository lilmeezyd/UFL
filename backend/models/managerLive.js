const mongoose = require("mongoose");

const managerLiveSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  activeChip: null,
  livePicks: [
    {
      matchday: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Matchday",
      },
      picks: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
          },
          multiplier: { type: Number, required: true },
          IsCaptain: { type: Boolean, required: true },
          IsViceCaptain: { type: Boolean, required: true },
          position: { type: Number, required: true },
        },
      ],
    }
  ],
});

module.exports = mongoose.model("ManagerLive", managerLiveSchema);
