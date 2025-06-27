import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getStarship } from "../services/swapiService";

function StarshipDetail() {
  const { id } = useParams();
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        setLoading(true);
        const data = await getStarship(id);
        setStarships(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanetDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading Starships...</div>;
  if (error) return <div className="error-message">Error:{error}</div>;
  return (
    <div className="character-detail">
      <h1>{starships.name}</h1>
      <div className="detail-section">
        <h2>Starship Information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Model: </strong>{" "}
            {starships.model !== "unknown"
              ? `${starships.model}`
              : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Manufacturer: </strong>{" "}
            {starships.manufacturer !== "unknown"
              ? `${starships.manufacturer}`
              : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Cost in Credits: </strong>
            {starships.cost_in_credits !== "unknown" ? starships.cost_in_credits : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Length: </strong>
            {starships.length !== "unknown" ? starships.length : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Max Atmosphering Speed: </strong>
            {starships.max_atmosphering_speed !== "n/a" ? starships.max_atmosphering_speed : "No Available"}
          </div>
          <div className="detail-item">
            <strong>Crew: </strong>{" "}
            {starships.crew !== "unknown" ? starships.crew : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Cargo Capacity: </strong>{" "}
            {starships.cargo_capacity !== "unknown" ? starships.cargo_capacity : "Unknown"}
          </div>
           <div className="detail-item">
            <strong>Hyperdrive Rating: </strong>{" "}
            {starships.hyperdrive_rating !== "unknown" ? starships.hyperdrive_rating : "Unknown"}
          </div>
           <div className="detail-item">
            <strong>Passengers: </strong>{" "}
            {starships.passengers !== "unknown" ? starships.passengers : "Unknown"}
          </div>
           <div className="detail-item">
            <strong>Consumables: </strong>{" "}
            {starships.consumables !== "unknown" ? starships.consumables : "Unknown"}
          </div>
            <div className="detail-item">
            <strong>Starship Class: </strong>{" "}
            {starships.starship_class !== "unknown" ? starships.starship_class : "Unknown"}
          </div>
        </div>
        <div className="back-btn">
          <Link to="/starships " className="btn">
            Back to the list
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StarshipDetail;
