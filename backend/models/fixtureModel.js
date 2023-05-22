const mongoose = require('mongoose')

const fixtureSchema = mongoose.Schema({
    matchday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matchday',
        required: true,
        unique: true
    },
    kickOffTime: {
        type: Date,
        required: true
    },
    stats: [],
    teamAway: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    teamHome: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    teamAwayScore: {
        type: Number
    },
    teamHomeScore: {
        type: Number
    }
})

module.exports = mongoose.model('Fixture', fixtureSchema)