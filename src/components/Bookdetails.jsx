import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import StarRating from "./StarRating";

function Bookdetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Book not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again later.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!book)
    return (
      <div className="flex justify-center items-center h-screen">
        Book not found.
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-primary text-white pt-20 sm:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-4 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/3">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-auto object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x450";
                }}
              />
            </div>
            <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {book.title}
              </h1>
              <p className="text-lg sm:text-xl italic">By {book.author}</p>
              <div className="flex items-center space-x-2">
                <StarRating />
                <span className="text-sm">(4.5 out of 5)</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                    Synopsis
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed">
                    {book.synopsis}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="bg-white/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
                    <span className="font-semibold">Language:</span>{" "}
                    {book.language}
                  </div>
                  <div className="bg-white/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
                    <span className="font-semibold">Published:</span>{" "}
                    {book.publisheddate}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  Description
                </h2>
                <p className="text-base sm:text-lg leading-relaxed">
                  {book.bookDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookdetails;
