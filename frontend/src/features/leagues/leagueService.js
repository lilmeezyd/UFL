import axios from "axios";
const API_URL = "http://localhost:5000/api/leagues/";

// Create new league
const createLeague = async (data, token, roles) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

// Get team leagues
const getTeamLeagues = async () => {
  const response = await axios.get(API_URL + "teams");
  return response.data;
};

// Get Overall league
const getOverallLeague = async () => {};

//Add new member to league
const addToLeague = async (id, token, roles) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, config);
  return response.data;
};

// Get your leagues
const getLeagues = async (id, token, roles) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}`
        }
    }

    const response = await axios.get(API_URL+'users/'+id, config)
    return response.data
}

//Delete league
const deleteLeague = async (id, token, roles) => {};

const leagueService = {
  createLeague,
  getTeamLeagues,
  getOverallLeague,
  addToLeague,
  getLeagues,
  deleteLeague,
};

export default leagueService;
