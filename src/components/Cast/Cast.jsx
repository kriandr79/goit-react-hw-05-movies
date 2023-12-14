import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMovies from 'services/api';

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
        console.log(cast);
        setCast(cast);
      } catch (error) {
        setError(error);
      } finally {
        // можно використати для лоадера
      }
    };

    fetchMovies();
  }, [fetchPath]);

  console.log(cast);

  return (
    <>
      <ul>
        {cast.map(({ id, character, name, profile_path }) => (
          <li key={id}>
            {name} as {character}{' '}
          </li>
        ))}
      </ul>
      {error && <div>{error}</div>}
    </>
  );
};

export default Cast;
