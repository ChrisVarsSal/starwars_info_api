import { useState, useEffect } from "react";
import { getCharacters } from "../services/swapiService";
import CharacterCard from "../components/CharacterCard";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  useEffect(() => {
    const fecthCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters(currentPage);
        setCharacters(data.results);
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
    fecthCharacters();
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
    return <div className="loading">Loadign Characters</div>;
  }
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <div className="card-grid">
        {characters.map((character) => (
          <CharacterCard
            key={character.url}
            character={character}
          />
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

export default CharacterList;
