const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getUsers } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')


router.get('/', protect, verifyRoles(ROLES.ADMIN), getUsers)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, verifyRoles(ROLES.ADMIN, ROLES.EDITOR, ROLES.NORMAL_USER), getMe)

module.exports = router