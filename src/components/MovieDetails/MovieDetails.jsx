import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import getMovies from 'services/api';
import css from './MovieDetails.module.css';
import Loader from 'components/Loader/Loader';

const MovieDetails = () => {
  const { state } = useLocation();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const fetchPath = `/movie/${movieId}`; // параметр запиту
  const backLinkHref = useRef(state?.from ?? '/movies');

  useEffect(() => {
     setIsLoading(true);
    const fetchMovies = async () => {
      try {
        const { data } = await getMovies(fetchPath);
        console.log(data);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
         setIsLoading(false);
      }
    };

    fetchMovies();
  }, [fetchPath]);

  const {
    title,
    popularity,
    overview,
    poster_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
  } = movie;

  const fullPosterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const noPosterPath =
    'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg';
  const production_year = new Date(release_date).getFullYear();

  return (
    <>
      {isLoading && <Loader></Loader>}
      {error && <div>{error}</div>}
      <Link to={backLinkHref.current} className={css.backlink}>
        &#10229; go back
      </Link>
      <div className={css.moviecontainer}>
        <div>
          <img
            src={poster_path ? fullPosterPath : noPosterPath}
            width="200"
            alt={title}
          />
        </div>
        <div>
          <h1>
            {title} ({production_year})
          </h1>
          <div className={css.runtime}>{runtime} min.</div>
          <div className={css.genreswrapper}>
            <span>
              <b>Genres:</b>
            </span>
            {genres &&
              genres.map(({ name }, index, array) => (
                <span key={name}>
                  {name}
                  {index < array.length - 1 && ', '}
                </span>
              ))}
          </div>
          <div>
            <div>
              <b>Rating:</b> {vote_average} / {vote_count} vote(s)
            </div>
            <div className={css.popularitywrapper}>
              <b>Popularity:</b> {popularity}
            </div>
          </div>
          <div>
            <b>Overview: </b>
            {overview}
          </div>
        </div>
      </div>
      <div>Additional information:</div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Review</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
