import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const RegisterPage = () => {
  const { register: signup, loginWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const validatePassword = (pw) => {
    const regexUpper = /[A-Z]/;
    const regexLower = /[a-z]/;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      pw.length >= 6 &&
      regexUpper.test(pw) &&
      regexLower.test(pw) &&
      regexSpecial.test(pw)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase and a special character."
      );
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password, photoUrl);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Registered with Google successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to register with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeInUp"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
          Join EcoTrack
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="url"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 shadow-lg transition transform hover:-translate-y-1"
          >
            {loading ? "Registering…" : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 shadow-lg transition transform hover:-translate-y-1"
        >
          {loading ? "Please wait…" : "Register with Google"}
        </button>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline animate__animated animate__pulse animate__infinite"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
