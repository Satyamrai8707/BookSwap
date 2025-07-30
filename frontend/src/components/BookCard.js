import React from "react";
import "./BookCard.css";

function BookCard({
  book,
  showRequest = false,
  showDelete = false,
  isOwnBook = false,
  onRequest,
  onDelete,
  requestStatus,
}) {
  const handleRequest = () => onRequest && onRequest(book._id);
  const handleDelete = () => onDelete && onDelete(book._id);

  return (
    <div className={`book-card ${isOwnBook ? "own-book" : ""}`}>
      {book.image && (
        <img
          src={`http://localhost:8800${book.image}`}
          alt={book.title}
          className="book-image"
        />
      )}

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p><strong>Author:</strong> {book.author || "N/A"}</p>
        <p><strong>Condition:</strong> {book.condition || "N/A"}</p>

        {requestStatus && (
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge ${requestStatus}`}>
              {requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1)}
            </span>
          </p>
        )}

        <div className="book-actions">
          {showRequest && !requestStatus && (
            <button className="request-btn" onClick={handleRequest}>
              📩 Request
            </button>
          )}

          {showDelete && (
            <button className="delete-btn" onClick={handleDelete}>
              🗑 Delete
            </button>
          )}

          {isOwnBook && (
            <button className="admin-btn" onClick={() => alert("View Requests")}>
              📬 View Requests
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
