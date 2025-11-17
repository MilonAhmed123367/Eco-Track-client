// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.displayName || "",
    photo: currentUser?.photoURL || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    setForm({
      name: currentUser?.displayName || "",
      photo: currentUser?.photoURL || "",
    });
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-secondary text-4xl"></span>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: form.name,
        photoURL: form.photo,
      });
      const updatedUser = {
        ...currentUser,
        displayName: form.name,
        photoURL: form.photo,
      };
      setCurrentUser(updatedUser);
      toast.success("Profile Updated!");
      setShowForm(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Profile not updated.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="bg-white rounded-3xl shadow-xl p-8 animate__animated animate__fadeInUp hover:shadow-2xl transition-shadow duration-500"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-green-700 text-transparent bg-clip-text animate__animated animate__bounceIn">
          Your Profile
        </h1>

        <div className="mb-6 text-center">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-4 border-green-500 animate__animated animate__zoomIn"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center animate__animated animate__pulse animate__infinite">
              <span className="text-sm text-gray-500">No photo</span>
            </div>
          )}

          <p className="text-lg font-semibold mt-2">
            Name:{" "}
            <span className="font-normal">{currentUser.displayName || "No name set"}</span>
          </p>
          <p className="text-lg font-semibold">
            Email: <span className="font-normal">{currentUser.email}</span>
          </p>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn btn-primary w-full mb-5 animate__animated animate__pulse animate__infinite hover:scale-105 transform transition"
        >
          {showForm ? "Cancel" : "Update Profile"}
        </button>

        {showForm && (
          <form
            onSubmit={handleUpdate}
            className="space-y-4 animate__animated animate__fadeIn"
          >
            <input
              type="text"
              placeholder="New Name"
              className="input input-bordered w-full focus:ring-2 focus:ring-green-400 transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="New Photo URL"
              className="input input-bordered w-full focus:ring-2 focus:ring-green-400 transition"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
            />
            <button
              type="submit"
              className="btn btn-success w-full hover:scale-105 transform transition-all"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
