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

// Get single player
const getPlayer = async (id) => {
    const response = await axios.get(API_URL+id)
    return response.data
}

// update player
const updatePlayer = async (data, token, roles) => {
    const { id, playerStat, matchday} = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+id, {...playerStat, matchday}, config)
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
    getPlayer,
    updatePlayer,
    deletePlayer
}

export default playerService