import React, { useMemo, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TicketInfo from "./components/TicketInfo";
import DrawHistory from "./components/DrawHistory";
import HowToPlay from "./components/HowToPlay";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { eduChain, eduTestnet, projectId } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import Bowser from 'bowser';


export const config = getDefaultConfig({
  appName: "Yuzu Lottery",
  projectId,
  chains: [eduTestnet],
});

const App: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient({}), []);
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState<'mobile' | 'narrow'>('mobile');

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isMobile = browser.getPlatformType() === "mobile";
    const isNarrowScreen = window.innerWidth < 1024;

    if (isMobile) {
      setWarningType('mobile');
      setShowWarning(true);
    } else if (isNarrowScreen) {
      setWarningType('narrow');
      setShowWarning(true);
    }

    // Add resize listener to handle window resizing
    const handleResize = () => {
      if (isMobile) return; // Don't change warning for mobile devices
      if (window.innerWidth >= 1024) {
        setShowWarning(false);
      } else if (window.innerWidth < 1024) {
        setWarningType('narrow');
        setShowWarning(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getWarningContent = () => {
    if (warningType === 'mobile') {
      return {
        title: "Mobile Device Detected",
        message: "For the best experience, we recommend using a desktop browser to access Yuzu Lottery.",
        buttonText: "Continue Anyway"
      };
    } else {
      return {
        title: "Browser Window Too Narrow",
        message: "Please expand your browser window to at least 1024px wide for the best experience.",
        buttonText: "I Understand"
      };
    }
  };

  const warningContent = getWarningContent();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-yuzu-dark-green relative">
            {showWarning && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">{warningContent.title}</h2>
                  <p className="text-gray-600 mb-6">
                    {warningContent.message}
                  </p>
                  <button
                    onClick={() => setShowWarning(false)}
                    className="w-full bg-[#C2F970] hover:bg-[#B5EC63] text-[#102C24] font-bold py-2 px-4 rounded-lg shadow-[0_3px_0_rgba(0,0,0,1)] border-2 border-[#102C24]"
                  >
                    {warningContent.buttonText}
                  </button>
                </div>
              </div>
            )}
            <div className="bg-decorated  pb-[220px] bg-[#15372D]">
              <Navbar />
              <Hero />
            </div>

            {/* 弧线SVG */}
            <div className="w-full h-[40px] relative overflow-hidden bg-[#15372D]">
              <svg
                className="absolute bottom-0 w-full"
                height="40"
                width="100%"
                viewBox="0 0 1200 40"
                preserveAspectRatio="none"
              >
                <path d="M0,0 Q600,80 1200,0 L1200,40 L0,40 Z" fill="#91C363" />
              </svg>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #91C363 0%, #C2C7FB 100%)",
                }}
              />
              <div className="w-[1006px] m-auto z-10 relative">
                <TicketInfo />
                <DrawHistory />
                <HowToPlay />
              </div>
            </div>
            <img
              src={require("./assets/flower-bottom.png")}
              alt=""
              className="absolute bottom-[188px] left-1/2 transform -translate-x-1/2"
            />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
