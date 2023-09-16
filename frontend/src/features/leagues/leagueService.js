import axios from "axios";
const API_URL = "http://localhost:5000/api/leagues"

// Create new league
const createLeague = async(data, token, roles) => {}

// Get team leagues
const getTeamLeagues = async() => {}

// Get Overall league
const getOverallLeague = async() => {}

//Add new member to league
const addToLeague = async(data, token, roles) => {}

//Delete league
const deleteLeague = async(id, token, roles) => {}

const leagueService = {
    createLeague,
    getTeamLeagues,
    getOverallLeague,
    addToLeague,
    deleteLeague
}

export default leagueService