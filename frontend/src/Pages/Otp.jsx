import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QtechLogo from "../assets/qtechlogo.png";
import axios from "axios";
import APIBaseURL from '../APIBaseURL'


const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  // Retrieve email from localStorage. Consider passing it via route state for more robustness.
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("otp_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please try the forgot password process again.");
      // Optional: redirect to forgot password page if email is crucial and not found
      // navigate("/forgot-password");
    }
  }, [navigate]);


  const handleChange = (value, index) => {
    if (value.length > 1 || !/^[0-9]?$/.test(value)) return; // Allow only single digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error on new input

    // Move to next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    // Move to previous input on backspace if current is empty
    else if (!value && index > 0 && document.getElementById(`otp-${index - 1}`)) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return;
    }

    if (!email) {
      setError("Email not found. Please try the forgot password process again.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${APIBaseURL}/verifyOTP`, {
        email,
        otp: parseInt(enteredOtp),
      });
      setSuccessMessage("OTP verified successfully!");
      // Store a flag or token indicating OTP verification for the reset password page
      localStorage.setItem("otp_verified_for_reset", "true");
      localStorage.setItem("reset_email", email); // Ensure email is available for reset page
      navigate("/reset-password");
    } catch (err) {
      console.error("Error verifying OTP: ", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccessMessage("");
    if (!email) {
      setError("Email not found. Cannot resend OTP.");
      return;
    }
    setIsLoading(true);
    try {
      // Assuming your sendOTP endpoint can be called again to resend
      await axios.post(`${APIBaseURL}/sendOTP`, { email });
      setSuccessMessage("A new OTP has been sent to your email.");
      setOtp(["", "", "", ""]); // Clear OTP fields
    } catch (err) {
      console.error("Error resending OTP: ", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4"
    style={{ backgroundColor: "#0D0630" }}>
        
      <img src={QtechLogo} alt="Qtech Logo" className="h-12 mb-6" />

      <div className="bg-white max-w-md w-full p-8 shadow-md rounded-xl border">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          OTP Verification
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter the 4-digit code sent to {email || "your email"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="flex justify-center w-full space-x-2 sm:space-x-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text" // Changed to text to handle single char better with maxLength
                inputMode="numeric" // Suggest numeric keyboard on mobile
                pattern="[0-9]*" // Ensure only numbers can be typed, helps with some mobile keyboards
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    document.getElementById(`otp-${index - 1}`).focus();
                  }
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Didn't receive a code?{" "}
          <button
            onClick={handleResendOtp}
            className="text-blue-600 hover:underline font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
