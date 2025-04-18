import React, { useState } from "react";
import { DrawData } from "../types";
import { AllHistory } from "./AllHistort";
import { YourHistory } from "./YourHistory";

interface DrawHistoryProps {
  initialDrawData?: DrawData;
}

const DrawHistory: React.FC<DrawHistoryProps> = () => {
  const [activeTab, setActiveTab] = useState<"all" | "your">("all");

  return (
    <section id="past_draw" className="mt-[96px]">
      <div className="my-8">
        <div className="flex mb-4 bg-yuzu-cream rounded-full p-[8px] relative outline outline-[2px] outline-[#102C24]">
          <img
            src={require("../assets/flower.png")}
            alt=""
            className="absolute top-[-64px] left-[30%] -z-10"
          />

          <button
            className={`${
              activeTab === "all"
                ? "bg-[#D2FF70] text-black  border-[#102C24]"
                : "bg-yuzu-cream text-black border-[#FCF0E3]"
            } flex-1 py-2 rounded-full font-semibold border`}
            onClick={() => setActiveTab("all")}
          >
            All History
          </button>
          <button
            className={`${
              activeTab === "your"
                ? "bg-[#D2FF70] text-black  border-[#102C24]"
                : "bg-yuzu-cream text-black border-[#FCF0E3]"
            } flex-1 py-2 rounded-full font-semibold border`}
            onClick={() => setActiveTab("your")}
          >
            Your History
          </button>
        </div>
      </div>
      {activeTab === "all" && <AllHistory />}
      {activeTab === "your" && <YourHistory />}
    </section>
  );
};

export default DrawHistory;
