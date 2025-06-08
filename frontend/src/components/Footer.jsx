import React from "react";

const Footer = () => {
  return (
    <footer className=" pl-0 lg:pl-35 py-2">
      <div className="container mx-auto px-4 flex justify-center items-center text-center mb-3">
        <p className="text-xs sm:text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-blue-600 font-semibold">
            Qtech Business Solutions Inc.
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
