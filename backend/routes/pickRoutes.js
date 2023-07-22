const express = require('express')
const router = express.Router()
const { setPicks, getPicks, updatePicks, previousPicks } = require('../controllers/picksController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')
/*
router.route('/:uid/matchday/:mid/picks')
      .get(previousPicks)
router.route('/')
router.route('/:uid/matchday/:mid/picks/me')
      .get(protect, getPicks)
      .put(protect, updatePicks)
      .post(protect, setPicks)*/
router.route('/')
      .get(protect, getPicks)
router.route('/matchday/:mid')
      .post(protect, setPicks)
module.exports = router