import { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Fresh Arrivals Every Week',
    description: 'Discover the latest trends in fashion, tech, and home essentials.',
  },
  {
    title: 'Exclusive Deals for You',
    description: 'Save big on curated collections handpicked for your lifestyle.',
  },
  {
    title: 'Fast Delivery, Trusted Service',
    description: 'Get your orders delivered quickly with our reliable logistics.',
  },
];

export default function TextSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto text-center py-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 transition-opacity duration-500 ease-in-out">
        {slides[current].title}
      </h2>
      <p className="mt-2 text-gray-600 text-base sm:text-lg transition-opacity duration-500 ease-in-out">
        {slides[current].description}
      </p>
    </div>
  );
}