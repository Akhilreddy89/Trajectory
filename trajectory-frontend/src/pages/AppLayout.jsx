import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../style/AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;