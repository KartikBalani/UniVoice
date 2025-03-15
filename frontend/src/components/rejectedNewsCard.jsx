import React from "react";
import axios from "axios";

const RejectCard = (props) => {
    const handleClick = () => {
      window.open(props.article, "_blank");
    };
  
    const handleAccept = async (e) => {
      e.stopPropagation();
      try {
        const res = await axios.patch(
          `http://localhost:3000/admin/update-status/${props.id}`,
          { status: "accepted" }
        );
        if (props.onStatusUpdate) props.onStatusUpdate(props.id, "accepted");
        console.log("Updated:", res.data);
      } catch (err) {
        console.log("Update error:", err.response?.data || err.message);
        alert("Failed to update status");
      }
    };
  
    return (
      <div className="card" onClick={handleClick}>
        <div className="description">{props.description}</div>
        <div className="article">{props.article}</div>
        <div className="status">{props.status}</div>
        <button className="alert-button" onClick={handleAccept}>
          Accept News
        </button>
      </div>
    );
  };

  
export default RejectCard;
