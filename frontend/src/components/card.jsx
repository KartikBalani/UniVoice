import React from 'react';
import './card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, description, Date, EditorId, id, status, rejectionReason,showStatus = false }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/ViewNews/${id}`)}>
      <img src={thumbnail} alt="thumbnail" />
      <hr />
      <h2>{description}</h2>
      <div className="info">
        {!showStatus && <p>Article By: {EditorId}</p>}
        <p>Submitted on: {Date}</p>
        {/* ✅ Corrected status display */}
        {showStatus ? <p>Status: {status || "N/A"}</p> : <p>ID: {id}</p>}
        {status === "rejected" && rejectionReason && (
                    <p className="rejection-reason">
                      Rejection Reason: {rejectionReason}
                    </p>
                )}
      </div>
    </div>
  );
};

export default Card;
