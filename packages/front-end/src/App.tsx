import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TicketInfo from "./components/TicketInfo";
import DrawHistory from "./components/DrawHistory";
import HowToPlay from "./components/HowToPlay";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-yuzu-dark-green pt-4 relative">
      <Navbar />
      <div className="clip-path-custom w-full h-1/2 bg-[#15372D] absolute top-9 z-0" />
      <Hero />
      <div className="max-w-4xl px-4 md:px-8 m-auto z-10 relative">
        <TicketInfo />
        <DrawHistory />
        <HowToPlay />
        <Footer />
      </div>
    </div>
  );
};

export default App;
