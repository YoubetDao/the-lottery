import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TicketInfo from "./components/TicketInfo";
import DrawHistory from "./components/DrawHistory";
import HowToPlay from "./components/HowToPlay";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-yuzu-dark-green pt-4">
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 md:px-8">
          <Hero />
          <TicketInfo />
          <DrawHistory />
          <HowToPlay />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
