import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>Star Wars API</h1>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            <Link to="/starships">Starships</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
