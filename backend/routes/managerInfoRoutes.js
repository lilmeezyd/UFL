const express = require('express')
const router = express.Router()
const { getManagerInfo } = require('../controllers/managerInfoController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')

router.route('/')
.get(protect, verifyRoles(ROLES.NORMAL_USER), getManagerInfo)

module.exports = router