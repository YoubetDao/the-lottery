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
      <div className="relative w-[490px]">
        {/* 小熊图片，绝对定位在面板上方居中 */}
        <img
          src={require("../assets/ticket-info-panel-bear.png")}
          alt="Ticket Info"
          className="absolute left-1/2 -translate-x-1/2 z-10 w-[160px] h-auto pointer-events-none"
          style={{
            top: `-${252 * 0.84127}px`, // 约 -101px
          }}
        />
        <div className="bg-amber-50 rounded-lg p-6 text-black shadow-md border border-amber-100 relative z-20 overflow-hidden w-[490px]">
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
      </div>

      {/* Right Panel - Ticket Purchase */}
      <div className="flex-1">
        <div className="bg-[#FFA706] rounded-t-lg p-4 border-[2px] border-[#102C24]">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[#102C24] text-[14px] font-medium ">Buy</div>
            {/* <div className="text-[#2D6A4F] font-medium">MAX {ticketData.maxLimit.toLocaleString()} YUZU</div> */}
            <div className="font-medium flex items-center">
              <span className="text-[#157433] font-bold">MAX</span>
              <span className="ml-2 text-[#102C24] font-bold">{ticketData.maxLimit.toLocaleString()} YUZU</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <input
              type="number"
              value={ticketData.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                const limitedValue = Math.min(value, ticketData.maxLimit);
                handleQuantityChange(limitedValue);
              }}
              className="text-5xl font-bold text-[#2D6A4F] bg-transparent w-32 outline-none"
              min="0"
              max={ticketData.maxLimit}
            />
            <div className="text-[#E6622B] text-[20px] font-[600]">Ticket</div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(5)}
            >
              5
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(10)}
            >
              10
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(50)}
            >
              50
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(ticketData.maxLimit)}
            >
              MAX
            </button>
          </div>
        </div>

        <div className="bg-[#157433] rounded-b-lg p-4 border-x-[2px] border-t-[1px] border-[#102C24] shadow-[0_4px_0_rgba(0,0,0,1)]">
          <div className="flex justify-between mb-4 text-white">
            <span>Cost</span>
            <span>{ticketData.quantity} YUZU</span>
          </div>

          <button
            className="bg-[#C2F970] hover:bg-[#B5EC63] w-full py-3 rounded-lg text-[#102C24] font-bold mb-2  shadow-[0_3px_0_rgba(0,0,0,1)]  border-2 border-[#102C24]"
            onClick={() => console.log(`Buying ${ticketData.quantity} tickets`)}
          >
            Buy {ticketData.quantity} Tickets
          </button>

          <div className="text-xs text-center text-white/80">
            Buying ticket will cost YUZU, and all purchases are final
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
