// HomePage.jsx
import React, { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
import { FaChartLine, FaDollarSign, FaHeart, FaLeaf, FaRecycle, FaShareAlt, FaUserPlus } from "react-icons/fa";
import { AiFillDribbbleCircle } from "react-icons/ai";
import { FaArrowTrendUp, FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";

import { getActiveChallenges } from "../api/challenges";
import { getRecentTips } from "../api/tips";
import { getUpcomingEvents } from "../api/events";

import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    async function fetchData() {
      try {
        const [chRes, tipRes, evtRes] = await Promise.all([
          getActiveChallenges(),
          getRecentTips(),
          getUpcomingEvents(),
        ]);

        setChallenges(chRes);
        setTips(tipRes);
        setEvents(evtRes);
      } catch (error) {
        console.error("HomePage fetch error:", error);
        toast.error("Failed to load data!");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 animate__animated animate__fadeIn">
        <span className="loading loading-ring loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 text-gray-900">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <HeroSlider items={challenges.slice(0, 3)} />

      {/* Live Stats */}
      <section className="my-16 text-center animate__animated animate__fadeInUp">
        <h2 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text animate__animated animate__fadeInDown">
          Community Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center rounded-3xl p-6 bg-gradient-to-tr from-green-400 to-green-600 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2" data-aos="zoom-in">
            <FaLeaf className="text-6xl mb-4" />
            <p className="text-2xl font-bold">Community Members</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl p-6 bg-gradient-to-tr from-yellow-400 to-orange-500 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2" data-aos="zoom-in" data-aos-delay="100">
            <AiFillDribbbleCircle className="text-6xl mb-4" />
            <p className="text-2xl font-bold">Plastic Reduced</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl p-6 bg-gradient-to-tr from-blue-400 to-indigo-500 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2" data-aos="zoom-in" data-aos-delay="200">
            <FaArrowTrendUp className="text-6xl mb-4" />
            <p className="text-2xl font-bold">CO₂ Saved</p>
          </div>
        </div>
      </section>

      {/* Browse Challenges */}
      <div className="text-center mt-12 animate__animated animate__fadeIn">
        <Link
          to="/challenges"
          className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Browse All Challenges →
        </Link>
      </div>

      {/* Recent Tips */}
      <section className="my-16" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate__animated animate__fadeInDown">
          Recent Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {tips.slice(0, 5).map((tip) => (
            <div key={tip._id} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1">
              <h4 className="text-xl font-semibold mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-500 mb-3 flex gap-2 items-center">
                by {tip.authorName} <MdOutlineDateRange />{" "}
                {new Date(tip.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {tip.content.substring(0, 100)}…
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="my-16" data-aos="fade-up" data-aos-delay="200">
        <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate__animated animate__fadeInDown">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((evt) => (
            <div key={evt._id} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6">
              <h4 className="text-xl font-bold mb-2">{evt.title}</h4>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <MdOutlineDateRange /> {new Date(evt.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <FaLocationDot /> {evt.location}
              </p>
              <p className="text-gray-700 leading-relaxed">{evt.description.substring(0, 80)} …</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Go Green */}
      <section className="text-center my-16 animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Why Go Green?</h3>
        <ul className="border border-gray-300 p-6 rounded-2xl flex flex-col justify-center items-center space-y-4 text-xl font-semibold shadow-md">
          <li className="flex gap-3 items-center"><FaRecycle className="text-green-500" /> Reduce waste and protect the planet.</li>
          <li className="flex gap-3 items-center"><FaDollarSign className="text-yellow-500" /> Save money with energy-efficient habits.</li>
          <li className="flex gap-3 items-center"><FaHeart className="text-red-500" /> Build a healthier lifestyle & community.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="text-center my-16 animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="400">
        <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">How It Works</h3>
        <ul className="border border-gray-300 p-6 rounded-2xl flex flex-col justify-center items-center space-y-4 text-xl font-semibold shadow-md">
          <li className="flex gap-3 items-center"><FaUserPlus className="text-blue-500" /> Join a challenge →</li>
          <li className="flex gap-3 items-center"><FaChartLine className="text-green-500" /> Track your progress →</li>
          <li className="flex gap-3 items-center"><FaShareAlt className="text-purple-500" /> Share tips with the community.</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
