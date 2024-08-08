import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CommentForm() {
  const { reviewId } = useParams();
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit comment to API
    fetch(`/api/reviews/${reviewId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful comment submission
      })
      .catch(error => console.error('Error submitting comment:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;
