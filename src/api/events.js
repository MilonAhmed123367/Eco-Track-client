import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// All events (no date filter)
export const getUpcomingEvents = async () => {
  const resp = await axios.get(`${API_BASE}/events`);
  console.log("Fetched Events:", resp.data); // Debug
  return resp.data.slice(0, 4); // শুধু প্রথম 4টা দেখাবে
};

export const createEvent = async (data) => {
  const resp = await axios.post(`${API_BASE}/events`, data);
  return resp.data;
};
