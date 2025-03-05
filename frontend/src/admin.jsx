import React from "react";
import Navbar from "./components/navbar";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Card from "./components/card";

const admin = () => {
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin", {
        params: { status },
      })
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        alert("Could not fetch data!");
      });
  }, [status]);

  return (
    <>
      <Navbar />
      <div className="containerAdmin">
        <div className="accepted">
          <button
            onClick={() => {
              setStatus("accepted");
              navigate("/admin");
            }}
          >  
          </button>
          <h1>Accepted Articles</h1>
        </div>
        <div className="rejected">
          <button
            onClick={() => {
              setStatus("rejected");
              navigate("/admin");
            }}
          >
          </button>
          <h1>rejected Articles</h1>
        </div>
        <div className="pending">
          <button
            onClick={() => {
              setStatus("pending");
              navigate("/admin");
            }}
          >
          </button>
          <h1>Pending Articles</h1>
        </div>
      </div>

      <hr />

      <div className="cards">
        {data ? (
          data.map((item, index) => (
            <Card
              key={index}
              description={item.description}
              article={item.article}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default admin;
