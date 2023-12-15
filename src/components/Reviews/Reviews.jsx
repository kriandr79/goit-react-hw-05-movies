import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMovies from 'services/api';
import Loader from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const fetchPath = `/movie/${movieId}/reviews`; // параметр запиту

  useEffect(() => {
    setIsLoading(true);

    const fetchMovies = async () => {
      try {
        const {
          data: { results },
        } = await getMovies(fetchPath);
        setReviews(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [fetchPath]);

  return (
    <>
      {isLoading && <Loader></Loader>}
      {error && <div>{error}</div>}
      {reviews.length > 0 ? (
        <div>
          <h2>Reviews:</h2>
          <ul>
            {reviews.map(({ id, author, content, created_at, url }) => (
              <li key={id} className={css.reviewitem}>
                <div className={css.author}>{author}</div>
                <div className={css.content}>{content}</div>
                <div className={css.source}>
                  Source:{' '}
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>There are no reviews for this movie...</div>
      )}
    </>
  );
};

export default Reviews;
