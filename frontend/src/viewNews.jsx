import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewNews = () => {
  const { slug } = useParams();
  const [newsdata, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/viewNews/${slug}`);
      setNewsData(result.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  // Fetch news data when slug changes
  useEffect(() => {
    fetchData();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!newsdata) {
    return <p>No data found!</p>;
  }

  return (
    <>
      <Navbar/>
      <div className="container">
        <h1>{newsdata.Description}</h1>
        <p>{newsdata.Article}</p>
        <p>Published on: {new Date(newsdata.Date).toLocaleDateString()}</p>
      </div>
    </>
  );
};

export default ViewNews;
