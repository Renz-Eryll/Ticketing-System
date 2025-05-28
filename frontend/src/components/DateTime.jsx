// DateTime.jsx
import React, { useState, useEffect } from "react";

const DateTime = ({ showDate = true, showTime = true }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div className="space-y-1 text-sm text-gray-500">
      {showDate && <div>{formatDate(currentDateTime)}</div>}
      {showTime && <div> {formatTime(currentDateTime)}</div>}
    </div>
  );
};

export default DateTime;
