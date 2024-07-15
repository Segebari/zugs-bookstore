import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

function Bookdisplay({ index }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (books.length === 0) return <div>No books found.</div>;

  const book = books[index % books.length];

  const handleDetailsClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="w-full h-auto sm:h-[21rem] bg-white flex items-center p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row w-full sm:left-[-5rem] relative">
        <div className="w-full sm:w-[40%] h-64 sm:h-auto mb-4 sm:mb-0 relative">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
        <div className="w-full sm:w-[60%] p-4">
          <h3 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-5">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-2">
            By {book.author}
          </p>
          <StarRating />
          <p className="text-sm sm:text-base text-gray-500 mb-3 line-clamp-3 sm:line-clamp-none">
            {book.bookDescription}
          </p>
          <button
            className="w-full border py-2 mt-3 rounded-xl border-primary font-bold text-primary hover:bg-primary hover:text-white"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookdisplay;
