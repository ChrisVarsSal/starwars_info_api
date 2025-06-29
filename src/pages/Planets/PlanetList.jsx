import { useState, useEffect } from "react";
import { getPlanets } from "../../services/swapiService";
import PlanetCard from "../../components/Cards/PlanetCard";
import SearchBar from "../../components/Searchbar/SearchBar";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        setLoading(true);
        let allData = [];
        let page = 1;
        let next = true;

        while (next) {
          const data = await getPlanets(page);
          allData = [...allData, ...data.results];
          next = data.next !== null;
          page += 1;
        }

        setAllPlanets(allData);
        setPlanets(allData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlanets();
  }, []);

  useEffect(() => {
    if (query === "") {
      setPlanets(allPlanets);
      setCurrentPage(1);
    }
  }, [query, allPlanets]);

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentPlanets = planets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(planets.length / resultsPerPage);

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
    const filteredPlanets = allPlanets.filter((planet) =>
      planet.name.toLowerCase().includes(query.toLowerCase())
    );
    setPlanets(filteredPlanets);
    setCurrentPage(1);
  };

  if (loading) return <div className="loading">Loading Planets...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <h1>Star Wars Planets</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSubmit}
        placeholder="Search Planets"
      />

      <div className="card-grid">
        {currentPlanets.map((planet) => (
          <PlanetCard key={planet.url} planet={planet} />
        ))}
      </div>

      {planets.length === 0 ? (
        <p className="no-results">No planets found.</p>
      ) : (
        <div className="card-grid">
          {currentPlanets.map((planet) => (
            <PlanetCard key={planet.url} planet={planet} />
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

export default PlanetList;
