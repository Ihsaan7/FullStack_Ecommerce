import React from "react";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/home/Hero";
import Container from "./components/Container";

function App() {
  return (
    <div className="flex flex-col">
        <Header />
        <Hero />
        <Footer />
    </div>
    
)}

export default App;
