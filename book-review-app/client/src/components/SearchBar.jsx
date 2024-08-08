import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Fetch search results from API
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error searching:', error));
  };

  const handleResultClick = (itemId) => {
    // Navigate to the item detail page or another relevant page
    navigate(`/items/${itemId}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for items..."
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <ul>
          {results.map(item => (
            <li key={item.id}>
              <span onClick={() => handleResultClick(item.id)}>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
