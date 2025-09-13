import React from "react";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/home/Hero";
import Container from "./components/Container";
import RecentProducts from "./components/RecentProducts";
import FeaturedProducts from "./components/FeaturedProducts";

function App() {
  return (
    <div className="flex flex-col">
        <Header />
        <Hero />
        <RecentProducts />
        <FeaturedProducts />
        <Footer />
    </div>
    
)}

export default App;
