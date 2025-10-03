// Carousel.jsx
import React, { useState, useEffect } from 'react';

const items = [
  {
    text: 'Explore the mountains',
    image: 'images/tshirt1.jpg',
  },
  {
    text: 'Relax by the beach',
    image: 'images/tshirt3.webp',
  },
  {
    text: 'Wander through forests',
    image: 'images/tshirt1.jpg',
  },
  {
    text: 'Discover city life',
    image: 'images/tshirt4.jpg',
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full h-full flex">
        {/* Left Text Section */}
        <div className="w-1/2 h-full flex items-center justify-center p-8 text-3xl font-semibold text-gray-800">
          {items[index].text}
        </div>

        {/* Right Image Section */}
        <div className="w-1/2 h-full">
          <img
            src={items[index].image}
            alt="carousel"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;