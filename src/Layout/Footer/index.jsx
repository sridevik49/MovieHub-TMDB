import React from "react";
import "./index.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <h2 className="footer-logo">MovieHub 🎬</h2>

        <ul className="footer-links">
          <li>Home</li>
          <li>Popular</li>
          <li>Top Rated</li>
          <li>Upcoming</li>
        </ul>

        <div className="footer-social">
          <span>Facebook</span>
          <span>Instagram</span>
          <span>Twitter</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} MovieHub. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;