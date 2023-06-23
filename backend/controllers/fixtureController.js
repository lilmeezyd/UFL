const asyncHandler = require('express-async-handler')
const Fixture = require('../models/fixtureModel')
const Stats = require('../models/statsModel')
const Player = require('../models/playerModel')
const User = require('../models/userModel')

//@desc Set Fixture
//@route POST /api/fixtures
//@access Private
//@role Admin
const setFixture = asyncHandler(async (req, res) => {
    const { matchday, kickOffTime, teamAway, teamHome } = req.body
    if(!matchday || !kickOffTime || !teamAway || !teamHome) {
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
    const fixture = await Fixture.create({
        matchday, kickOffTime, teamAway, teamHome
    })
    res.status(200).json(fixture)
})

//@desc Get Fixtures
//@route GET /api/fixtures
//@access public
//@role not restricted
const getFixtures = asyncHandler(async (req, res) => {
    const fixtures = await Fixture.find({})
    res.status(200).json(fixtures)
})

//@desc Set stats for a specific fixture
//@route PUT /api/fixtures/:id/populate
//@access private
//@role ADMIN EDITOR
const populateStats = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)
    
    // Find user
    const user = await User.findById(req.user.id).select('-password')
    
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user is an ADMIN OR EDITOR
    if(Object.values(req.user.roles).includes(1) && Object.values(req.user.roles).length === 1) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    const identifiers = {
        identifier1 : 'goalsScored',
        identifier2: 'assists',
        identifier3: 'ownGoals',
        identifier4: 'penaltiesSaved',
        identifier5: 'penaltiesMissed',
        identifier6: 'yellowCards',
        identifier7: 'redCards',
        identifier8: 'saves'}
    if(!fixture) {
        res.status(400)
        throw new Error('Fixture not found')
    }
    if(fixture.stats.length > 0) {
        res.status(400)
        throw new Error('Fixture already populated')
    }
    Object.values(identifiers).forEach(identifier => {
        const statObj = { identifier, away:[], home:[]}
        fixture.stats.push(statObj)
    })
    
    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, fixture, {new: true})
    res.status(200).json(updatedFixture)
})

//@desc Edit a specific fixture
//@route PUT /api/fixtures/:id
//@access private
//@role ADMIN, EDITOR
const editFixture = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)
    const { matchday, kickOffTime, teamAway, teamHome } = req.body
    if(!matchday || !kickOffTime || !teamAway || !teamHome) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if(!req.user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the logged in user is an ADMIN OR EDITOR
    if(Object.values(req.user.roles).includes(1) && Object.values(req.user.roles).length === 1) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    if(!fixture) {
        res.status(400)
        throw new Error('Fixture not found')
    }
    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedFixture)
})

//@desc Set stats for a specific fixture
//@route PUT /api/fixtures/:id/stats
//@access private
//@role ADMIN, EDITOR
const editStats = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)
    const { identifier, homeAway, player, value } = req.body
    const playerFound = await Player.findById(player)
    if(fixture.stats.length === 0) {
        res.status(400)
        throw new Error('Fixture not populated yet')
    }
    if(!identifier || !homeAway || !playerFound || !value) {
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
    if(Object.values(user.roles).includes(1) && Object.values(user.roles).length === 1) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    if(identifier === 'ownGoals') {
        if(homeAway === 'away') {
            if(playerFound.playerTeam.toString() !== fixture.teamHome.toString()) {
                res.status(400)
                throw new Error('This should be an own goal')
            }
        }
        if(homeAway === 'home') {
            if(playerFound.playerTeam.toString() !== fixture.teamAway.toString()) {
                res.status(400)
                throw new Error('This should be an own goal')
            }
        }
    } else {
        if(homeAway === 'away') {
            if(playerFound.playerTeam.toString() !== fixture.teamAway.toString()) {
                res.status(400)
                throw new Error(`This should be for one's team`)
            }
        }
        if(homeAway === 'home') {
            if(playerFound.playerTeam.toString() !== fixture.teamHome.toString()) {
                res.status(400)
                throw new Error(`This should be for one's team`)
            }
        }
    }
    const newPlayer = await Stats.create({player})
    const retrievedPlayer = newPlayer.player
    let playerIn =  fixture.stats.filter(x => x.identifier === identifier)[0][homeAway]
                        .some(x => x.player.toString() === retrievedPlayer.toString())
    if(playerIn) {
    let playerIndex =  fixture.stats.filter(x => x.identifier === identifier)[0][homeAway]
                        .findIndex(x => x.player.toString() === retrievedPlayer.toString())
    let newValue = +value
    let a = +(fixture.stats.filter(x => x.identifier === identifier)[0][homeAway][playerIndex].value)
    fixture.stats.filter(x => x.identifier === identifier)[0][homeAway]
        .splice(playerIndex, 1, {player:retrievedPlayer, value:newValue+a})
    } else {
        fixture.stats.filter(x => x.identifier === identifier)[0][homeAway]
        .push({player:retrievedPlayer, value: +value})
    }
    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, fixture, {new: true})
    //res.json(updatedFixture)
    res.status(200).json({msg: `Stats updated`})
})

//@desc Update score for a specific fixture
//@route PUT /api/fixtures/:id/scores
//@access private
//@role ADMIN, EDITOR
const updateScore = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)

    if(!fixture) {
        res.status(400)
        throw new Error('Fixture not found')
    }
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
    if(fixture.stats.length > 0) {
        console.log('Fixture populated')
    } else {
        res.status(400)
        throw new Error(`Stats not populated or fixture not started`)
    }
    

})

//@desc Get Fixture
//@route GET /api/fixtures/:id
//@access private
//@role ADMIN, EDITOR
const getFixture = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)

    if(!req.user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the logged in user is an ADMIN OR EDITOR
    if(Object.values(req.user.roles).includes(1) && Object.values(req.user.roles).length === 1) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    if(!fixture) {
        res.status(400)
        throw new Error('Fixture not found')
    }


    res.status(200).json(fixture)
})

//@desc Delete Fixture
//@route PUT /api/fixtures/:id
//@access private
//@role ADMIN EDITOR
const deleteFixture = asyncHandler(async (req, res) => {
    const fixture = await Fixture.findById(req.params.id)

    if(!fixture) {
        res.status(400)
        throw new Error('Fixture not found')
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

    await Fixture.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})



module.exports = { setFixture, getFixtures, getFixture, populateStats, editFixture, editStats, deleteFixture, updateScore }