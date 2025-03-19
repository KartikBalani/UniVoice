import { useState } from "react";
import "./pendingcard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingCard = ({ id, description, article, status, onStatusUpdate,thumbnail }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const navigate = useNavigate();

  const handleRejectClick = (e) => {
    e.stopPropagation();
    setShowPopup(true); // Show the rejection popup
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    try {
      const res = await axios.patch(`http://localhost:3000/admin/update-status/${id}`, {
        status: "rejected",
        rejectedBy: "Admin", // Replace with actual admin username
        rejectionReason,
      });

      if (onStatusUpdate) onStatusUpdate(id, "rejected");
      console.log("Updated:", res.data);

      setShowPopup(false);
      setRejectionReason(""); // Reset the reason field
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  const acceptArticle = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.patch(`http://localhost:3000/admin/update-status/${id}`, {
        status: "accepted",
      });

      if (onStatusUpdate) onStatusUpdate(id, "accepted");
      console.log("Updated:", res.data);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  return (
    <>
      {/* Card Component */}
      <div className="pending-card" onClick={() => navigate(`/ViewNews/${id}`)}>
        <img src={thumbnail} alt="thumbnail" />
        <div className="description">{description}</div>
        <div className="article">{article}</div>

        <div className="button-container">
          <button className="pending-button accept" onClick={acceptArticle}>
            Accept
          </button>
          <button className="pending-button reject" onClick={handleRejectClick}>
            Reject
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Reason for Rejection</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Reason for rejection..."
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="submit-btn" onClick={submitRejection}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingCard;
