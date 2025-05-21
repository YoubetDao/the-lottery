import React, { useMemo } from "react";
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

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

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
          <div className="min-h-screen bg-yuzu-dark-green relative">
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
