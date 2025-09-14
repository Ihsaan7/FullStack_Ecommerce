import React from "react";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/home/Hero";
import Products from "./components/home/Products";

function App() {
  return (
    <div className="flex flex-col">
        <Header />
        <Hero />
        <Products />
        <Footer />
    </div>
    
)}

export default App;
