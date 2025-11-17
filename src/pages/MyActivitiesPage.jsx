import React, { useEffect, useState } from "react";
import { getUserActivities } from "../api/userChallenges";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const MyActivitiesPage = () => {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    async function fetchActivities() {
      try {
        const res = await getUserActivities(currentUser.uid);
        setActivities(res);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, [currentUser]);

  if (loading) {
    return <div className="text-center py-20"><span className="loading loading-ring loading-sm"></span></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error loading activities</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Activities</h2>
      {activities.length === 0 ? (
        <p>
          You haven’t joined any challenges yet.{" "}
          <Link to="/challenges" className="text-green-600 hover:underline">
            Browse challenges → 
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {activities.map(act => (
            console.log(act),
            <div key={act._id} className="border rounded-lg p-4 hover:shadow-md">
              <h3 className="text-xl font-semibold">{act.challengeTitle}</h3>
              <p className="mt-2">Status: {act.status}</p>
              <p className="mt-1">Progress: {act.progress}%</p>
              <Link to={`/my-activities/${act._id}`} className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyActivitiesPage;
