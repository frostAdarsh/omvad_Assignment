import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm">
        <p>
          &copy; {new Date().getFullYear()} URL Scraperr. All rights reserved.
        </p>
        <p className="mt-2 sm:mt-0">Made by Adarsh Mani</p>
        <div className="mt-2 sm:mt-0">
          <a href="#" className="text-green-500 hover:underline mx-2">
            Privacy
          </a>
          <a href="#" className="text-green-500 hover:underline mx-2">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
