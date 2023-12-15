import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMovies from 'services/api';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  const fetchPath = `/movie/${movieId}/credits`; // параметр запиту

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const {
          data: { cast },
        } = await getMovies(fetchPath);
        setCast(cast);
        console.log(cast);
      } catch (error) {
        setError(error);
      } finally {
        // можно використати для лоадера
      }
    };

    fetchMovies();
  }, [fetchPath]);

  const noPosterPath =
    'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg';

  return (
    <>
      {cast.length > 0 ? (
        <div>
          <h2>Cast:</h2>
          <ul>
            {cast.map(({ id, character, name, profile_path }) => (
              <li key={id} className={css.castitem}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                      : noPosterPath
                  }
                  width="100"
                  alt={name}
                />
                <div>
                  {name}
                  {character && (
                    <span className={css.character}> ... as {character}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>There is no info about the cast for this movie...</div>
      )}
      {error && <div>{error}</div>}
    </>
  );
};

export default Cast;
