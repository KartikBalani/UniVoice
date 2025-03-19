import React from 'react';
import './card.css';
import { useNavigate } from 'react-router-dom';

const card = ({ thumbnail, description, article, Date, EditorId ,id}) => {

  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/ViewNews/${id}`)}>
      <img src={thumbnail} alt="thumbnail" />
      <hr />
      <h2>{description}</h2>
      <div className="info">
        <p>Article By: {EditorId}</p>
        <p>Submitted on: {Date}</p>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default card;
