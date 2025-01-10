import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} className={styles.link}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;