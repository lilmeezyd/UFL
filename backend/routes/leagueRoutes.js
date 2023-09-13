const express = require("express");
const router = express.Router();
const {
  setLeague,
  getLeagues,
  getLeague,
  editLeague,
  deleteLeague,
  addToLeague,
} = require("../controllers/leagueController");
const { protect } = require("../middleware/authMiddleware");
const ROLES = require("../config/permissions");
const verifyRoles = require("../middleware/rolesMiddleware");

router.route("/").post(protect, setLeague).get(protect, getLeagues);
router
  .route("/:id")
  .put(protect, verifyRoles(ROLES.NORMAL_USER), addToLeague)
  .delete(protect, deleteLeague);
router.route("/users/:uid").get(protect, getLeagues);
router.route("/:id").get(protect, getLeague);

module.exports = router;
