const mongoose = require('mongoose')
const positionSchema = mongoose.Schema({
    pluralName: {
        type: String,
        required: [ true, 'Please add field']
    },
    singularName: {
        type: String,
        required: [ true, 'Please add field']
    },
    shortName: {
        type: String,
        required: [ true, 'Please add field']
    }
})

module.exports = mongoose.model('Position', positionSchema)