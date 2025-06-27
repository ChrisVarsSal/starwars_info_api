import { Link } from "react-router-dom";

function PlanetCard({ planet }) {
  if (!planet || !planet.url) return null;
  const planetId = planet.url.split("/").filter(Boolean).pop();
  return (
    <div className="card">
      <div className="card-content">
        <h3>{planet.name}</h3>
        <div className="card-info">
          <span>Rotation Period: </span>
          {planet.rotation_period !== "unknown"
            ? planet.rotation_period
            : "Unknown"}
        </div>
        <div className="card-info">
          <span>Orbital Period: </span>
          {planet.orbital_period !== "unknown"
            ? planet.orbital_period
            : "Unknown"}
        </div>
        <div className="card-info">
          <span>Diameter: </span>
          {planet.diameter !== "unknown" ? planet.diameter : "Unknown"}
        </div>
        <div className="card-info">
          <span>Climate: </span>
          {planet.climate !== "n/a" ? planet.climate : "No Available"}
        </div>
        <div className="card-actions">
          <Link to={`/planet/${planetId}`} className="btn">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlanetCard;
