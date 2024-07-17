import React from "react";
import Bookdisplay from "../components/Bookdisplay";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-orange-500">
          Discover Your Next Adventure
        </h1>
        <Bookdisplay />
      </div>
    </div>
  );
}

export default Home;
