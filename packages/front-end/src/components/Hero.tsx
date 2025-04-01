import React from "react";

interface HeroProps {
  prizeAmount?: string;
}

const Hero: React.FC<HeroProps> = ({ prizeAmount = "$765,772" }) => {
  return (
    <div className="relative text-center py-10">
      <div className="relative z-10">
        <div className="flex flex-col items-center">
          {/* <div className="mb-2">
            <img
              src="/123.jpg"
              alt="YUZU Lottery Mascot"
              className="h-20 w-20"
            />
          </div> */}
          <div className="text-lg font-bold">YUZU Lottery</div>
          <div className="text-6xl font-bold text-yuzu-green my-2">
            {prizeAmount}
          </div>
          <div className="mb-4">In Prize</div>
          <button
            className="bg-yuzu-green py-2 px-6 rounded-lg font-bold text-black mb-8"
            onClick={() => console.log("Buy ticket clicked")}
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
