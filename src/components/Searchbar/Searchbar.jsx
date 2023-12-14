import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  // Ввід тексту в інпут
  const handleInput = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };

  // Очищення імпуту
  const reset = () => {
    setQuery('');
  };

  // Сабміт форми
  const handleFormSubmit = e => {
    e.preventDefault();
    const searchQuery = query.toLowerCase().trim();

    if (!searchQuery) return;

    onSubmit(searchQuery);
    reset();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={query}
        autoComplete="off"
        autoFocus
        onChange={handleInput}
        placeholder="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Searchbar;
