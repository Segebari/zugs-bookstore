import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, limit } from "firebase/firestore";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

function Bookdisplay() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"), limit(8));
        const bookList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(bookList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return (
      <div className="text-center text-2xl font-semibold py-20">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-2xl text-red-500 font-semibold py-20">
        {error}
      </div>
    );
  if (books.length === 0)
    return (
      <div className="text-center text-2xl font-semibold py-20">
        No books found.
      </div>
    );

  const handleDetailsClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <div className="md:w-3/5 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">By {book.author}</p>
                <StarRating className="mb-4" />
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {book.bookDescription}
                </p>
              </div>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300"
                onClick={() => handleDetailsClick(book.id)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookdisplay;
