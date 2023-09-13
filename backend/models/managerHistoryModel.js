const mongoose = require("mongoose");

const managerHistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  chips: [],
  livePrevious: [
    {
      matchday: {
        type: Number,
        unique: true,
        required: true,
      },
      overallRank: { type: Number },
      matchdayRank: { type: Number },
      points: { type: Number },
      totalPoints: { type: Number },
      pointsOnBench: { type: Number },
      value: { type: Number },
    },
  ],
});

module.exports = mongoose.model("ManagerHistory", managerHistorySchema);
