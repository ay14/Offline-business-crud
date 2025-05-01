import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-3 mt-auto shadow-inner">
      <div className="text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()} ayush_prashant. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
