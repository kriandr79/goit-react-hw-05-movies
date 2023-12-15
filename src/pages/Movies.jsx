import Searchbar from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import getMovies from 'services/api';

const Movies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState('');
  const movieName = searchParams.get('query') ?? '';
  const fetchPath = `/search/movie?query=${movieName}`;

  useEffect(() => {
    if (movieName === '') return;

    const fetchMovies = async () => {
      try {
        const {
          data: { results },
        } = await getMovies(fetchPath);
        setMovies(results);
        console.log(results);
      } catch (error) {
        setError(error);
      } finally {
        // можно використати для лоадера
      }
    };

    fetchMovies();

    console.log('UseEffect');
  }, [fetchPath, movieName]);

  // Submit форми пошуку + запит у строку url
  const handleFormSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <div>{error}</div>}
      {movieName !== '' && <h1>Results of search: {movieName}</h1>}
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
