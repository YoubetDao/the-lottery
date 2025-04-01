import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="bg-yuzu-cream rounded-lg mx-auto my-4 max-w-5xl">
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4">
          <button className="font-medium">Play</button>
          <button className="font-medium">How It Works</button>
          <button className="font-medium">Past Draw</button>
        </div>
        <div>
          <button
            className="bg-yuzu-green py-2 px-4 rounded-lg font-bold text-black"
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
