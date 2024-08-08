import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details from API
    fetch(`/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  return (
    <div>
      {book ? (
        <>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <ReviewForm bookId={book.id} />
          <ReviewList bookId={book.id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetail;
