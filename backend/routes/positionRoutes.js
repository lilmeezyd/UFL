const express = require('express')
const router = express.Router()
const { getPositions, setPosition, updatePosition, deletePosition } = require('../controllers/positionController')
const { protect } = require('../middleware/authMiddleware')
const ROLES = require('../config/permissions')
const verifyRoles = require('../middleware/rolesMiddleware')

router.route('/')
      .get(getPositions)
      .post(protect, verifyRoles(ROLES.ADMIN), setPosition)
router.route('/:id')
      .put(protect, verifyRoles(ROLES.EDITOR, ROLES.ADMIN), updatePosition)
      .delete(protect, verifyRoles(ROLES.ADMIN), deletePosition)

module.exports = router