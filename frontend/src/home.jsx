import React from "react";
import Navbar from "./components/navbar";
import Card from "./components/card";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [category, setCategory] = useState(null);
  const [currImage, setcurrImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/", {
        params: {
          category,
        },
      })
      .then((result) => {
        console.log(result.data);
        setCardData(result.data);
      })
      .catch((err) => {
        alert("error fetching data");
      });
  }, [category]);

  useEffect(() => {
    if (cardData.length > 0) {
      const interval = setInterval(() => {
        setcurrImage((prevIndex) =>
          prevIndex < cardData.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [cardData, currImage]);

  return (
    <>
      <Navbar setCategory={setCategory} />

      <div className="image-container">
        {cardData.length > 0 && (
          <>
            <img
              key={currImage} // Force re-render
              className="Clg_Image_cards"
              src={cardData[currImage]?.Thumbnail}
              alt={cardData[currImage]?.Description || "IIIT KOTTAYAM"}
              onClick={() => navigate(`/ViewNews/${cardData[currImage]._id}`)}
            />
            <div className="image-description" key={currImage}>
              {cardData[currImage]?.Description || "No description available"}
            </div>
          </>
        )}
        {cardData.length === 0 && (
          <img className="Clg_Image" src="images.jpeg" alt="IIIT KOTTAYAM" />
        )}
      </div>

      <div className="cards">
        {cardData.map((item, index) => (
          <Card
            key={index}
            thumbnail={item.Thumbnail}
            description={item.Description}
            article={item.Article}
            EditorId={item.EditorId}
            Date={new Date(item.Date).toLocaleDateString()}
            id={item._id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
