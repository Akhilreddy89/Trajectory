import "../style/Navbar.css";

function Navbars() {
  return (
    <header className="navbar">

      <div className="navbar-left">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search courses..."
          />
        </div>

        <button className="icon-btn">
          🔔
        </button>


      </div>
    </header>
  );
}

export default Navbars;