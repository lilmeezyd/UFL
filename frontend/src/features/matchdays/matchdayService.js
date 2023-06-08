import axios from "axios";

const API_URL = 'http://localhost:5000/api/matchdays/'

// Create new matchday
const createMatchday = async (data, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, data, config)
    return response.data
}

// Get all matchdays
const getMatchdays = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete matchdays
const deleteMatchday =  async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data
}

const matchdayService = {
    createMatchday,
    getMatchdays,
    deleteMatchday
}

export default matchdayService