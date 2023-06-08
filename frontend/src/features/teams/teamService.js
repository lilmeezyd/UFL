import axios from "axios";

const API_URL = 'http://localhost:5000/api/teams/'

// Create new team
const createTeam = async (data, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, data, config)
    return response.data
}

// Get all teams
const getTeams = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete teams
const deleteTeam =  async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data
}

const teamService = {
    createTeam,
    getTeams,
    deleteTeam
}

export default teamService