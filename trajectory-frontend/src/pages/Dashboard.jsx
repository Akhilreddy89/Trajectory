import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseServices.js";
import Recommendations from "./Recommendations.jsx";

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
      <Recommendations/>
    </>
  );
}

export default Dashboard;