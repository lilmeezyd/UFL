const mongoose = require("mongoose");

const leagueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: { type: Number, required: true, unique: true },
    startMatchday: {
      type: mongoose.Schema.Types.Number,
      ref: "Matchday",
      required: true,
    },
    endMatchday: {
      type: mongoose.Schema.Types.Number,
      ref: "Matchday",
      default: 30,
    },
    admin: {
      type: Number,
    },
    entrants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ManagerInfo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("League", leagueSchema);
