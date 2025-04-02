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
    <div className="flex justify-center items-start gap-6 my-8 w-full">
      <div className="bg-yuzu-cream rounded-lg p-6 text-black flex-1">
        <div className="text-center mb-4">
          <div className="text-2x font-bold text-black-500 mt-5">Get Your Ticket Now!</div>
          <div className="text-4xl font-bold text-[#137c37] mt-4">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m
          </div>
          <div className="text-sm mt-4 font-bold">Until the draw</div>
        </div>
        <div className="text-sm">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Contract Address</span>
            <span className="flex items-center font-bold text-[#137c37]">
              {contractInfo.address}
              <button
                className="ml-1"
                onClick={() =>
                  navigator.clipboard.writeText(contractInfo.address)
                }
              >
                📋
              </button>
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Next Draw</span>
            <span className="font-bold text-[#137c37]">{contractInfo.nextDraw}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Your Ticket</span>
            <span className="font-bold text-[#137c37]">{contractInfo.userTickets}</span>
          </div>
        </div>
      </div>

      <div className="bg-yuzu-orange rounded-lg p-6 text-black flex-1"> 
        <div className="rounded-t-lg  flex justify-between items-center">
          <div className="text-3xl font-bold">{ticketData.quantity}</div>
          <div className="text-right">
            <div>MAX {ticketData.maxLimit.toLocaleString()} YUZU</div>
            <div>Ticket</div>
          </div>
        </div>

        {/* <div className="bg-yuzu-cream rounded-b-lg p-4 text-black"> */}
          <div className="flex justify-between gap-2 mb-4">
            <button
              className="bg-gray-200 flex-1 py-2 rounded"
              onClick={() => handleQuantityChange(1)}
            >
              1
            </button>
            <button
              className="bg-gray-200 flex-1 py-2 rounded"
              onClick={() => handleQuantityChange(10)}
            >
              10
            </button>
            <button
              className="bg-gray-200 flex-1 py-2 rounded"
              onClick={() => handleQuantityChange(50)}
            >
              50
            </button>
            <button
              className="bg-gray-200 flex-1 py-2 rounded"
              onClick={() => handleQuantityChange(ticketData.maxLimit)}
            >
              MAX
            </button>
          </div>

          <div className="bg-[#137c37] rounded-b-lg">
            <div className="flex justify-between mb-4">
              <span>Cost</span>
              <span>{ticketData.cost} YUZU</span>
            </div>

            <button
              className="bg-yuzu-green w-full py-3 rounded-lg text-black font-bold mb-2"
              onClick={() => console.log(`Buying ${ticketData.quantity} tickets`)}
            >
              Buy {ticketData.quantity} Tickets
            </button>

            <div className="text-xs text-center">
              Buying ticket will cost YUZU, and all purchases are final
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default TicketInfo;
