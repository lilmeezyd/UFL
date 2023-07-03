const asyncHandler =  require('express-async-handler')
const Player = require('../models/playerModel')
const User = require('../models/userModel')
const Position = require('../models/positionModel')

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
    res.status(200).json(player)
})

//@desc Get Players
//@route GET /api/players
//@access public
//@role not restricted
const getPlayers = asyncHandler(async (req, res) => {
    const players = await Player.find({})
    res.status(200).json(players)
})

//@desc Get Players
//@route GET /api/players/:id
//@access public
//@role not restricted
const getPlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id)

    if(!player) {
        res.status(400)
        throw new Error('Player not found')
    }

    res.status(200).json(player)
})

//@desc update player
//@route PUT /api/players/:id
//@access private 
//@role ADMIN, EDITOR
const updatePlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id)
    const position = await Position.findById(player.playerPosition)

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
    } 
    if(req.body.firstName || req.body.secondName || req.body.appName || 
        req.body.playerPosition || req.body.playerTeam) {
            Object.keys(req.body).forEach(val => {
                if(val === 'firstName') {
                    req.body.firstName = req.body.firstName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
                }
                if(val === 'secondName') {
                    req.body.secondName = req.body.secondName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
                }
                if(val === 'appName') {
                    req.body.appName = req.body.appName.split(' ').map(x => x[0].toLocaleUpperCase()+x.slice(1).toLocaleLowerCase()).join(' ')
                }})
            const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true})
            res.status(200).json({msg: `${updatedPlayer.appName} updated`,updatedPlayer})
        }

    if(req.body.matchday) {
        const matchdayIndex = player.matchdays
                          .findIndex(x => x.matchday.toString() === req.body.matchday.toString())
        
        Object.keys(req.body).forEach(val => {
            if(val === 'goalsScored') {
                if(position.singularName === 'Goalkeeper') {
                    player.matchdays[matchdayIndex].goalsScored += req.body.goalsScored
                    player.matchdays[matchdayIndex].matchdayPoints += (6*req.body.goalsScored)
                }
                if(position.singularName === 'Defender') {
                    player.matchdays[matchdayIndex].goalsScored += req.body.goalsScored
                    player.matchdays[matchdayIndex].matchdayPoints += (6*req.body.goalsScored) 
                }
                if(position.singularName === 'Midfielder') {
                    player.matchdays[matchdayIndex].goalsScored += req.body.goalsScored
                    player.matchdays[matchdayIndex].matchdayPoints += (5*req.body.goalsScored) 
                }
                if(position.singularName === 'Forward') {
                    player.matchdays[matchdayIndex].goalsScored += req.body.goalsScored
                    player.matchdays[matchdayIndex].matchdayPoints += (4*req.body.goalsScored)
                }
            }
            if(val === 'assists') {
                player.matchdays[matchdayIndex].assists += req.body.assists
                player.matchdays[matchdayIndex].matchdayPoints += (3*req.body.assists)
            }
            if(val === 'ownGoals') {
                player.matchdays[matchdayIndex].ownGoals += req.body.ownGoals
                player.matchdays[matchdayIndex].matchdayPoints += (-2*req.body.ownGoals)
            }
            if(val === 'penaltiesSaved') {
                player.matchdays[matchdayIndex].penaltiesSaved += req.body.penaltiesSaved
                player.matchdays[matchdayIndex].matchdayPoints += (5*req.body.penaltiesSaved)
            }
            if(val === 'penaltiesMissed') {
                player.matchdays[matchdayIndex].penaltiesMissed += req.body.penaltiesMissed
                player.matchdays[matchdayIndex].matchdayPoints += (-2*req.body.penaltiesMissed)
            }
            if(val === 'yellowCards') {
                player.matchdays[matchdayIndex].yellowCards += req.body.yellowCards
                player.matchdays[matchdayIndex].matchdayPoints += (-1*req.body.yellowCards)
            }
            if(val === 'redCards') {
                player.matchdays[matchdayIndex].redCards += req.body.redCards
                player.matchdays[matchdayIndex].matchdayPoints += (-3*req.body.redCards)
            }
            if(val === 'saves') {
                player.matchdays[matchdayIndex].matchdayPoints -= Math.floor(player.matchdays[matchdayIndex].saves / 3)
                player.matchdays[matchdayIndex].saves += req.body.saves
                player.matchdays[matchdayIndex].matchdayPoints += Math.floor(player.matchdays[matchdayIndex].saves/3)
            }
        })
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, player, { new: true})
        res.status(200).json({msg: `${updatedPlayer.appName} updated`,updatedPlayer})
    }
        
    
    
})

//@desc delete player
//@route DELETE /api/players/:id
//@access private
//@role ADMIN
const deletePlayer = asyncHandler(async (req, res) => {
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

    await Player.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})


module.exports = { setPlayer, getPlayers, getPlayer, updatePlayer, deletePlayer }