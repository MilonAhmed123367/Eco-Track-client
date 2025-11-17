import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getUserActivities = async (userId) => {
  const resp = await axios.get(`${API_BASE}/userChallenges?userId=${userId}`);
  return resp.data;
};
