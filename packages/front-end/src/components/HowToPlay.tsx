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
        How to <span className="text-yuzu-green">Play</span>
      </h2>

      <div className="flex gap-4 justify-center">
        {steps.map((step) => (
          <div
            key={step.step}
            className="bg-yuzu-cream rounded-lg p-6 text-black w-1/3"
          >
            <div className="text-yuzu-orange font-bold mb-2">
              Step {step.step}
            </div>
            <div className="text-xl font-bold text-green-700 mb-2">
              {step.title}
            </div>
            <p className="text-sm">{step.description}</p>
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
