const mongoose = require('mongoose')

const matchdaySchema = mongoose.Schema({
    name: { type: String,
    required: [true, 'Add required field']},
    deadlineTime: { type: Date,
    required: [true, 'Add required field']},
    pastDeadline: { type: Boolean, default: false} 
    //highestScore: { type: Number, default: 0},
    //highestEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: 0}
})

module.exports = mongoose.model('Matchday', matchdaySchema)