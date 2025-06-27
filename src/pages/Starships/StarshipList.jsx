import { useState, useEffect } from "react";
import { getStarships } from "../../services/swapiService";
import StarshipCard from "../../components/StarshipCard";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  useEffect(() => {
    const fetchStarships = async () => {
      try {
        setLoading(true);
        const data = await getStarships(currentPage);
        setStarships(data.results);
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
    fetchStarships();
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
    return <div className="loading">Loadign Starships</div>;
  }
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  return (
    <div>
      <h1>Star Wars Starships</h1>
      <div className="card-grid">
        {starships.map((starship) => (
          <StarshipCard key={starship.url} starship={starship} />
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

export default StarshipList;
