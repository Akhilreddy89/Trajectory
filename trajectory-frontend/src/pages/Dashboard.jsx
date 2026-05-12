import React, { useEffect, useState } from "react";
import axios from "axios";
import Recommendations from "./recommendations";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [data, setData] = useState(null);
  const navigation = useNavigate();
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(res.status === 401) {
          // throw new Error("Unauthorized");
          navigation("/login");
        }
        console.log(res.data);
        setData(res.data);
  
      } catch (err) {
        navigation("/login");
        // console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>

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