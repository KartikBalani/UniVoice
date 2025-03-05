import React from 'react';
import Navbar from './components/navbar';
import Card from './components/card';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import './home.css'

const Home = () => {

  const [cardData , setCardData] = useState([]);
  const [category , setCategory] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/",{
      params : {
        category
      }
    })
    .then(result => {
      console.log(result.data);
      setCardData(result.data);
    })
    .catch(err => {
      alert("error fetching data");
    })
  }, [category]);

  return (
    <>
      <Navbar setCategory = {setCategory}/>
        <div className="cards">
        {cardData.map((item, index) => (
          <Card key={index} description={item.Description} article={item.article} />
        ))}
        </div>
    </>
  );
};

export default Home;
