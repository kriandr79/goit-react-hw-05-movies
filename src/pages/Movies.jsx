import Searchbar from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  // const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setsevies] = useState([]);
  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {

    if (movieName === '') return;

    console.log('UseEffect')
  },[movieName])


  // Submit форми пошуку + запит у строку url
  const handleFormSubmit = query => {
    setSearchParams({ query });
  };


  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {movieName !== '' && (<h1>Results of search: {movieName}</h1>)}
    </>
  );
};

export default Movies;
