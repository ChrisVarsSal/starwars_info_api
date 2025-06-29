import { useState, useEffect } from "react";
import { getStarships } from "../../services/swapiService";
import StarshipCard from "../../components/Cards/StarshipCard";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [allStarships, setAllStarships] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchAllStarships = async () => {
      try {
        setLoading(true);
        let allData = [];
        let page = 1;
        let next = true;

        while (next) {
          const data = await getStarships(page);
          allData = [...allData, ...data.results];
          next = data.next !== null;
          page += 1;
        }
        setAllStarships(allData);
        setStarships(allData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStarships();
  }, []);

  useEffect(() => {
    if(query === "") {
      setStarships(allStarships);
      setCurrentPage(1);
    }
  }, [query,allStarships])
  

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentStarships = starships.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(starships.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredStarships = allStarships.filter((starship) =>
      starship.name.toLowerCase().includes(query.toLowerCase())
    );
    setStarships(filteredStarships);
    setCurrentPage(1);
  };

  if (loading) return <div className="loading">Loading Starships...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <h1>Star Wars Starships</h1>

      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search starship"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      <div className="card-grid">
        {currentStarships.map((starship) => (
          <StarshipCard key={starship.url} starship={starship} />
        ))}
      </div>

      {starships.length === 0 ? (
        <p className="no-results">No starship found.</p>
      ) : (
        <div className="card-grid">
          {currentStarships.map((starship) => (
            <StarshipCard key={starship.url} starship={starship} />
          ))}
        </div>
      )}

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

export default StarshipList;
