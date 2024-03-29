import axios from "axios";

const API_URL = 'http://localhost:5000/api/picks/' 

// Create picks
const createPicks = async (data, token, roles) => {
    const {picks, teamName} = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, {picks, teamName}, config)
    return response.data
}

// Get player picks
const getPicks = async (token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// update player picks
const updatePicks = async (data, token , roles) => {
    const { picks, picksId } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+picksId, {picks}, config)
    return response.data
}

const picksService = {
    createPicks,
    getPicks,
    updatePicks
}

export default picksService