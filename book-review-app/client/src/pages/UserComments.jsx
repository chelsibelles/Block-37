import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments made by the logged-in user
    fetch('/api/comments/me') // Adjust endpoint as needed
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

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
      <h2>My Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>Posted on: {new Date(comment.createdAt).toLocaleDateString()}</p>
              <Link to={`/comment/edit/${comment.id}`}>Edit</Link>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not posted any comments yet.</p>
      )}
    </div>
  );
}

export default UserComments;
