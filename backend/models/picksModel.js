const mongoose = require('mongoose')

const picksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    picks: [
       { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true},
        playerPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true},
        playerTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
        multiplier: { type: Number, required: true},
        nowCost: { type: Number, required: true},
        IsCaptain: { type: Boolean, required: true},
        IsViceCaptain: { type: Boolean, required: true},
        position: { type: Number, required: true}   
    }],
    teamValue: { type: Number, required: true},
    bank: { type: Number, required: true}
    
})

module.exports = mongoose.model('Picks', picksSchema)