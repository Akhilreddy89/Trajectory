import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseServices.js";
import Recommendations from "./Recommendations.jsx";
import Personalinfo from "../components/Personalinfo.jsx";

function Dashboard() {

  return (
    <>
      <Personalinfo />
      {/* <Recommendations/> */}
    </>
  );
}

export default Dashboard;