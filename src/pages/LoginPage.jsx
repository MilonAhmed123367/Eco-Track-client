import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Failed to login. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Login with Google successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Failed to login with Google.");
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
          Login to EcoTrack
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 shadow-lg transition transform hover:-translate-y-1"
        >
          {loading ? "Please wait…" : "Login with Google"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline animate__animated animate__pulse animate__infinite"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 hover:underline animate__animated animate__pulse animate__infinite"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
