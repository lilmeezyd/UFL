const asyncHandler = require('express-async-handler')
const Picks = require('../models/picksModel')
const User = require('../models/userModel')
const Matchday = require('../models/matchdayModel')

//@desc Set Pickss
//@route POST /api/picks/matchday/:id
//@access Private
const setPicks = asyncHandler(async(req, res) => {
    const { picks } = req.body
    const user = await User.findById(req.user.id)
    const userHasPicks = await Picks.find({user: req.user.id, matchday: req.params.mid})
    //const validDeadline = await Matchday.findById(req.params.mid)
    if(!picks) {
        res.status(400)
        throw new Error('No players added')
    }
    if(picks.length < 5 || picks.length > 5) {
        res.status(400)
        throw new Error('15 players should be picked')
    }
    //Check if it's past deadline
    /*if(!(validDeadline.deadlineTime >= new Date().toISOString())) {
        res.status(400)
        throw new Error(`Deadline for ${validDeadline.name} has already passed`)
    }*/
    //Check if user already has a team
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
   if(userHasPicks.length > 0) {
        res.status(400)
        throw new Error('User has already made picks')
    }

   const matchdayPicks = await Picks.create({
        picks,
        user: req.user.id,
        matchday: req.params.mid
    })

    res.status(200).json(matchdayPicks)
})

//@desc Get picks
//@route GET /api/picks
//@access Private
const getPicks = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const picks = await Picks.find({user: req.user.id})

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json(picks)
})

//@desc Get Matchday Picks
//@route GET /api/user/:uid/matchday/:mid/picks/me
//@access Private
const getMatchdayPicks = asyncHandler(async (req, res) => {
    const picks = await Picks.find({user: req.params.uid, matchday: req.params.mid})
    const user = await User.findById(req.user.id)
    const matchday = await Matchday.findById(req.params.mid)

    //Check for picks
    if(!picks) {
        res.status(400)
        throw new Error('Picks not found')
    }

    //Check for matchday
    if(!matchday) {
        res.status(400)
        throw new Error('Matchday not found')
    }
     //Check if it's past deadline
     if(!(validDeadline.deadlineTime >= new Date().toISOString())) {
        res.status(400)
        throw new Error(`Deadline for ${validDeadline.name} has already passed`)
    }

    //Check for user
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //Check if logged in user matches the user
    if(picks.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    res.status(200).json(picks)
})

//@desc Get Picks from previous rounds
//@route GET /api/user/:uid/matchday/:mid/picks
//@access Public
const previousPicks = asyncHandler(async (req, res) => {
    const picks = await Picks.find({user: req.params.uid})
    const validDeadline = await Matchday.findById(req.params.mid)
    const user = await User.findById(uid)
    //Check if matchdays are previous
    if(validDeadline.deadlineTime > new Date().toISOString()) {
        res.status(401)
        throw new Error(`Not authorized to view picks before deadline`)
    }
    //Check requested user is valid
    if(!user) {
        res.status(400)
        throw new Error(`Requested user doesn't exist`)
    }
    //Check if requested matchday is valid
    if(!validDeadline) {
        res.status(400)
        throw new Error(`Requested matchday doesn't exist`)
    }
    res.status(200).json(picks)
})

//@desc Update Picks before deadline
//@route PUT /api/user/:uid/matchday/:mid/picks/me
//@access Private
const updatePicks = asyncHandler(async (req, res) => {
    const picks = await Picks.find({user: req.params.uid})
    const user = await User.findById(req.user.id)

    //Check for picks
    if(!picks) {
        res.status(400)
        throw new Error('Picks not found')
    }

    //Check for user
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    //Check if logged in user matches the user
    if(picks.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPicks = await Picks.findByIdAndUpdate(req.params.mid, req.body, {new: true})
    res.status(200).json(updatedPicks)

})

module.exports = { setPicks, getPicks, getMatchdayPicks, updatePicks, previousPicks }