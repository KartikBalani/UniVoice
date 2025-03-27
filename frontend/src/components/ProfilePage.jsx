import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Card from "../components/card"; // Import the Card component
import "./profile.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userType, userRoll } = useUser(); // Get user data from context
    const [news, setNews] = useState([]);

    useEffect(() => {
        if (!userRoll || userType === "admin") return; // Admins should not fetch news

        const fetchNews = async () => {
            try {
                const url = `http://localhost:3000/user-news?editorId=${userRoll}`;
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setNews(Array.isArray(data) ? data : []);
                } else {
                    console.error("Error fetching news:", data.error);
                }
            } catch (error) {
                console.error("Request failed:", error);
            }
        };

        fetchNews();
    }, [userRoll, userType]);

    return (
        <div className="profile-container">
            <h2>👤 Profile</h2>
            <p><strong>Roll Number:</strong> {userRoll || "N/A"}</p>
            <p><strong>User Type:</strong> {userType}</p>

            {/* Show posted news only if the user is NOT an admin */}
            {userType !== "admin" && (
                <>
                    <h3>📰 Your Posted News</h3>
                    {news.length > 0 ? (
                        <div className="news-grid">
                            {news.map((item) => (
                                <Card
                                key={item._id}
                                id={item._id}
                                thumbnail={item.Thumbnail}
                                description={item.Description}
                                Date={new Date(item.Date).toLocaleDateString()}
                                EditorId={item.EditorId}
                                status={item.Status} // ✅ Pass status
                                showStatus={true} // ✅ Show status instead of ID
                                />
                            
                            ))}
                        </div>
                    ) : (
                        <p>No news posted yet.</p>
                    )}
                </>
            )}

            <button className="back-button" onClick={() => navigate("/")}>
                Go Back
            </button>
        </div>
    );
};

export default ProfilePage;
