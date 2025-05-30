import React from "react";
import { useLastRoundId, useRoundsHistory } from "../contracts/lotteryContract";
import { formatAmount } from "../utils/index";

const Hero: React.FC = () => {
  const { lastRoundId } = useLastRoundId();
  const { rewardAmount } = useRoundsHistory(BigInt(lastRoundId));
  return (
    <section id="yuzu_lottery">
      <div className="z-10 relative top-[85px] pb-8">
        <div className="grid grid-cols-3 pb-10 items-center gap-7 justify-between">
          <img src={require("../assets/left-coin.png")} alt="yuzu coin" />
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
              ${formatAmount(Number(rewardAmount || 0))}
            </div>
            <div className="mb-4 text-white font-bold text-[20px] leading-8">
              In Prize
            </div>
            <button className="bg-yuzu-green py-6 px-8 font-semibold text-black mb-8 yuzu-button-border">
              <a href="#buy_ticket">Buy Ticket</a>
            </button>
          </div>
          <img src={require("../assets/coin.png")} alt="yuzu coin" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
