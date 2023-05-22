const mongoose = require('mongoose')

const statsSchema = mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
})

module.exports = mongoose.model('Stats', statsSchema)