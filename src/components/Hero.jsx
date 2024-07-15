import React from "react";
import SearchIcon from "../assets/search-icon.svg";

const Hero = () => {

  return (
    <>
      <div className="w-full flex bg-primary pb-32 justify-center">
        <div className="text-center flex flex-col items-center">
          <h1 className="font-bold pt-40  text-6xl text-white">
            KNOW YOUR BOOK
          </h1>

          <p className=" pt-3 text-white italic">
            find your favorite book
          </p>

          <div className="flex relative items-center pt-5">
            <input
              type="search"
              className="w-96 h-10 bg-gray-100 placeholder:pl-10 text-xs"
              placeholder="Search Book"
            />
            <img
              src={SearchIcon}
              alt="searchicon"
              className="absolute pl-2 h-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
