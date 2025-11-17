import React, { useState } from "react";
// no actual email verification flow as per your requirement
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // just show message / toast
    alert("If this were implemented, a reset link would be sent to your email.");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
