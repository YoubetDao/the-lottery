import React from "react";

interface HeroProps {
  prizeAmount?: string;
}

const Hero: React.FC<HeroProps> = ({ prizeAmount = "$765,772" }) => {
  return (
    <div className="z-10 relative top-[85px] pb-8">
      <div className="grid grid-cols-3 pb-10 items-center gap-7 justify-between">
        <img src={require("../assets/coin.png")} alt="yuzu coin" />
        <div className="flex flex-col items-center">
          <img
            src={require("../assets/buy-ticket.png")}
            alt="YUZU Lottery Mascot"
            className="w-32 h-40 mb-4"
          />
          <div className="text-[20px] leading-8 font-bold text-white">
            <span className="text-[#ED8C3F]">YUZU</span> Lottery
          </div>
          <div className="text-[80px] leading-[96px] font-bold text-yuzu-green my-4">
            {prizeAmount}
          </div>
          <div className="mb-4 text-white font-bold text-[20px] leading-8">
            In Prize
          </div>
          <button
            className="bg-yuzu-green py-6 px-8 font-semibold text-black mb-8 yuzu-button-border"
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
