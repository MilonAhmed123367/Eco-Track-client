import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// সব চ্যালেঞ্জ
export const getAllChallenges = async () => {
  const resp = await axios.get(`${API_BASE}/challenges`);
  return resp.data;
};

// active চ্যালেঞ্জ (timezone-safe) – FIXED VERSION
export const getActiveChallenges = async () => {
  const resp = await axios.get(`${API_BASE}/challenges`);

  const today = new Date();
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  return resp.data.filter(ch => {
    if (!ch.startDate || !ch.endDate) return false; // missing date → skip

    const start = new Date(ch.startDate);
    const end = new Date(ch.endDate);

    // 🔥 NOTE:
    // start.setHours() / end.setHours() ব্যবহার করা যাবে না
    // কারণ এটি original object mutate করে এবং React-এ সমস্যা হয়

    // Correct range check:
    return start <= todayEnd && end >= todayStart;
  });
};

// একক চ্যালেঞ্জ fetch
export const getChallengeById = async (id) => {
  const resp = await axios.get(`${API_BASE}/challenges/${id}`);
  return resp.data;
};




export const createChallenge = async (data) => {
  // এখানে data কনভার্ট করব — কিছু ফাইড টাইপ কাস্ট করা দরকার
  const payload = {
    ...data,
    duration: data.duration ? Number(data.duration) : undefined,
    startDate: data.startDate ? new Date(data.startDate) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
  };

  const resp = await axios.post(`${API_BASE}/challenges`, payload);
  return resp.data;
};






// চ্যালেঞ্জ join করা
export const joinChallenge = async (id) => {
  const resp = await axios.post(`${API_BASE}/challenges/join/${id}`);
  return resp.data;
};
