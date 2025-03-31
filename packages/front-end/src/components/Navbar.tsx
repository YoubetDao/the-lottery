import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="bg-yuzu-cream yuzu-border mx-auto mb-4 max-w-5xl">
      <div className="flex justify-between items-center p-4 px-8">
        <div className="flex gap-4">
          <button className="font-bold">Play</button>
          <button className="font-bold text-stone-400">How It Works</button>
          <button className="font-bold text-stone-400">Past Draw</button>
        </div>
        <div>
          <button
            className="bg-yuzu-green py-2 px-4 font-bold text-black yuzu-border"
            onClick={() => console.log("Connect wallet clicked")}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
