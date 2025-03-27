import React from "react";
import { useNavigate } from "react-router-dom";
import "./contactus.css"; // Import CSS for styling

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <h2>📞 Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us!</p>

      <div className="contact-details">
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
};

export default ContactUs;
