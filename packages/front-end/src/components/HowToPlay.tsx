import React from "react";
import { StepInfo } from "../types";

interface HowToPlayProps {
  steps?: StepInfo[];
}

const HowToPlay: React.FC<HowToPlayProps> = ({
  steps = [
    {
      step: 1,
      title: "Buy Tickets",
      description:
        "Prices are set when the round starts, equal to 5 USD in YUZU per ticket.",
    },
    {
      step: 2,
      title: "Wait for the Draw",
      description:
        "There is one draw every day alternating between 0 AM UTC and 12 PM UTC.",
    },
    {
      step: 3,
      title: "Check for Prizes",
      description:
        "Once the round's over, come back to the page and check to see if you've won!",
    },
  ],
}) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {/* How to <span className="text-yuzu-green">Play</span> */}
        How to <span className="text-[#2D6A4F]">Play</span>
      </h2>

      <div className="flex gap-4 justify-center">
        {steps.map((step) => (
          <div
            key={step.step}
            className="relative bg-[#FDF6F0] rounded-[32px] p-6 w-1/3 border-t-[3px] border-l-[3px] border-r-[3px] border-t border-x border-b-[8px] border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]"
          >
            <div className="inline-block bg-[#E9A23B] text-[#F6E35A] px-4 py-2 rounded-full font-bold text-lg mb-4">
              Step {step.step}
            </div>
            <div className="text-[#2D6A4F] text-2xl font-bold mb-4">
              {step.title}
            </div>
            <p className="text-gray-900 text-lg leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-4">
        <img src="/123.jpg" alt="YUZU Mascot" className="h-20 w-20" />
      </div> */}
    </div>
  );
};

export default HowToPlay;
