import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  const imageUrlBase = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={styles.container}>
      <h2>Cast</h2>
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
  cast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieCast;
