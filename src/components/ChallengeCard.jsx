import React from "react";
import { Link } from "react-router-dom";

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg">
      <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="text-xl font-bold">{challenge.title}</h4>
        <p className="text-sm text-gray-600">{challenge.category}</p>
        <p className="mt-2 text-gray-700">Duration: {challenge.duration} days</p>
        <p className="mt-2 text-gray-700">Participants: {challenge.participants}</p>
        <Link to={`/challenges/${challenge._id}`} className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded">
          View Challenge
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
