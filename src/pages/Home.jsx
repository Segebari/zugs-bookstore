import React from "react";
import Bookdisplay from "../components/Bookdisplay";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Welcome to Our <span className="text-orange-500">Book Hive</span>
        </h1>
        <Bookdisplay />
      </div>
    </div>
  );
}

export default Home;
