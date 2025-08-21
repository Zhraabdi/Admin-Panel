import axios from "axios";

const API_URL = ("http://localhost:3000/auth");

const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data; 
};

const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data; 
};

export { loginUser, registerUser };


