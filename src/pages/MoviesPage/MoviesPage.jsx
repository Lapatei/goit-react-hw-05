import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    const options = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
      },
    };

    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setError(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div>Error: {error.message}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
