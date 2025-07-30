import React, { useEffect, useState } from 'react';
import API from '../api';
import './MyBooks.css';
import BookCard from '../components/BookCard';
import { toast } from 'react-toastify';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', condition: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    API.get('/books/my')
      .then(res => setBooks(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load your books");
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addBook = async () => {
    if (!form.title || !form.author || !form.condition) {
      toast.warn("Please fill out all fields");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("condition", form.condition);
      formData.append("image", image);  
      const res = await API.post('/books', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setBooks(prev => [...prev, res.data]);
      setForm({ title: '', author: '', condition: '' });
      setImage(null);
      setPreview(null);
      toast.success("Book added successfully!");
    } catch (err) {
      console.error("🔴 Book add error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error adding book");
    }
  };
  

  const deleteBook = async (bookId) => {
    try {
      await API.delete(`/books/${bookId}`);
      setBooks(prev => prev.filter(book => book._id !== bookId));
      toast.info("Book deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="my-books-container">
      <h2 className="my-books-title">📘 My Books</h2>

      <div className="my-books-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
        />
        <input
          placeholder="Condition"
          value={form.condition}
          onChange={e => setForm({ ...form, condition: e.target.value })}
        />

        <input type="file" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="book-list">
        {books.length === 0 ? (
          <p className="no-books">No books added yet.</p>
        ) : (
          books.map(book => (
            <BookCard
              key={book._id}
              book={book}
              showDelete={true}
              onDelete={deleteBook}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyBooks;
