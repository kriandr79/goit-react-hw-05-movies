import { useState } from 'react';
import css from './Searchbar.module.css'

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
    <header>
      <div className={css.headerContainer}>
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
      </div>
    </header>
  );
};

export default Searchbar;
