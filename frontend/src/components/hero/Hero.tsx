import React from "react";
import hero from "./hero.png";
import { Link } from "react-router-dom";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse lg:flex-row mx-auto p-8">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 lg:mt:16 lg:w-1/2 xl:m-20 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:text-left lg:max-w-md">
            Financial data with no news
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Search relevant financial documents without fear mongering and fake
            news.
          </p>
          <div className="mx-auto lg:mx-0">
            <Link
              to="/search"
              className="text-2xl font-bold text-white bg-lightGreen rounded hover:opacity-70 px-10 py-5 lg:py-4"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mx-auto mb-24 lg:mb-0 lg:w-1/2">
          <img src={hero} alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
