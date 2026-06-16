import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar_2";

import "../style/AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;