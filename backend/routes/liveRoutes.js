const express = require("express");
const router = express.Router();
const {
  getLivePicks,
  getRound,
  setLivePicks,
  setInitialPoints,
  addPointsToPicks,
  deletePoints,
} = require("../controllers/managerLiveController");
const { protect } = require("../middleware/authMiddleware");
const ROLES = require("../config/permissions");
const verifyRoles = require("../middleware/rolesMiddleware");

router.route("/").put(setLivePicks);
router
  .route("/matchday/:mid/fixtures/:id")
  .put(protect, verifyRoles(ROLES.ADMIN), deletePoints);
router
  .route("/matchday/:mid/start/fixtures/:id")
  .put(protect, verifyRoles(ROLES.ADMIN), setInitialPoints);
router.route("/:id").get(protect, getLivePicks);
router.route("/:id/matchday/:mid").get(protect, getRound);
router
  .route("/matchday/:mid/player/:pid")
  .put(protect, verifyRoles(ROLES.ADMIN), addPointsToPicks);

module.exports = router;
