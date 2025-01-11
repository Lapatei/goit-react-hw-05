import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <img src={imageUrl} alt={movie.title} />
      <p>{movie.overview}</p>

      <nav>
        <NavLink to="cast" state={{ from: location.pathname }}>Cast</NavLink>
        <NavLink to="reviews" state={{ from: location.pathname }}>Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
