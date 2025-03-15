import "./card.css"; // Assuming your CSS file is actually card.css
import axios from "axios";

const PendingCard = ({ id, description, article, status, onStatusUpdate }) => {

  const handleClick = () => {
    window.open(article, "_blank");
  };

  const handleReject = async (e) => {
    e.stopPropagation(); // prevent card click

    try {
      const res = await axios.patch(
        `http://localhost:3000/admin/update-status/${id}`,
        { status: "rejected" }
      );

      // ✅ Call the function directly
      if (onStatusUpdate) onStatusUpdate(id, "rejected");

      console.log("Updated:", res.data);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  const handleAccept = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.patch(
        `http://localhost:3000/admin/update-status/${id}`,
        { status: "accepted" }
      );
      if (onStatusUpdate) onStatusUpdate(id, "accepted");
      console.log("Updated:", res.data);
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  

  return (
    <div className="card" onClick={handleClick}>
      <div className="description">{description}</div>
      <div className="article">{article}</div>
      <button
        className="pending-button1"
        onClick={handleAccept}
      >
        Accept
      </button>
      <button
        className="pending-button2"
        onClick={handleReject}
      >
        Reject
      </button>
    </div>
  );
};

export default PendingCard;
