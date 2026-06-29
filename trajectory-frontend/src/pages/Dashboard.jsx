import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseServices.js";
import Personalinfo from "../components/Personalinfo.jsx";

function Dashboard() {

  return (
    <>
      <Personalinfo />
    </>
  );
}

export default Dashboard;