import axios from 'axios';

const API_KEY = '8b78515967448492f6a0d3d58a152472'; 

export default async function getMovies(path) {
  return await axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      api_key: API_KEY,
    },
  });
}
