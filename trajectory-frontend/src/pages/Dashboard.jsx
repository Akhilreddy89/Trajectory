import React, { useEffect, useState } from "react";
import axios from "axios";
import Recommendations from "./recommendations";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseServices.js";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Welcome back,
              <bold>{data.user.fullname}</bold>!</p>
            <p>Here are some courses you might like:</p>
          </>
        )}
        
      </div>
      <Recommendations/>
    </>
  );
}

export default Dashboard;