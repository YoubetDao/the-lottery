import React from "react";

interface HeroProps {
  prizeAmount?: string;
}

const Hero: React.FC<HeroProps> = ({ prizeAmount = "$765,772" }) => {
  return (
    <div className="z-10 relative top-24">
      <div className="grid grid-cols-3 py-10 items-center gap-3 justify-between">
        <img src={require("../assets/coin.png")} alt="yuzu coin" />
        <div className="flex flex-col items-center">
          <img
            src={require("../assets/buy-ticket.png")}
            alt="YUZU Lottery Mascot"
            className="w-32 h-40 mb-4"
          />
          <div className="text-lg font-bold text-white">
            <span className="text-orange-400">YUZU</span> Lottery
          </div>
          <div className="text-7xl font-bold text-yuzu-green my-2 mb-4">
            {prizeAmount}
          </div>
          <div className="mb-4 text-white font-bold">In Prize</div>
          <button
            className="bg-yuzu-green py-2 px-6 !rounded-lg font-bold text-black mb-8 yuzu-border"
            onClick={() => console.log("Buy ticket clicked")}
          >
            Buy Ticket
          </button>
        </div>
        <img src={require("../assets/coin.png")} alt="yuzu coin" />
      </div>
    </div>
  );
};

export default Hero;
