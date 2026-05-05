import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);

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

        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
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
  );
}

export default Dashboard;