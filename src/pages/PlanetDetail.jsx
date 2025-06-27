import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPlanet } from "../services/swapiService";

function PlanetDetail() {
  const { id } = useParams();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        setLoading(true);
        const data = await getPlanet(id);
        setPlanets(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanetDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading Planet...</div>;
  if (error) return <div className="error-message">Error:{error}</div>;
  return (
    <div className="character-detail">
      <h1>{planets.name}</h1>
      <div className="detail-section">
        <h2>Planet Information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Rotation Period: </strong>{" "}
            {planets.rotation_period !== "unknown"? `${planets.rotation_period}`: "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Orbital Period: </strong>{" "}
            {planets.orbital_period !== "unknown"
              ? `${planets.orbital_period}`
              : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Diameter: </strong>
            {planets.diameter !== "unknown" ? planets.diameter : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Climate: </strong>
            {planets.climate !== "unknown" ? planets.climate : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Gravity: </strong>
            {planets.gravity !== "n/a" ? planets.gravity : "No Available"}
          </div>
          <div className="detail-item">
            <strong>Terrain: </strong>{" "}
            {planets.terrain !== "unknown" ? planets.terrain : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Population: </strong>{" "}
            {planets.population !== "unknown" ? planets.population : "Unknown"}
          </div>
        </div>
        <div className="back-btn">
          <Link to="/planets" className="btn">
            Back to the list
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlanetDetail;
