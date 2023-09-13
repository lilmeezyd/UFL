const asyncHandler = require("express-async-handler");

const League = require("../models/leagueModel");
const TeamLeague = require("../models/teamLeagueModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

//@desc Set League
//@route POST /api/leagues
//@access Private
const setLeague = asyncHandler(async (req, res) => {
  const generalLeagues = {
    "Arua Hills": 1,
    "Bul Bidco": 2,
    "Busoga United": 3,
    "Express": 4,
    "Gaddafi": 5,
    "KCCA": 6,
    "Kitara": 7,
    "Maroons": 8,
    "Mbarara City": 9,
    "NEC": 10,
    "SC Villa": 11,
    "Bright Stars": 12,
    "URA": 13,
    "UPDF": 14,
    "Vipers": 15,
    "Wakiso Giants": 16,
    "Neutral": 17,
    "Overall": 18,
  };
  const { name, startMatchday, endMatchday } = req.body;
  //const userId = await User.findById(req.user.id)
  const nameFound = await League.findOne({ name });
  const leagues = await League.find({});
  const maxId = Math.max(...leagues.map((x) => x.id));
  let admin, id;
  if (!name || !startMatchday) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (Object.values(req.user.roles).includes(2048)) {
    if (nameFound) {
      res.status(400);
      throw new Error("League name already assigned");
    }
    if (
      !Object.keys(generalLeagues)
        .map((x) => x.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      res.status(400);
      throw new Error("Trying to create invalid league!");
    }
    id = generalLeagues[name];
    admin = null;
    if (!id) {
      res.status(400);
      throw new Error(`League does not exist`);
    }
  }

  if (!Object.values(req.user.roles).includes(2048)) {
    id = maxId + 1;
    admin = req.user.id;
  }

  const league = await League.create({
    id,
    name,
    startMatchday,
    endMatchday,
    admin,
    entrants: [],
  });

  res.status(200).json(league);
});

//@desc Add to team league
//@route PUT /api/leagues/:id
//@access Private
const addToLeague = asyncHandler(async (req, res) => {
  const leagueAdmin = await League.findById(req.params.id).admin;
  const roles = await User.findById(leagueAdmin).roles;

  //Find user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (Object.values(req.user.roles).includes(2048)) {
    res.status(401);
    throw new Error("Unauthorized operation");
  }
  if (!Object.values(roles).includes(2048)) {
  }
  const entrants = [
    ...(await TeamLeague.findById(req.params.id).entrants),
    req.user.id,
  ];
  const league = await TeamLeague.findByIdAndUpdate(req.params.id, entrants, {
    new: true,
  });
  res.status(200).json(league);
});

//@desc Get Leagues for a specific user
//@route GET /api/leagues/
//@access Private
const getLeagues = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const leagues = await League.find({});

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(leagues);
});

//@desc Get League for a specific user
//@route GET /api/leagues/:id
//@access Private
const getLeague = asyncHandler(async (req, res) => {
  const league = await League.findOne({ id: req.params.id });
  res.status(200).json(league);
});


const editLeague = asyncHandler(async (req, res) => {});

//@desc Delete League
//@route DELETE /api/leagues/:id
//@access Private
const deleteLeague = asyncHandler(async (req, res) => {
  const league = await League.findOne({ id: req.params.id });

  if (!league) {
    res.status(400);
    throw new Error("League not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the user
  if (!Object.values(req.user.roles).includes(2048) && (league.admin.toString() !== req.user.id)) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await League.findOneAndDelete({ id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  setLeague,
  addToLeague,
  getLeagues,
  getLeague,
  editLeague,
  deleteLeague,
};
