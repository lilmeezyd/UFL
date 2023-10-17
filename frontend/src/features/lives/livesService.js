import axios from 'axios'

const API_URL = 'http://localhost:5000/api/livepicks/manager/'

const addPointsToPicks = async(data, token, roles) => {
    const {mid, pid} = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(data)
    const response = await axios.put(API_URL+`matchday/${mid}/player/${pid}`, config)
    console.log(response)
    return response.data
}

const setInitialPoints = async(data, token, roles) => {
    const { mid, fid } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+`matchday/${mid}/start/fixtures/${fid}`, config)
    return response.data
}

// Get lives
const getLives = async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+id, config)
    return response.data
}

const deletePoints = async(data, token, roles) => {
    const {mid, id} = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(data)
    const response = await axios.put(API_URL+`matchday/${mid}/fixtures/${id}`, config)
    console.log(response)
    return response.data
}

const livesService = {
    setInitialPoints,
    addPointsToPicks,
    getLives,
    deletePoints
}

export default livesService