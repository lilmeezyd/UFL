const mongoose = require('mongoose')

const picksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    matchday: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Matchday'
    },
    points: {
        type: Number,
        default: null
    },
    totalPoints: {
        type: Number,
        default: null
    },
    matchdayRank: {
        type: Number,
        default: null
    },
    overallRank: {
        type: Number,
        default: null
    },
    picks: [
       { player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true},
        position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true},
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
        multiplier: { type: Number, default: 1}
        //playerPrice: { type: Number, required: true}   
    }
    ]
})

module.exports = mongoose.model('Picks', picksSchema)

/* {
  "element_type": 1,
  "element": 113,
  "team": 4,
  "disabled": true,
  "position": 1,
  "multiplier": 1,
  "element_in_cost": "5.0",
  "selling_price": "5.0"
} */