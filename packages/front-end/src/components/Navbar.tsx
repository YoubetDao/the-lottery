import React from "react";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  return (
    <nav className="bg-yuzu-cream yuzu-border mx-auto mb-4 max-w-5xl">
      <div className="flex justify-between items-center p-4 px-8">
        <div className="flex gap-4">
          <button className="font-bold">Play</button>
          <button className="font-bold text-stone-400">How It Works</button>
          <button className="font-bold text-stone-400">Past Draw</button>
        </div>
        <div>
          {isConnected ? (
            <div className="cursor-pointer" onClick={openAccountModal}>
              <span className="font-bold text-red-400">
                {address ? `${address.slice(0, 5)}...${address.slice(-4)}` : ""}
              </span>
              <svg
                className="icon w-4 h-4 inline-block ml-2 fill-gray-300"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M534.4 553.6L262.4 284.8l-89.6 89.6 272 272 89.6 89.6 89.6-89.6 272-272-89.6-89.6z"></path>
              </svg>
            </div>
          ) : (
            <button
              className="bg-yuzu-green py-2 px-4 font-bold text-black yuzu-border cursor-pointer"
              onClick={openConnectModal}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
