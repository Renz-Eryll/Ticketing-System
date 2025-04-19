import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QtechLogo from "../assets/qtechlogo.png";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Verify OTP logic here
    // After successful verification
    navigate("/reset-password"); // redirect to your Reset Password page
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
          Enter the 4-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="flex justify-between w-full space-x-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Verify OTP
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Didn't receive a code?{" "}
          <button
            onClick={() => alert("Resend OTP logic here")}
            className="text-blue-600 hover:underline font-medium"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
