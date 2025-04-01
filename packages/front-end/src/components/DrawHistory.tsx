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
            <span className="font-bold">Round #{currentDraw.roundNumber}</span>
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
                <h4 className="font-bold">Prize Pool</h4>
                <p>Total: 10,000 YUZU</p>
              </div>
              <div>
                <h4 className="font-bold">Winners</h4>
                <p>Match 6: 1 winner</p>
                <p>Match 5: 10 winners</p>
                <p>Match 4: 100 winners</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawHistory;
