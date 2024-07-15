import React from "react";
import Bookdisplay from "../components/Bookdisplay";
import Hero from "../components/Hero";


function Home() {
  return (
    <>
      <Hero></Hero>
      <div className="home  w-full flex justify-center relative bg-slate-50 px-20">
        <div>
          <h1 className="text-center text-5xl font-bold py-20">Welcome to Our Book Hive</h1>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
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
