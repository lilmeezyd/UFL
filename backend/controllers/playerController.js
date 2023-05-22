const asyncHandler =  require('express-async-handler')
const Player = require('../models/playerModel')
const User = require('../models/userModel')

//@desc Set Player
//@route POST /api/players
//@access Private
//@role Admin
const setPlayer = asyncHandler(async (req, res) => {
    let { firstName, secondName, appName, playerPosition, playerTeam } = req.body
    if(!firstName || !secondName || !appName || !playerPosition || !playerTeam ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Find user
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN
    if(!Object.values(user.roles).includes(2048)) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    
    firstName = firstName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
    secondName = secondName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
    appName = appName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')

    const player = await Player.create({
        firstName,
        secondName,
        appName,
        playerPosition,
        playerTeam
    })

    res.status(200).json({msg: `${appName} created`})
})

//@desc Get Players
//@route GET /api/players
//@access public
//@role not restricted
const getPlayers = asyncHandler(async (req, res) => {
    const players = await Player.find({}).populate('playerPosition').populate('playerTeam')
    res.status(200).json(players)
})

//@desc update player
//@route PUT /api/players/:id
//@access private
//@role ADMIN, EDITOR
const updatePlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id)

    // Find user
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN
    if(Object.values(user.roles).includes(1) && Object.values(user.roles).length === 1) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    if(!player) {
        res.status(400)
        throw new Error('Player not found')
    } else {
        Object.keys(req.body).forEach(val => {
            if(val === 'firstName') {
                req.body.firstName = req.body.firstName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
            }
            if(val === 'secondName') {
                req.body.secondName = req.body.secondName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
            }
            if(val === 'appName') {
                req.body.appName = req.body.appName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
            }
        })
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json({msg: `${updatedPlayer.appName} Updated`})
    }
})

//@desc delete player
//@route DELETE /api/players/:id
//@access private
//@role ADMIN
const deletePlayer = asyncHandler(async (rea, res) => {
    const player = await Player.findById(req.params.id)
 
    if(!player) {
        res.status(400)
        throw new Error('Player not found')
    }

    // Find user
    const user = await User.findById(req.user.id).select('-password')
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN
    if(!Object.values(user.roles).includes(2048)) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await Player.findOneAndDelete(req.params.id)
    res.status(200).json({msg: `${player.appName} deleted`})
})


module.exports = { setPlayer, getPlayers, updatePlayer, deletePlayer }