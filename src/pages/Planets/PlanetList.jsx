import { useState, useEffect } from "react";
import { getPlanets } from "../../services/swapiService";
import PlanetCard from "../../components/PlanetCard";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const data = await getPlanets(currentPage);
        setPlanets(data.results);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, [currentPage]);

  const handleNextPage = () => {
    if (pageInfo.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviosPage = () => {
    if (pageInfo.previous) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (loading) {
    return <div className="loading">Loadign Planets</div>;
  }
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <div className="card-grid">
        {planets.map((planet) => (
          <PlanetCard key={planet.url} planet={planet} />
        ))}
      </div>
      <div className="page-controls">
        <button
          className="btn"
          onClick={handlePreviosPage}
          disabled={!pageInfo.previous}
          style={{ opacity: pageInfo.previous ? 1 : 0.5 }}
        >
          Previous
        </button>
        <button>{currentPage}</button>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={!pageInfo.next}
          style={{ opacity: pageInfo.netx ? 1 : 0.5 }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default PlanetList;
