const express = require('express')
const router = express.Router()
const { getTeams, setTeams, updateTeam, deleteTeam } = require('../controllers/teamController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')

router.route('/').get(getTeams).post(protect, verifyRoles(ROLES.ADMIN), setTeams)
router.route('/:id')
    .put(protect, verifyRoles(ROLES.EDITOR, ROLES.ADMIN), updateTeam)
    .delete(protect, verifyRoles(ROLES.ADMIN), deleteTeam)

module.exports = router