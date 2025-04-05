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
          {/* shows if not connect wallet */}
          {/* <button
            className="bg-yuzu-green py-2 px-4 font-bold text-black yuzu-border"
            onClick={() => console.log("Connect wallet clicked")}
          >
            Connect Wallet
          </button> */}
          {/* shows if connect wallet */}
          <span className="font-bold text-red-400">ox11BA...e185</span>
          <svg
            className="icon w-4 h-4 inline-block ml-2 fill-gray-300"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M534.4 553.6L262.4 284.8l-89.6 89.6 272 272 89.6 89.6 89.6-89.6 272-272-89.6-89.6z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
