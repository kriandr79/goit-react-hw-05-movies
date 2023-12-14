import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMovies from 'services/api';

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
      <ul>
        {reviews.map(({ id, author, content, created_at, url }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
      {error && <div>{error}</div>}
    </>
  );
};

export default Reviews;
