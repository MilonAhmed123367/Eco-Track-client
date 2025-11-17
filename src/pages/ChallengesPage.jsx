import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChallenges } from "../api/challenges";
import toast, { Toaster } from "react-hot-toast";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { TbBrandDaysCounter } from "react-icons/tb";

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS

    async function fetchChallenges() {
      try {
        const res = await getAllChallenges();
        setChallenges(res);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast.error("Failed to load challenges", { duration: 3000, position: "top-right" });
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 animate__animated animate__fadeIn">
        <span className="loading loading-ring loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Toaster />
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeInDown">
        All Challenges
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((ch) => (
          <div
            key={ch._id}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow transform hover:-translate-y-2"
            data-aos="fade-up"
          >
            <img
              src={ch.imageUrl}
              alt={ch.title}
              className="w-full h-52 object-cover rounded-t-3xl"
              data-aos="zoom-in"
            />
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-2">{ch.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{ch.category}</p>
              <p className="text-gray-700 mb-1 flex items-center gap-1">Duration:<TbBrandDaysCounter /> {ch.duration} days</p>
              <p className="text-gray-700 mb-4">Participants: {ch.participants}</p>
              <Link
                to={`/challenges/${ch._id}`}
                className="inline-block w-full text-center px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                View Challenge
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesPage;
