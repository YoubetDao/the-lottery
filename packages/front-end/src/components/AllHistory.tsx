import { useEffect, useState } from "react";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";
import { ReactComponent as ChevronEnd } from "../assets/chevron-end.svg";
import { ReactComponent as ChevronDown } from "../assets/Icon-down.svg";

import {
  useLastEndRoundId,
  useLastRoundId,
  useRoundsHistory,
} from "../contracts/lotteryContract";
import { drawnDateDisplay, formatAmount } from "../utils";

export const AllHistory = () => {
  const { lastRoundId } = useLastRoundId();
  const { lastEndRoundId, error, isPending } = useLastEndRoundId();
  const [currentDraw, setCurrentDraw] = useState<number>(lastRoundId);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const {
    isOpen,
    endTime,
    rewardAmount,
    prizeTiers,
    accumulatedParticipants,
    winnerUsers,
    winNumber,
  } = useRoundsHistory(BigInt(currentDraw));

  useEffect(() => {
    if (lastEndRoundId !== undefined) {
      setCurrentDraw(lastEndRoundId);
    }
  }, [lastEndRoundId]);

  const handlePreviousDraw = () => {
    if (lastEndRoundId === -1 || currentDraw - 1 < 0) {
      return;
    } else {
      setCurrentDraw(currentDraw - 1);
    }
  };

  const handleNextDraw = () => {
    if (lastEndRoundId < currentDraw + 1) {
      return;
    } else {
      setCurrentDraw(currentDraw + 1);
    }
  };

  const handleClose = () => {
    setCurrentDraw(lastEndRoundId);
  };

  return (
    <div className="bg-yuzu-cream rounded-[16px] pb-8 text-black border-b-[4px] border-solid border-[#102C24] border-t-2 border-x-2">
      {isPending ? (
        <div className="flex justify-between items-center mb-1 px-8 pt-8">
          Loading...
        </div>
      ) : error ? (
        <div className="flex justify-between items-center mb-1 px-8 pt-8">
          Something went wrong...
        </div>
      ) : lastEndRoundId === -1 ? (
        <div className="flex justify-between items-center mb-1 px-8 pt-8">
          {lastRoundId > lastEndRoundId
            ? "Please wait patiently until draw."
            : "Waiting for a new round."}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-1 px-8 pt-8">
            <div>
              <span className="font-semibold text-[16px]">
                Round #{currentDraw}
              </span>
              {lastEndRoundId === currentDraw && (
                <span className="ml-2 bg-[#D2FF70] text-[#157433] font-semibold text-[16px] px-2 py-1 rounded">
                  Latest
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div
                className={`w-10 h-10 ${
                  lastEndRoundId === -1 || currentDraw - 1 < 0
                    ? "opacity-25 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={handlePreviousDraw}
              >
                <ChevronLeft width={24} height={24} />
              </div>

              <div
                className={`w-10 h-10 ${
                  lastEndRoundId > 0 && currentDraw !== lastEndRoundId
                    ? "cursor-pointer"
                    : "opacity-25 cursor-not-allowed"
                }`}
                onClick={handleNextDraw}
              >
                <ChevronRight width={24} height={24} />
              </div>
              <div
                className={`w-10 h-10 ${
                  lastEndRoundId > 0 && currentDraw !== lastEndRoundId
                    ? "cursor-pointer"
                    : "opacity-25 cursor-not-allowed"
                }`}
                onClick={handleClose}
              >
                <ChevronEnd width={24} height={24} />
              </div>
            </div>
          </div>
          <div className="text-[16px] font-medium mb-4 pl-8 text-[#102C24]">
            Drawn {drawnDateDisplay(endTime)}
          </div>
          <div className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-[#157433] rounded-full text-[#D2FF70] px-6 py-2 font-bold inline-block">
                Winning Number
              </div>
            </div>
            <div className="flex justify-center gap-4">
              {winNumber
                ?.toString()
                .slice(-6)
                .split("")
                .map((num: string, index: number) => (
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
          <div className="text-center mt-8">
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
          <div
            className={`overflow-hidden ${showDetails ? "block" : "hidden"}`}
          >
            <div className="mt-4 border-t p-8 bg-[#FFE6D8]">
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="text-[#000] opacity-50 ">Prize Pot</div>
                  <div className="text-[#157433] text-[32px] font-bold">
                    ${formatAmount(Number(rewardAmount))}
                  </div>
                </div>
                <div>
                  <div className="text-[#000] opacity-50 ">Total Players</div>
                  <div className="text-[#157433] font-bold text-[32px]">
                    {accumulatedParticipants}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-8 text-[#000] opacity-50">
                <div className="font-normal">Tier</div>
                <div className="font-normal text-center">Address</div>
                <div className="font-normal text-right">Prize</div>
              </div>
              {new Array(
                Number(accumulatedParticipants) >= 3
                  ? 3
                  : accumulatedParticipants
              ).map((_, item) => (
                <div
                  key={item}
                  className="grid grid-cols-3 text-[#000] text-[14px] mb-2 items-center"
                >
                  <div className="font-bold">{item + 1}</div>
                  <div className="font-bold text-center">
                    {winnerUsers?.[item]?.toString().slice(0, 6)}
                  </div>
                  <div className="font-bold text-right">
                    ${formatAmount(Number(prizeTiers?.[item]))}
                  </div>
                </div>
              ))}
              <div className="text-[#157433] text-base font-semibold mt-4">
                <a href="#link">
                  See Other Winners{" "}
                  <ChevronRight width={24} height={24} className="inline" />
                </a>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                className="text-[#008C50] font-semibold flex items-center mx-auto"
                onClick={() => setShowDetails(false)}
              >
                Hide
                <ChevronDown
                  width={24}
                  height={24}
                  className="ml-1 rotate-180"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
