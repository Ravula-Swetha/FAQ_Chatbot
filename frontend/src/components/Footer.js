import React from 'react';
import './CSS/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About KMIT</h4>
          <p>
            Keshav Memorial Institute of Technology (KMIT) is dedicated to
            providing quality education and fostering innovation. Our chatbot
            ensures you stay connected with everything KMIT has to offer.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="https://kmit.in/" target="_blank" rel="noopener noreferrer">KMIT Website</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@kmit.in">support@kmit.in</a></p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: Keshav Memorial Institute of Technology, Hyderabad, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KMIT FAQ Chatbot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
