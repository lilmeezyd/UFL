import axios from "axios";
const API_URL = "http://localhost:5000/api/managerinfo/";

const getManagerInfo = async (token, roles) => {
  const config = {
    headers: {
      Authorization: `Bearer: ${token}`
    }
  }
  const response = await axios.get(API_URL, config);
  return response.data;
};
const managerInfoService = { getManagerInfo };
export default managerInfoService;
