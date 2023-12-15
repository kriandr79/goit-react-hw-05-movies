import { useEffect, useState } from 'react';
import getMovies from 'services/api';
import TrendingMovies from 'components/TrendingMovies/TrendingMovies';
import Loader from 'components/Loader/Loader';



const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchPath = '/trending/movie/day';
  
  useEffect(() => {
      setIsLoading(true);
      const fetchMovies = async () => {
      try {
        const {
          data: { results },
        } = await getMovies(fetchPath);
        setTrendMovies(results);
      } catch (error) {
        setError(error);
      } finally {
         setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading && <Loader></Loader>}
      <h1>Trending movies</h1>
      {error && <div>{error}</div>}
      {trendMovies.length > 0 && (
        <TrendingMovies movies={trendMovies}></TrendingMovies>
      )}
    </>
  );
};

export default Home;