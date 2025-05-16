
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIBaseURL from "../APIBaseURL";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = localStorage.reset_email;

    try {
      const response = await axios.post(`${APIBaseURL}/resetPassword`, {
        email,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      });

      alert("Password reset successful!");
      localStorage.removeItem("reset_email");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to reset password");
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0823] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-[#1A56DB] text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1A56DB] focus:border-[#1A56DB]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1A56DB] focus:border-[#1A56DB]"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#1A56DB] text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 