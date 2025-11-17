import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChallenge } from "../api/challenges";
import toast, { Toaster } from "react-hot-toast";
import "animate.css";

const AddChallengePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await createChallenge(form);
      toast.success("Challenge created successfully!", {
        position: "top-right",
        duration: 3000,
      });
      navigate("/my-activities");
    } catch (error) {
      console.error("Error creating challenge:", error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: error.response?.data?.message || "Something went wrong",
        });
        toast.error(error.response?.data?.message || "Failed to create challenge", {
          position: "top-right",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <Toaster />
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 animate__animated animate__fadeInUp">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
          Add New Challenge
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "title", placeholder: "Title" },
            { name: "category", placeholder: "Category" },
            { name: "description", placeholder: "Description", type: "textarea" },
            { name: "duration", placeholder: "Duration (in days)", type: "number" },
            { name: "target", placeholder: "Target Metric" },
            { name: "imageUrl", placeholder: "Image URL" },
            { name: "startDate", placeholder: "Start Date", type: "date" },
            { name: "endDate", placeholder: "End Date", type: "date" },
          ].map((field) => (
            <div key={field.name} className="relative">
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                  rows={4}
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              )}
              {errors?.[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {errors?.general && (
            <p className="text-red-600 text-center font-semibold">{errors.general}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Create Challenge"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChallengePage;
