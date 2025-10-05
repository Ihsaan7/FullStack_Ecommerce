// Carousel.jsx
import React, { useState, useEffect } from 'react';

const items = [
  {
    title: 'Premium Collection',
    subtitle: 'Discover our exclusive luxury fashion line',
    description: 'Crafted with the finest materials and attention to detail',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-blue-600 to-slate-800',
    cta: 'Explore Collection'
  },
  {
    title: 'Modern Elegance',
    subtitle: 'Where sophistication meets contemporary style',
    description: 'Timeless pieces designed for the modern luxury lifestyle',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-slate-700 to-blue-900',
    cta: 'Shop Now'
  },
  {
    title: 'Exclusive Design',
    subtitle: 'Limited edition pieces for discerning tastes',
    description: 'Unique designs that set you apart from the crowd',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-gray-800 to-blue-700',
    cta: 'View Collection'
  },
  {
    title: 'Luxury Redefined',
    subtitle: 'Experience the pinnacle of fashion excellence',
    description: 'Premium quality meets innovative design',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-blue-800 to-slate-900',
    cta: 'Discover More'
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/20 dark:to-gray-900/30">
      
      {/* Background Image with Glass Overlay */}
      <div className="absolute inset-0">
        <img
          src={items[index].image}
          alt="luxury fashion"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Glass Content Panel */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-2xl">
            
            {/* Glass Panel */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-gray-800/30 shadow-2xl p-8">
              
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-800 text-white text-sm font-medium mb-6 shadow-lg">
                ✨ {items[index].title}
              </div>
              
              {/* Main Content */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {items[index].subtitle}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed">
                {items[index].description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  {items[index].cta}
                </button>
                <button className="px-6 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 flex items-center justify-center text-white hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 flex items-center justify-center text-white hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 transition-all duration-300 ${
              i === index 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Gradient Overlay for Current Item */}
      <div className={`absolute inset-0 bg-gradient-to-r ${items[index].gradient} opacity-5 pointer-events-none`}></div>
    </div>
  );
};

export default Carousel;