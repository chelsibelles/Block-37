import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CommentList() {
  const { reviewId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the specific review
    fetch(`/api/reviews/${reviewId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [reviewId]);

  const handleDelete = (commentId) => {
    // Delete comment from API
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted comment from the state
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            {/* Edit and Delete buttons */}
            <Link to={`/comment/edit/${comment.id}`}>Edit</Link>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
