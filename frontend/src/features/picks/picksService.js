import axios from "axios";

const API_URL = 'http://localhost:5000/api/picks/' 

// Create new fixture
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

// Create new fixture
const getPicks = async (token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const picksService = {
    createPicks,
    getPicks
}

export default picksService