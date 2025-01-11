import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM0NjIyYzhkMjRiNTI1ZGY1YTA3ODA5NDEyYjU0YiIsIm5iZiI6MTczNjUyNTI5MS45NDMsInN1YiI6IjY3ODE0NWViYWJhYmJiYTA0MGJhZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9gwhhd0YIrqF09b8fOqUsYAZtKu2wByiltcNezQxmVE',
        },
      };

      try {
        const response = await fetch(url, options);
        const reviewsData = await response.json();
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching reviews: {error.message}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className={styles.container}>
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
