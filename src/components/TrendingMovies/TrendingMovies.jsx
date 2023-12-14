import { Link,useLocation } from 'react-router-dom';

const TrendingMovies = ({ movies }) => {
    const location = useLocation();
    
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TrendingMovies;
