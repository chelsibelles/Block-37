import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews made by the logged-in user
    fetch('/api/reviews/me') // Adjust endpoint as needed
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

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
      <h2>My Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.bookTitle}</h3>
              <p>{review.review}</p>
              <p>Rating: {review.rating}</p>
              <p>Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
              <Link to={`/review/edit/${review.id}`}>Edit</Link>
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not written any reviews yet.</p>
      )}
    </div>
  );
}

export default UserReviews;
