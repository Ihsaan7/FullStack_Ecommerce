import { useState, useEffect } from 'react';

const images = [
  '../images/iamge3.webp',
  '../images/image2.jpg',
  '../images/image1.jpg',
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval); // Cleanup
  }, [length]);

  return (
    <div className="relative w-full max-w-3xl h-[500px] mx-auto overflow-hidden border-2 rounded-lg shadow-md">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0 object-cover h-full"
          />
        ))}
      </div>
    </div>
  );
}