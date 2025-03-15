// components/approvedNewCard.jsx
import "./card.css";
import axios from "axios";

const AcceptCard = ({ id, description, article, status, onStatusUpdate }) => {
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

  return (
    <div className="card" onClick={handleClick}>
      <div className="id">{id}</div>
      <div className="description">{description}</div>
      <div className="article">{article}</div>
      <div className="status">{status}</div>
      <button className="alert-button" onClick={handleReject}>
        Reject News
      </button>
    </div>
  );
};

export default AcceptCard;
