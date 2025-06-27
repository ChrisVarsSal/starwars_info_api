import { useState, useEffect } from "react";
import { getStarships } from "../../services/swapiService";
import StarshipCard from "../../components/StarshipCard";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchAllStarships = async () => {
      try {
        setLoading(true);
        let allStarships = [];
        let page = 1;
        let next = true;

        while (next) {
          const data = await getStarships(page);
          allStarships = [...allStarships, ...data.results];
          next = data.next !== null;
          page += 1;
        }

        setStarships(allStarships);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStarships();
  }, []);

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentStarships = starships.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(starships.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <div className="loading">Loading Starships...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <h1>Star Wars Starships</h1>

      <div className="card-grid">
        {currentStarships.map((starship) => (
          <StarshipCard key={starship.url} starship={starship} />
        ))}
      </div>

      <div className="page-controls">
        <button
          className="btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default StarshipList;
