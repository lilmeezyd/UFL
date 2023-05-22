const express = require('express')
const router = express.Router()
const { setMatchday, getMatchdays, updateMatchday, deleteMatchday} = require('../controllers/matchdayController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')

router.route('/')
      .get(getMatchdays)
      .post(protect, verifyRoles(ROLES.ADMIN), setMatchday)
router.route('/:id')
      .put(protect, verifyRoles(ROLES.ADMIN, ROLES.EDITOR), updateMatchday)
      .delete(protect, verifyRoles(ROLES.ADMIN), deleteMatchday)

module.exports = router