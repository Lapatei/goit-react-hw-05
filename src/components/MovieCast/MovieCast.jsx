import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
        },
      };

      try {
        const response = await fetch(url, options);
        const castData = await response.json();
        setCast(castData.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
        setError(error);
      }
    };

    fetchCast();
  }, [movieId]);

  const imageUrlBase = 'https://image.tmdb.org/t/p/w500';

  if (error) {
    return <div>Error fetching movie cast: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.item}>
            <img 
              src={`${imageUrlBase}${actor.profile_path}`} 
              alt={actor.name} 
              className={styles.image} 
            />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.object),
};

export default MovieCast;
