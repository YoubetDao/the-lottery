import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ContractInfo, TicketData, CountdownData } from "../types";
import { ReactComponent as CopyIcon } from "../assets/copy-icon.svg";
import { LOTTERY_ADDRESS } from "../config";
import {
  usePointsSignature,
  useBuy,
  useRoundInfo,
  useUserRoundHistory,
} from "../contracts/lotteryContract";
import { useYuzuBalance } from "../contracts/pointsContract";
import { useGlobalBanner } from "./GlobalBannerContext";

// Helper function to format address
const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

// Helper function to format timestamp to custom UTC string
function formatTimestampToUtcString(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000); // Convert to milliseconds
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  }); // 'Sep'
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  // Add English ordinal suffix: 1st, 2nd, 3rd, 4th...
  const daySuffix = (d: number): string => {
    if (d >= 11 && d <= 13) return `${d}th`;
    switch (d % 10) {
      case 1:
        return `${d}st`;
      case 2:
        return `${d}nd`;
      case 3:
        return `${d}rd`;
      default:
        return `${d}th`;
    }
  };
  return `${daySuffix(
    day
  )} ${month} at ${formattedHour}:${minutes} ${ampm} UTC`;
}

function getCountdownData(targetTimestamp: bigint): CountdownData {
  const now = Date.now(); // Current time in milliseconds
  const targetTime = Number(targetTimestamp) * 1000; // Convert target timestamp to milliseconds

  let diff = Math.max(0, targetTime - now); // Ensure non-negative time difference in milliseconds

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));

  return { days, hours, minutes };
}

interface TicketInfoProps {
  initialContractInfo?: ContractInfo;
  initialTicketData?: TicketData;
  initialCountdown?: CountdownData;
}

const TicketInfo: React.FC<TicketInfoProps> = ({
  initialContractInfo = {
    address: LOTTERY_ADDRESS,
    nextDraw: "24th Sept at 9 AM UTC",
    userTickets: 0,
  },
  initialTicketData = {
    cost: 1,
    quantity: 5,
    maxLimit: 1000,
  },
  initialCountdown = {
    days: 0,
    hours: 0,
    minutes: 0,
  },
}) => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [ticketData, setTicketData] = useState<TicketData>(initialTicketData);
  const [contractInfo, setContractInfo] =
    useState<ContractInfo>(initialContractInfo);
  const [countdown, setCountdown] = useState<CountdownData>(initialCountdown);
  const [copied, setCopied] = useState(false);
  const { signForBuy, isLoading: isSignLoading } = usePointsSignature();
  const { buy, isPending: isBuyPending, hash, error: buyError } = useBuy();
  const {
    isOpen,
    startTime,
    endTime,
    isPending: isRoundInfoPending,
    error: roundInfoError,
  } = useRoundInfo();
  const {
    roundId,
    totalAmountSpent,
    totalTicketCount,
    winningTicketCount,
    prizeWon,
    isPending: isUserRoundHistoryPending,
    error: userRoundHistoryError,
    refetch: refetchUserRoundHistory,
  } = useUserRoundHistory();
  const {
    balance,
    isPending: isBalancePending,
    refetch: refetchBalance,
  } = useYuzuBalance();
  const { showBanner } = useGlobalBanner();

  // Only update contractInfo when endTime changes
  useEffect(() => {
    if (endTime) {
      setContractInfo((prev) => ({
        ...prev,
        nextDraw: formatTimestampToUtcString(endTime),
      }));

      setCountdown(getCountdownData(endTime));
    }
  }, [endTime]);

  useEffect(() => {
    if (totalTicketCount) {
      setContractInfo((prev) => ({
        ...prev,
        userTickets: totalTicketCount,
      }));
    }
  }, [totalTicketCount]);

  // Auto-update countdown every second based on fixedEndTime (only in production)
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!endTime) return;

    // 立即刷新一次
    setCountdown(getCountdownData(endTime));

    const timer = setInterval(() => {
      setCountdown(getCountdownData(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleQuantityChange = (quantity: number) => {
    setTicketData((prev) => ({
      ...prev,
      quantity,
    }));
  };

  const handleBuyTickets = async () => {
    try {
      const amount = BigInt(ticketData.quantity);
      const { signature, deadline, roundId } = await signForBuy(amount);

      const txHash = await buy({
        roundId,
        amount,
        signature,
        deadline,
      });
      // Log the transaction hash
      console.log("Buy transaction hash:", txHash);
      // After purchase, manually refetch user round history
      const result = await refetchUserRoundHistory();
      // If totalTicketCount exists in the response, update contractInfo.userTickets
      if (result?.data?.totalTicketCount) {
        // Log the user's ticket number after refetch
        console.log(
          "Number of Tickets after refetch:",
          result?.data?.totalTicketCount
        );

        setContractInfo((prev) => ({
          ...prev,
          userTickets: result.data.totalTicketCount,
        }));
      }
      showBanner({
        type: "success",
        message: "Ticket purchased successfully.",
      });
    } catch (error) {
      console.error("handleBuyTickets error:", error);
      showBanner({
        type: "error",
        message: "Ticket purchase failed, please try again.",
      });
    }
  };

  const handleMaxClick = async () => {
    try {
      const result = await refetchBalance();
      if (result?.data) {
        console.log("Balance after refetch:", result.data);
        setTicketData((prev) => {
          const max = Math.min(
            1000,
            Math.floor(Number(result.data) / prev.cost)
          );
          return {
            ...prev,
            maxLimit: max,
            quantity: max,
          };
        });
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Handle copy button click
  const handleCopy = () => {
    navigator.clipboard.writeText(contractInfo.address);
    setCopied(true);
  };

  // Automatically hide the copied message after 1.5 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const [labelStyle, valueStyle] = [
    "text-base leading-[1.6rem] font-poppins text-[#102C24]",
    "flex items-center text-base font-poppins font-semibold leading-[1.6rem] text-[#157433]",
  ];

  return (
    <div className="flex justify-center items-start gap-6 mb-8 w-full max-w-4xl mx-auto">
      {/* Left Panel - Ticket Info */}
      <div className="relative w-[490px] top-6">
        <img
          src={require("../assets/ticket-info-panel-bear.png")}
          alt="Ticket Info"
          className="absolute left-1/2 -translate-x-1/2 z-10 w-[160px] h-auto pointer-events-none "
          style={{
            top: `-${252 * 0.84}px`,
          }}
        />
        <div className="bg-amber-50 rounded-[16px] p-6 text-black relative z-20 overflow-hidden w-[490px] border-[2px] border-[#102C24] shadow-[0_3px_0_rgba(0,0,0,1)]">
          <div className="text-center mb-4">
            <div className="text-base leading-[1.6rem] font-poppins font-bold  text-[#102C24] mt-2">
              Get Your Ticket Now!
            </div>
            <div className="text-[2.5rem] leading-[3rem] font-poppins font-bold text-[#157433] mt-4">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m
            </div>
            <div className="text-base leading-[1.6rem] font-poppins font-medium text-[#102C24] mt-2">
              Until the draw
            </div>
          </div>
          <div className="text-sm mt-4">
            <div className="flex justify-between mb-3">
              <span className={labelStyle}>Contract Address</span>
              <span className={valueStyle}>
                {formatAddress(contractInfo.address)}
                <button className="ml-1 text-green-700" onClick={handleCopy}>
                  <CopyIcon />
                </button>
                {copied && (
                  <span className="ml-2 text-xs text-green-600">Copied!</span>
                )}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className={labelStyle}>Next Draw</span>
              <span className={valueStyle}>{contractInfo.nextDraw}</span>
            </div>
            <div className="flex justify-between">
              <span className={labelStyle}>Your Ticket</span>
              <span className={valueStyle}>{contractInfo.userTickets}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Ticket Purchase */}
      <div className="relative top-[-120px]">
        <section id="buy_ticket">
          <div className="bg-[#FFA706] rounded-t-[16px] px-8 py-6 border-[2px] w-[490px] border-[#102C24]">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[#102C24] text-[14px] font-medium ">Buy</div>
            <div className="font-medium flex items-center">
              <span className="text-[#157433] font-bold">MAX</span>
              <span className="ml-2 text-[#102C24] font-bold">
                {ticketData.maxLimit.toLocaleString()} YUZU
              </span>
            </div>
          </div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="number"
                value={String(ticketData.quantity)}
                onChange={(e) => {
                  // Remove leading zeros and non-digit characters
                  let strValue = e.target.value
                    .replace(/^0+(?=\d)/, "")
                    .replace(/[^\d]/g, "");
                  // If empty, treat as 0
                  let value = strValue === "" ? 0 : parseInt(strValue, 10);
                  const limitedValue = Math.min(value, ticketData.maxLimit);
                  handleQuantityChange(limitedValue);
                }}
                className="text-5xl font-bold text-[#2D6A4F] bg-transparent w-48 outline-none"
                min="1"
                max={ticketData.maxLimit}
              />
              <div className="text-[#E6622B] text-[20px] font-[600]">
                Ticket
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <button
                className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(5)}
                disabled={!isConnected}
              >
                5
              </button>
              <button
                className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(10)}
                disabled={!isConnected}
              >
                10
              </button>
              <button
                className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(50)}
                disabled={!isConnected}
              >
                50
              </button>
              <button
                className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleMaxClick}
                disabled={!isConnected || isBalancePending}
              >
                MAX
              </button>
            </div>
          </div>
        </section>

        <div className="bg-[#157433] rounded-b-[16px] px-8 py-6 border-x-[2px] border-t-[1px] border-[#102C24] shadow-[0_4px_0_rgba(0,0,0,1)]">
          <div className="flex justify-between mb-4 text-white">
            <span>Cost</span>
            <span>{ticketData.quantity * ticketData.cost} YUZU</span>
          </div>

          <button
            className="bg-[#C2F970] hover:bg-[#B5EC63] w-full py-3 rounded-lg text-[#102C24] font-bold mb-2 shadow-[0_3px_0_rgba(0,0,0,1)] border-2 border-[#102C24] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={
              !isConnected
                ? openConnectModal
                : isBuyPending
                ? undefined
                : handleBuyTickets
            }
            disabled={isBuyPending || !isConnected}
          >
            {!isConnected
              ? "Connect Wallet"
              : isBuyPending
              ? "Confirm in wallet..."
              : `Buy ${ticketData.quantity} Tickets`}
          </button>

          <div className="text-xs text-center text-white/80">
            {"Buying ticket will cost YUZU, and all purchases are final"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
