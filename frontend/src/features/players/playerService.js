import axios from "axios";

const API_URL = 'http://localhost:5000/api/players/'

// Create new player
const createPlayer = async (data, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, data, config)
    return response.data
}

// Get all players
const getPlayers = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete players
const deletePlayer =  async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data
}

const playerService = {
    createPlayer,
    getPlayers,
    deletePlayer
}

export default playerService