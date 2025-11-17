import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getChallengeById, joinChallenge } from "../api/challenges";
import { useAuth } from "../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import { TbTargetArrow } from "react-icons/tb";
import { IoMdTimer } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    async function fetchData() {
      try {
        const ch = await getChallengeById(id);
        setChallenge(ch);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        toast.error("Failed to load challenge!");
        setChallenge(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleJoin = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: `/challenges/${id}` } });
      return;
    }
    setJoining(true);
    try {
      await joinChallenge(id);
      toast.success("Successfully joined the challenge!");
      navigate("/challenges/add");
    } catch (error) {
      console.error("Join error:", error);
      toast.error("Failed to join challenge.");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 animate__animated animate__fadeIn">
        <span className="loading loading-ring loading-sm"></span>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="text-center py-20 animate__animated animate__shakeX">
        Challenge not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="bg-white rounded-2xl shadow-lg p-6 animate__animated animate__fadeInUp"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
          {challenge.title}
        </h2>
        {challenge.imageUrl && (
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            className="w-full max-h-96 object-cover mb-4 rounded-xl shadow-md"
          />
        )}
        <p className="text-sm text-gray-600 mb-2 font-semibold">
          Category: {challenge.category}
        </p>
        <p className="text-gray-700 mb-6">{challenge.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-gray-800 font-medium">
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <p className="flex items-center gap-2"><IoMdTimer /> Duration</p>
            <p className="text-lg font-semibold">{challenge.duration} days</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <p className=" flex items-center gap-2"> <TbTargetArrow /> Target</p>
            <p className="text-lg font-semibold">{challenge.target}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <p className=" flex items-center gap-2"><AiOutlineTeam /> Participants</p>
            <p className="text-lg font-semibold">{challenge.participants}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <p className=" flex items-center gap-2"><MdDateRange /> Start Date</p>
            <p className="text-lg font-semibold">
              {new Date(challenge.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <p className=" flex items-center gap-2"><MdDateRange /> End Date</p>
            <p className="text-lg font-semibold">
              {new Date(challenge.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {currentUser ? (
          <button
            onClick={handleJoin}
            disabled={joining}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            {joining ? "Joining…" : "Join Challenge"}
          </button>
        ) : (
          <Link to="/login" state={{ from: `/challenges/${id}` }}>
            <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg transition transform hover:-translate-y-1">
              Login to Join
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
