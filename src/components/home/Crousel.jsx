import React, { useState, useEffect } from "react";

const slides = [
  {
    text: "Discover the Future of Tech",
    image: "/images/tshirt1.jpg",
  },
  {
    text: "Style Meets Innovation",
    image: "/images/tshirt2.jpg",
  },
  {
    text: "Adventure Awaits You",
    image: "/images/tshirt3.webp",
  },
];

export default function Crousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white w-full h-[90vh] flex items-center justify-center shadow-inner">
      <div className=" flex w-full h-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg">
        {/* Left Text */}
        <div className="w-1/2 flex items-center justify-center bg-white p-10">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight transition-all duration-500 ease-in-out">
            {slides[current].text}
          </h1>
        </div>

        {/* Right Image */}

        <div className=" flex items-center mx-0 my-auto w-1/2 h-[70%] mr-20">
          <img
            src={slides[current].image}
            alt="carousel"
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}
