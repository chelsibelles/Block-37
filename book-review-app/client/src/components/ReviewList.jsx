import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ReviewList() {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from API
    fetch(`/api/books/${bookId}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [bookId]);

  const handleDelete = (reviewId) => {
    // Delete review from API
    fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted review from the state
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => console.error('Error deleting review:', error));
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.review}</p>
            <p>Rating: {review.rating}</p>
            {/* Edit and Delete buttons */}
            <Link to={`/review/edit/${review.id}`}>Edit</Link>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
