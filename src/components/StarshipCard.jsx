import { Link } from "react-router-dom";

function StarshipCard({ starship }) {
  if (!starship || !starship.url) return null;
  const starshipId = starship.url.split("/").filter(Boolean).pop();
  return (
    <div className="card">
      <div className="card-content">
        <h3>{starship.name}</h3>
        <div className="card-info">
          <span>Model: </span>
          {starship.model !== "unknown" ? starship.model : "Unknown"}
        </div>
        <div className="card-info">
          <span>Manufacturer: </span>
          {starship.manufacturer !== "unknown"
            ? starship.manufacturer
            : "Unknown"}
        </div>
        <div className="card-info">
          <span>Length: </span>
          {starship.length !== "unknown" ? starship.length : "Unknown"}
        </div>
        <div className="card-info">
          <span>Starship Class: </span>
          {starship.starship_class !== "n/a"
            ? starship.starship_class
            : "No Available"}
        </div>
        <div className="card-actions">
          <Link to={`/starship/${starshipId}`} className="btn">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StarshipCard;
