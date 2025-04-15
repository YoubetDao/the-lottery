import React, { useState } from "react";
import { DrawData } from "../types";

interface DrawHistoryProps {
  initialDrawData?: DrawData;
}

const DrawHistory: React.FC<DrawHistoryProps> = ({
  initialDrawData = {
    roundNumber: 123,
    isLatest: true,
    drawDate: "22th Sept at 9 AM UTC",
    winningNumbers: [7, 3, 5, 1, 8, 2],
  },
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "your">("all");
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
    <section id="past_draw">
      <div className="my-8">
        <div className="flex mb-4">
          <button
            className={`${
              activeTab === "all"
                ? "bg-yuzu-green text-black"
                : "bg-yuzu-cream text-black"
            } flex-1 py-2 rounded-l-full`}
            onClick={() => setActiveTab("all")}
          >
            All History
          </button>
          <button
            className={`${
              activeTab === "your"
                ? "bg-yuzu-green text-black"
                : "bg-yuzu-cream text-black"
            } flex-1 py-2 rounded-r-full`}
            onClick={() => setActiveTab("your")}
          >
            Your History
          </button>
        </div>

        <div className="bg-yuzu-cream rounded-lg p-6 text-black">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-bold">
                Round #{currentDraw.roundNumber}
              </span>
              {currentDraw.isLatest && (
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Latest
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={handlePreviousDraw}>&lt;</button>
              <button onClick={handleNextDraw}>&gt;</button>
              <button onClick={handleClose}>×</button>
            </div>
          </div>

          <div className="text-sm mb-4">Drawn {currentDraw.drawDate}</div>

          <div className="mb-4">
            <div className="text-center mb-2">Winning Number</div>
            <div className="flex justify-center gap-2">
              {currentDraw.winningNumbers.map((num, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              className="text-green-600 flex items-center mx-auto"
              onClick={() => setShowDetails(!showDetails)}
            >
              Details
              <svg
                className={`h-4 w-4 ml-1 transform ${
                  showDetails ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {showDetails && (
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-500">Prize Pool</h4>
                  <p className="text-green-600 text-2xl font-bold">$557,762</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-500">Total Reward</h4>
                  <p className="font-bold text-xl">663</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                <div>
                  <p className="text-gray-500">Match Part 1</p>
                  <p className="text-green-600 font-bold">$762</p>
                  <p className="text-sm">78 Winning Tickets</p>
                </div>
                <div>
                  <p className="text-gray-500">Match Part 2</p>
                  <p className="text-green-600 font-bold">$1,762</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
                <div>
                  <p className="text-gray-500">Match Part 3</p>
                  <p className="text-green-600 font-bold">$2,071</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
                <div>
                  <p className="text-gray-500">Match Part 4</p>
                  <p className="text-green-600 font-bold">$3,623</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
                <div>
                  <p className="text-gray-500">Match Part 5</p>
                  <p className="text-green-600 font-bold">$4,623</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <p className="text-gray-500">Match Part 6</p>
                  <p className="text-green-600 font-bold">$8,623</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
                <div>
                  <p className="text-gray-500">Burn</p>
                  <p className="text-green-600 font-bold">$18,623</p>
                  <p className="text-sm">65 Winning Tickets</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DrawHistory;
