const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async  (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        const roles = Object.values(user.roles)
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: roles,
            token: generateToken(user._id, roles),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async  (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        const roles = Object.values(user.roles)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles,
            token: generateToken(user._id, roles),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async  (req, res) => {
    res.status(200).json(req.user)
})

//@desc Get all Users
//@route GET /api/users
//@access Private
//@role Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// Generate JWT
const generateToken = (id, roles) => {
    return jwt.sign({ id, roles }, process.env.JWT_SECRET, {expiresIn: '30d',})
}

module.exports = { registerUser, loginUser, getMe, getUsers }