import axios from "axios";

const API_URL = 'http://localhost:5000/api/fixtures/'

// Create new fixture
const createFixture = async (data, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, data, config)
    return response.data
}

// Get all fixtures
const getFixtures = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Populate Fixture
const populateFixture = async (id, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+id+'/populate', config)
    return response.data
}

// Delete fixtures
const deleteFixture =  async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data
}

const fixtureService = {
    createFixture,
    getFixtures,
    populateFixture,
    deleteFixture
}

export default fixtureService