import {useEffect, useState} from 'react'
import { useParams, Link, Outlet } from 'react-router-dom';
import getMovies from 'services/api';



const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const { movieId } = useParams();
  const fetchPath = `/movie/${movieId}`;
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const {
          data
        } = await getMovies(fetchPath);
        console.log(data)
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        // можно використати для лоадера
      }
    };

    fetchMovies();
  }, [fetchPath]);

  const { title } = movie;

  return (
    <>
      <h1>{title}</h1>
      <span>Additional information:</span>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Review</Link>
        </li>
      </ul>
      <Outlet />
      {error && <div>{error}</div>}
    </>
  );

};

export default MovieDetails;
