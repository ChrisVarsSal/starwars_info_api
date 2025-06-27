import { useState, useEffect } from "react";
import { getPlanets } from "../../services/swapiService";
import PlanetCard from "../../components/PlanetCard";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        setLoading(true);
        let allPlanets = [];
        let page = 1;
        let next = true;

        while (next) {
          const data = await getPlanets(page);
          allPlanets = [...allPlanets, ...data.results];
          next = data.next !== null;
          page += 1;
        }

        setPlanets(allPlanets);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlanets();
  }, []);

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentPlanets = planets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(planets.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll al top
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll al top
    }
  };

  if (loading) return <div className="loading">Loading Planets...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <h1>Star Wars Planets</h1>

      <div className="card-grid">
        {currentPlanets.map((planet) => (
          <PlanetCard key={planet.url} planet={planet} />
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
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
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

export default PlanetList;
