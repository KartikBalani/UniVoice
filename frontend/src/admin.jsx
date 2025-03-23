import "react";
import Navbar from "./components/navbar";
import "./admin.css";
import { useUser } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AcceptCard from "./components/approvedNewCard";
import RejectCard from "./components/rejectedNewsCard";
import PendingCard from "./components/pendingNewsCard"; // Don't forget this import!

const Admin = () => {

  const { userType } = useUser();
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // Add this function in Admin.jsx

  const updateLocalStatus = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, Status: newStatus } : item
      )
    );
  };


  function SelectCard(props) {
    const { status, description, article, id, onStatusUpdate , thumbnail } = props;
  
    if (status === "accepted") {
      return (
        <AcceptCard
          description={description}
          article={article}
          id={id}
          status={status}
          onStatusUpdate={onStatusUpdate}
          thumbnail={thumbnail}
        />
      );
    } else if (status === "rejected") {
      return (
        <RejectCard
          description={description}
          article={article}
          id={id}
          status={status}
          onStatusUpdate={onStatusUpdate}
          thumbnail={thumbnail}
        />
      );
    } else {
      return (
        <PendingCard
          description={description}
          article={article}
          id={id}
          status={status}
          onStatusUpdate={onStatusUpdate}
          thumbnail={thumbnail}
        />
      );
    }
  }
  

  // 👉 Fetch data based on current selected status
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin", { params: { status } })
      .then((result) => {
        console.log("Fetched data:", result.data);
        setData(result.data);
      })
      .catch(() => {
        alert("Could not fetch data!");
      });
  }, [status]);

  return (
    <>
      <Navbar userType={userType}/>
      <div className="containerAdmin">
        <div className="accepted">
          <button onClick={() => setStatus("accepted")}>Accepted</button>
          <h1>Accepted Articles</h1>
        </div>
        <div className="rejected">
          <button onClick={() => setStatus("rejected")}>Rejected</button>
          <h1>Rejected Articles</h1>
        </div>
        <div className="pending">
          <button onClick={() => setStatus("pending")}>Pending</button>
          <h1>Pending Articles</h1>
        </div>
      </div>

      <hr />

      <div className="cards">
        {data && data.length > 0 ? (
          data.map((item) => (
            <SelectCard
              key={item._id}
              id={item._id}
              description={item.Description}
              article={item.article}
              status={item.Status}
              thumbnail={item.Thumbnail}
              onStatusUpdate={updateLocalStatus}
            />
          ))
        ) : (
          <p>Loading or No Articles Found</p>
        )}
      </div>
    </>
  );
};

export default Admin;
