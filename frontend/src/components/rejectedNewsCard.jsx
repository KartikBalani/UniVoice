import "./rejectcard.css";
import axios from "axios";

const RejectCard = ({ id, description, article, status, onStatusUpdate }) => {
  const handleClick = () => {
    window.open(article, "_blank");
  };

  const handleAccept = async (e) => {
    e.stopPropagation();
    try {
      // Update status dynamically based on current status
      const updatedStatus = status === "rejected" ? "accepted" : status;

      const res = await axios.patch(
        `http://localhost:3000/admin/update-status/${id}`,
        { status: updatedStatus }
      );

      if (onStatusUpdate) onStatusUpdate(id, updatedStatus);
      console.log("Updated:", res.data);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="reject-card" onClick={handleClick}>
      <div className="reject-content">
        <div className="id">ID: {id}</div>
        <div className="description">Description: {description}</div>
        <div className="article">Article: {article}</div>
        <div className="status">Status: {status}</div>
      </div>
      <div className="reject-button-container">
        <button className="accept-button" onClick={handleAccept}>
          Accept News
        </button>
      </div>
    </div>
  );
};

export default RejectCard;
