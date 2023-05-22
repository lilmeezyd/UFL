const express = require('express')
const router = express.Router()
const { getPlayers,
        setPlayer,
        updatePlayer,
        deletePlayer } = require('../controllers/playerController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')

router.route('/')
      .get( getPlayers)
      .post(protect, verifyRoles(ROLES.ADMIN), setPlayer)

router.route('/:id')
      .put(protect, verifyRoles(ROLES.ADMIN, ROLES.EDITOR), updatePlayer) 
      .delete(protect, verifyRoles(ROLES.ADMIN), deletePlayer)

module.exports =  router