import axios from "axios";

const API_URL = "http://localhost:5000/api/positions/"

// Create new position
const createPosition = async (data, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, data, config)
    return response.data
}

// Get all positions
const getPositions = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete positions
const deletePosition =  async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data
}

const positionService = {
    createPosition,
    getPositions,
    deletePosition
}

export default positionService