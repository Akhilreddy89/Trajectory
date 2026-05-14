import React, { useEffect, useState } from "react";
import axios from "axios";
import Recommendations from "./recommendations";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseServices.js";
function Dashboard() {
  const [data, setData] = useState(null);
  const navigation = useNavigate();
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res=await getCourses();
        if(res.status === 401) {
          navigation("/login");
        }
        setData(res.data);
  
      } catch (err) {
        navigation("/login");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <button onClick={() => navigation("/profile")}>Go to Profile</button>
        <button onClick={() => navigation("/bookmarks")}>View Saved courses</button>
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>User Name: {data.user.fullname}</p>
            <p>Email: {data.user.email}</p>
          </>
        )}
        
      </div>
      <Recommendations/>
    </>
  );
}

export default Dashboard;