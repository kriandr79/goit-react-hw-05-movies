import { useEffect, useState } from 'react';
import getMovies from 'services/api';
import TrendingMovies from 'components/TrendingMovies/TrendingMovies';



const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [error, setError] = useState('');
  const fetchPath = '/trending/movie/day';
  
  useEffect(() => {
    
      const fetchMovies = async () => {
      try {
        const {
          data: { results },
        } = await getMovies(fetchPath);
        setTrendMovies(results);
      } catch (error) {
        setError(error);
      } finally {
          // можно використати для лоадера
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1>Trending movies</h1>
      {error && <div>{error}</div>}
      {trendMovies.length > 0 && (
        <TrendingMovies movies={trendMovies}></TrendingMovies>
      )}
    </>
  );
};

export default Home;