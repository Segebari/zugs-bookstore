import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, limit } from "firebase/firestore";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Bookdisplay() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"), limit(4));
        const bookList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks([...bookList, ...bookList]);
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
      <div className="text-center text-xl font-semibold py-10 text-orange-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl text-orange-500 font-semibold py-10">
        {error}
      </div>
    );
  if (books.length === 0)
    return (
      <div className="text-center text-xl font-semibold py-10 text-orange-500">
        No books found.
      </div>
    );

  const handleDetailsClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {books.map((book, index) => (
        <motion.div
          key={`${book.id}-${index}`}
          className="relative overflow-hidden group bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-orange-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xs lg:text-lg font-bold mb-0.5 truncate">
                {book.title}
              </h3>
              <p className="text-xs lg:text-base mb-1 truncate">By {book.author}</p>
              <StarRating className="mb-1" />
              <button
                className="w-full bg-white text-orange-500 py-1 px-2 rounded-full text-xs font-semibold hover:bg-orange-100 transition-colors duration-300"
                onClick={() => handleDetailsClick(book.id)}
              >
                Explore
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Bookdisplay;
