const asyncHandler = require('express-async-handler')
const Matchday = require('../models/matchdayModel')
const User = require('../models/userModel')

//@desc Set Matchday
//@route POST /api/matchdays
//@access Private
//@role ADMIN
const setMatchday = asyncHandler(async (req, res) => {
    let { name, deadlineTime } = req.body
    let timeString = new Date(deadlineTime).toISOString()
    name = name && name.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
    const nameExists = await Matchday.findOne({name})

    //Find user
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN
    if(!Object.values(user.roles).includes(2048)) {
        res.status(401)
        throw new Error('Not authorized')
    }
    //Check if matchday exists
    if(nameExists) {
        res.status(400)
        throw new Error('Matchday Exists')
    }
    if(!name || !deadlineTime) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const matchday = await Matchday.create({
        name, deadlineTime
    })
    res.status(200).json({msg: `${name} added`})
})

//@desc Get Matchdays
//@route GET /api/matchdays
//@access Public
//@role Admin, editor, normal_user
const getMatchdays = asyncHandler(async (req, res) => {
    const matchdays = await Matchday.find({})
    res.status(200).json(matchdays)
})

//@desc Update Matchday
//@route PUT /api/matchdays/:id
//@access Private
//@role Admin, editor
const updateMatchday = asyncHandler(async (req, res) => {
    const matchday = await Matchday.findById(req.params.id)
    //Find user
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN
    if(!Object.values(user.roles).includes(2048)) {
        res.status(401)
        throw new Error('Not authorized')
    }

    if(!matchday) {
        res.status(400)
        throw new Error('Matchday not found')
    } else {
        Object.keys(req.body).forEach(val => {
            if(val === 'name') {
                req.body.name = req.body.name.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
            }
        })
        const updatedMatchday = await Matchday.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json({msg: `${updatedMatchday.name} updated`})
    }



})

//@desc Delete Matchday
//@route DELETE /api/matchdays/:id
//@access Private
//@roles Admin
const deleteMatchday = asyncHandler(async (req, res) => {
    const matchday = await Matchday.findById(req.params.id)

    if(!matchday) {
        res.status(400)
        throw new Error('Matchday not found')
    }

    //FInd user 
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    if(!Object.values(user.roles).includes(2048)) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await Matchday.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: `${matchday.name} deleted`})
})

module.exports = { setMatchday, getMatchdays, updateMatchday, deleteMatchday}