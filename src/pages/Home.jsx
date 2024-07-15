import React from "react";
import Bookdisplay from "../components/Bookdisplay";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Hero />
      <div className="home w-full flex justify-center relative bg-slate-50 px-4 sm:px-8 md:px-16 lg:px-20">
        <div className="w-full max-w-7xl">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold py-10 sm:py-16 md:py-20">
            Welcome to Our Book Hive
          </h1>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-16 md:gap-20 lg:gap-24">
              {[...Array(8)].map((_, i) => (
                <Bookdisplay key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
