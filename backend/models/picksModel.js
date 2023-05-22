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
       { player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'}}
    ]
})

module.exports = mongoose.model('Picks', picksSchema)