import { useState, useEffect } from "react";
import { getCharacters } from "../../services/swapiService";
import CharacterCard from "../../components/CharacterCard";
import axios from "axios";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCharacters, setFilterCharacters] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        let allCharacters = [];
        let page = 1;
        let next = true;
        while (next) {
          const data = await getCharacters(page);
          allCharacters = [...allCharacters, ...data.results];
          next = data.next !== null;
          page += 1;
        }
        const enriched = await Promise.all(
          allCharacters.map(async (char) => {
            if (char.species.length === 0) {
              return { ...char, speciesName: "Human" };
            }
            try {
              const res = await axios.get(char.species[0]);
              return { ...char, speciesName: res.data.name };
            } catch {
              return { ...char, speciesName: "Unknown" };
            }
          })
        );
        setCharacters(enriched);
        setFilterCharacters(enriched);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    const result = characters.filter((char) => {
      if (filter === "all") return true;
      if (filter === "human") return char.speciesName === "Human";
      if (filter === "droid") return char.speciesName === "Droid";
      return char.speciesName !== "Human" && char.speciesName !== "Droid";
    });
    setFilterCharacters(result);
    setCurrentPage(1);
  }, [filter, characters]);

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentCharacters = filterCharacters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filterCharacters.length / resultsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div className="loading">Loading all characters...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <h1>Star Wars Characters</h1>

      <select
        className="select"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="all">All ({characters.length})</option>
        <option value="human">
          Human ({characters.filter((c) => c.speciesName === "Human").length})
        </option>
        <option value="droid">
          Droid ({characters.filter((c) => c.speciesName === "Droid").length})
        </option>
        <option value="alien">
          Alien (
          {
            characters.filter(
              (c) => c.speciesName !== "Human" && c.speciesName !== "Droid"
            ).length
          }
          )
        </option>
      </select>

      <div className="card-grid">
        {currentCharacters.map((character) => (
          <CharacterCard key={character.url} character={character} />
        ))}
      </div>

      <div className="page-controls">
        <button
          className="btn"
          onClick={handlePrevious}
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
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CharacterList;
