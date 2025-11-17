import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getRecentTips = async () => {
  const resp = await axios.get(`${API_BASE}/tips`);
  return resp.data.slice(0, 5);
};

export const createTip = async (data) => {
  const resp = await axios.post(`${API_BASE}/tips`, data);
  return resp.data;
};
