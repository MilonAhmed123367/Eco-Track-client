import React from "react";
import HeroSlider from "../components/HeroSlider";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />

      <section className="mt-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9E1C60] to-[#811844]">Challenges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* উদাহরণ স্বরূপ কার্ডগুলো */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src="/images/challenge1.jpg" alt="Challenge 1"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Challenge Title 1</h3>
              <p className="text-gray-600 mb-4">Short description of the challenge goes here. Keep it catchy.</p>
              <button className="px-4 py-2 bg-gradient-to-r from-[#9E1C60] to-[#811844] text-white rounded">
                View Challenge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
