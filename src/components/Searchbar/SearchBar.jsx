function SearchBar({ query, setQuery, onSearch, placeholder = "Search..." }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={onSearch}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
