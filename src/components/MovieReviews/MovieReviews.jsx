import styles from './MovieReviews.module.css';

const MovieReviews = ({ reviews }) => {
  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p><strong>- {review.author}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
