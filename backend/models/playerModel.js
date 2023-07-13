const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, 'Please add first name']
    },
    secondName: {
        type: String,
        required: [ true, 'Please add second name(s)']
    },
    appName: {
        type: String,
        required: [ true, 'Please add name to be used on app']
    },
    playerPosition: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, 'Please add player position'],
        ref: 'Position'
    },
    playerTeam: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true, 'Please add player team' ],
        ref: 'Team'
    },
    matchdays: [],
    matchdayPoints: {
        type: Number,
        default: 0
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    goalsScored: {
        type: Number,
        default: 0
    },
    assists: {
        type: Number,
        default: 0
    },
    ownGoals: {
        type: Number,
        default: 0
    },
    penaltiesSaved: {
        type: Number,
        default: 0
    },
    penaltiesMissed: {
        type: Number,
        default: 0
    },
    yellowCards: {
        type: Number,
        default: 0
    },
    redCards: {
        type: Number,
        default: 0
    },
    saves: {
        type: Number,
        default: 0
    },
    cleansheets: {
        type: Number,
        default: 0
    },
    started: {
        type: Number,
        default: 0
    },
    offBench: {
        type: Number,
        default: 0
    },
    bestPlayer: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('Player', playerSchema)