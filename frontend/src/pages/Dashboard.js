import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import "./Dashboard.css";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, requestRes] = await Promise.all([
          API.get("/books"),
          API.get("/requests/my"),
        ]);
        setBooks(bookRes.data);
        setMyRequests(requestRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestBook = useCallback(async (bookId) => {
    try {
      await API.post("/requests", { bookId });
      toast.success("Request sent!");
      setMyRequests((prev) => [
        ...prev,
        { book: { _id: bookId }, status: "pending" },
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }, []);

  const getRequestStatus = useCallback(
    (bookId) => {
      const req = myRequests.find(
        (r) => r.book && (r.book._id === bookId || r.book === bookId)
      );
      return req ? req.status : null;
    },
    [myRequests]
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📚 All Books</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => {
            const ownerId =
              typeof book.owner === "object" ? book.owner._id : book.owner;
            const isOwnBook = ownerId === currentUserId;

            return (
              <BookCard
                key={book._id}
                book={book}
                showRequest={!isOwnBook}
                onRequest={requestBook}
                isOwnBook={isOwnBook}
                requestStatus={getRequestStatus(book._id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
