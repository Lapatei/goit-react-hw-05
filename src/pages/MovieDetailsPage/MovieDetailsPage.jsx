import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
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

    const fetchMovieCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
        },
      };

      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
        setError(error);
      }
    };

    const fetchMovieReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
        },
      };

      try {
        const response = await axios.get(url, options);
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
        setError(error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
    fetchMovieReviews();
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
      <MovieCast cast={cast} />
      <MovieReviews reviews={reviews} />
    </div>
  );
};

export default MovieDetailsPage;
