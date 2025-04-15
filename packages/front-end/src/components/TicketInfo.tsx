import React, { useState } from "react";
import { ContractInfo, TicketData, CountdownData } from "../types";

interface TicketInfoProps {
  initialContractInfo?: ContractInfo;
  initialTicketData?: TicketData;
  initialCountdown?: CountdownData;
}

const TicketInfo: React.FC<TicketInfoProps> = ({
  initialContractInfo = {
    address: "0x4723...76462d",
    nextDraw: "24th Sept at 9 AM UTC",
    userTickets: 0,
  },
  initialTicketData = {
    cost: 500,
    quantity: 500,
    maxLimit: 100000,
  },
  initialCountdown = {
    days: 1,
    hours: 22,
    minutes: 23,
  },
}) => {
  const [ticketData, setTicketData] = useState<TicketData>(initialTicketData);
  const [contractInfo] = useState<ContractInfo>(initialContractInfo);
  const [countdown] = useState<CountdownData>(initialCountdown);

  const handleQuantityChange = (quantity: number) => {
    setTicketData({
      ...ticketData,
      quantity: quantity,
    });
  };

  return (
    <div className="flex justify-center items-start gap-6 mb-8 w-full max-w-4xl mx-auto">
      {/* Left Panel - Ticket Info */}
      <div className="bg-amber-50 rounded-lg p-6 text-black flex-1 shadow-md border border-amber-100">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-gray-700 mt-2">
            Get Your Ticket Now!
          </div>
          <div className="text-4xl font-bold text-green-700 mt-4">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m
          </div>
          <div className="text-sm mt-2 font-medium text-gray-600">
            Until the draw
          </div>
        </div>
        <div className="text-sm mt-4">
          <div className="flex justify-between mb-3">
            <span className="font-medium text-gray-700">Contract Address</span>
            <span className="flex items-center font-medium text-green-700">
              {contractInfo.address.replace("...", "…")}
              <button
                className="ml-1 text-green-700"
                onClick={() =>
                  navigator.clipboard.writeText(contractInfo.address)
                }
              >
                📋
              </button>
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="font-medium text-gray-700">Next Draw</span>
            <span className="font-medium text-green-700">
              {contractInfo.nextDraw}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Your Ticket</span>
            <span className="font-medium text-green-700">
              {contractInfo.userTickets}
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Ticket Purchase */}
      <div className="flex-1">
        {/* Upper section - Orange/Yellow background */}
        <div className="bg-amber-400 rounded-t-lg p-4 text-black">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-green-700">
                {ticketData.quantity}
              </div>
              <div className="ml-2 text-green-800 font-medium">Buy</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-800">
                MAX {ticketData.maxLimit.toLocaleString()} YUZU
              </div>
              <div className="text-sm font-medium text-amber-600">Ticket</div>
            </div>
          </div>

          <div className="flex justify-between gap-2 my-4">
            <button
              className="bg-amber-300 flex-1 py-2 rounded font-medium text-amber-800"
              onClick={() => handleQuantityChange(5)}
            >
              5
            </button>
            <button
              className="bg-amber-300 flex-1 py-2 rounded font-medium text-amber-800"
              onClick={() => handleQuantityChange(10)}
            >
              10
            </button>
            <button
              className="bg-amber-300 flex-1 py-2 rounded font-medium text-amber-800"
              onClick={() => handleQuantityChange(50)}
            >
              50
            </button>
            <button
              className="bg-amber-300 flex-1 py-2 rounded font-medium text-amber-800"
              onClick={() => handleQuantityChange(ticketData.maxLimit)}
            >
              MAX
            </button>
          </div>
        </div>

        {/* Lower section - Green background */}
        <div className="bg-green-800 rounded-b-lg p-4 text-white">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Cost</span>
            <span className="font-medium">{ticketData.cost} YUZU</span>
          </div>

          <button
            className="bg-green-300 w-full py-3 rounded-lg text-green-900 font-bold mb-2"
            onClick={() => console.log(`Buying ${ticketData.quantity} tickets`)}
          >
            Buy {ticketData.quantity} Tickets
          </button>

          <div className="text-xs text-center text-green-200 mt-2">
            Buying ticket will cost YUZU, and all purchases are final.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
