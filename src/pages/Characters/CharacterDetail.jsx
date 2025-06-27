import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCharacter } from "../../services/swapiService";
import { Link } from "react-router-dom";

function CharacterDetail() {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fecthCharacterDetail = async () => {
      try {
        setLoading(true);
        const data = await getCharacter(id);
        setCharacters(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fecthCharacterDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading Character...</div>;
  if (error) return <div className="error-message">Error:{error}</div>;

  return (
    <div className="character-detail">
      <h1>{characters.name}</h1>
      <div className="detail-section">
        <h2>Personal Information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Height: </strong>{" "}
            {characters.height !== "unknown"
              ? `${characters.height} cm`
              : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Weight: </strong>{" "}
            {characters.mass !== "unknown"
              ? `${characters.mass} kg`
              : "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Skin Color: </strong> {characters.skin_color}
          </div>
          <div className="detail-item">
            <strong>Eye Color: </strong> {characters.eye_color}
          </div>
          <div className="detail-item">
            <strong>Gender: </strong>{" "}
            {characters.gender !== "n/a" ? characters.gender : "No Available"}
          </div>
          <div className="detail-item">
            <strong>Birthday: </strong>{" "}
            {characters.birth_year !== "unknown"
              ? characters.birth_year
              : "Unknown"}
          </div>
        </div>
        <div className="back-btn">
            <Link to='/' className="btn">Back to the list</Link>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
