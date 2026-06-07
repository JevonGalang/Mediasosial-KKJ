import { useContext, useRef, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";

function Navbar() {
  const { searchTerm, setSearchTerm } = useContext(UserContext);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo"></span>
          <h1 className="navbar-title">SosialKu</h1>
        </div>
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input
            ref={searchInputRef}
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Cari user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear"
              id="search-clear-btn"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
