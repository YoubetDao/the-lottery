import { useState } from "react";
import { DrawData } from "../types";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";
import { ReactComponent as ChevronEnd } from "../assets/chevron-end.svg";
import { ReactComponent as ChevronDown } from "../assets/Icon-down.svg";

const initialDrawData = {
  roundNumber: 123,
  isLatest: true,
  drawDate: "22th Sept at 9 AM UTC",
  winningNumbers: [7, 3, 5, 1, 8, 2],
};

export const AllHistory = () => {
  const [currentDraw, setCurrentDraw] = useState<DrawData>(initialDrawData);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handlePreviousDraw = () => {
    console.log("Navigate to previous draw");
  };

  const handleNextDraw = () => {
    console.log("Navigate to next draw");
  };

  const handleClose = () => {
    console.log("Close draw history");
  };
  return (
    <div className="bg-yuzu-cream rounded-[16px] pb-8 text-black border-b-[4px] border-solid border-[#102C24] border-t-2 border-x-2">
      <div className="flex justify-between items-center mb-1 px-8 pt-8">
        <div>
          <span className="font-semibold text-[16px]">
            Round #{currentDraw.roundNumber}
          </span>
          {currentDraw.isLatest && (
            <span className="ml-2 bg-[#D2FF70] text-[#157433] font-semibold text-[16px] px-2 py-1 rounded">
              Latest
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <div
            className="cursor-pointer w-10 h-10"
            onClick={handlePreviousDraw}
          >
            <ChevronLeft width={24} height={24} />
          </div>

          <div className="cursor-pointer w-10 h-10" onClick={handleNextDraw}>
            <ChevronRight width={24} height={24} />
          </div>
          <div className="cursor-pointer w-10 h-10" onClick={handleClose}>
            <ChevronEnd width={24} height={24} />
          </div>
        </div>
      </div>

      <div className="text-[16px] font-medium mb-4 pl-8 text-[#102C24]">
        Drawn {currentDraw.drawDate}
      </div>

      <div className="mb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-[#157433] rounded-full text-[#D2FF70] px-6 py-2 font-bold inline-block">
            Winning Number
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {currentDraw.winningNumbers.map((num, index) => (
            <div
              key={index}
              className="w-[110px] h-[120px] relative flex items-center justify-center"
            >
              <img
                src={require("../assets/coin-number.png")}
                alt=""
                className="absolute inset-0 w-full h-full"
              />
              <span className="relative z-10 text-[32px] font-black text-[#157433] mb-3">
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          className={`text-[#008C50] font-semibold flex items-center mx-auto transition-opacity duration-300 ${
            showDetails ? "opacity-0" : "opacity-100"
          }`}
          onClick={() => setShowDetails(true)}
        >
          Details
          <ChevronDown width={24} height={24} className="ml-1" />
        </button>
      </div>

      <div className={`overflow-hidden ${showDetails ? "block" : "hidden"}`}>
        <div className="mt-4 border-t p-8 bg-[#FFE6D8]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#000] opacity-50 ">Prize Pool</div>
              <div className="text-[#157433] text-[32px] font-bold">
                $557,762
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50 ">Total Reward</div>
              <div className="text-[#157433] font-bold text-[32px]">663</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            <div>
              <div className="text-[#000] opacity-50">Match Part 1</div>
              <div className="text-[#157433] font-bold text-[24px]">$762</div>
              <div className="text-sm text-[#000] opacity-50 ">
                78 Winning Tickets
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50">Match Part 2</div>
              <div className="text-[#157433] font-bold text-[24px]">$1,762</div>
              <div className="text-sm text-[#000] opacity-50 ">
                65 Winning Tickets
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50">Match Part 3</div>
              <div className="text-[#157433] font-bold text-[24px]">$2,071</div>
              <div className="text-sm text-[#000] opacity-50 ">
                65 Winning Tickets
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50">Match Part 4</div>
              <div className="text-[#157433] font-bold text-[24px]">$3,623</div>
              <div className="text-sm text-[#000] opacity-50 ">
                65 Winning Tickets
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50">Match Part 5</div>
              <div className="text-[#157433] font-bold text-[24px]">$4,623</div>
              <div className="text-sm text-[#000] opacity-50 ">
                65 Winning Tickets
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            <div>
              <div className="text-[#000] opacity-50">Match Part 6</div>
              <div className="text-[#157433] font-bold text-[24px]">$8,623</div>
              <div className="text-sm text-[#000] opacity-50">
                65 Winning Tickets
              </div>
            </div>
            <div>
              <div className="text-[#000] opacity-50">Burn</div>
              <div className="text-[#157433] font-bold text-[24px]">
                $18,623
              </div>
              <div className="text-sm text-[#000] opacity-50">
                65 Winning Tickets
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="text-[#008C50] font-semibold flex items-center mx-auto"
            onClick={() => setShowDetails(false)}
          >
            Hide Details
            <ChevronDown width={24} height={24} className="ml-1 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
