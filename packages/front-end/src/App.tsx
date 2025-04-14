import React, { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TicketInfo from "./components/TicketInfo";
import DrawHistory from "./components/DrawHistory";
import HowToPlay from "./components/HowToPlay";
import Footer from "./components/Footer";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { eduChain, eduTestnet, projectId } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

export const config = getDefaultConfig({
  appName: "Yuzu Lottery",
  projectId,
  chains: [eduTestnet],
});

const App: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient({}), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
