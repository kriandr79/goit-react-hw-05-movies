import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMovies from 'services/api';
import css from './Reviews.module.css'

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  const fetchPath = `/movie/${movieId}/reviews`; // параметр запиту

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const {
          data: { results },
        } = await getMovies(fetchPath);
        setReviews(results);
      } catch (error) {
        setError(error);
      } finally {
        // можно використати для лоадера
      }
    };

    fetchMovies();
  }, [fetchPath]);

  console.log(reviews);

  return (
    <>
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
      {error && <div>{error}</div>}
    </>
  );
};

export default Reviews;
