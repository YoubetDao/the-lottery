import { useState } from "react";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";
import { useYourHistory } from "../contracts/lotteryContract";
import { UserHistory } from "../types";
import { formatAmount } from "./AllHistory";

export const YourHistory = () => {
  const [page, setPage] = useState<bigint>(1n);
  const pageSize = 10n;
  const { historyListRaw, hasMore } = useYourHistory(page, pageSize);
  const hasNextPage = hasMore || false;
  const handlePreviousDraw = () => {
    if (page > 1n) setPage(page - 1n);
  };

  const handleNextDraw = () => {
    hasNextPage && setPage(page + 1n);
  };

  return (
    <div className="rounded-[16px] bg-yuzu-cream p-8">
      <div className="flex justify-between">
        <div className="color-[#102C24] font-semibold text-[16px] ">Rounds</div>
        <div className="flex gap-2">
          <div
            className="cursor-pointer w-10 h-10"
            onClick={handlePreviousDraw}
          >
            <ChevronLeft width={24} height={24} />
          </div>

          <div className="cursor-pointer w-10 h-10" onClick={handleNextDraw}>
            <ChevronRight width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-4 text-[#00000080] text-[14px] mb-2">
          <div className="font-normal">#</div>
          <div className="font-normal">Date</div>
          <div className="font-normal">Total Tickets</div>
          <div className="font-normal text-right">Prize Won</div>
        </div>

        {historyListRaw?.map((item: UserHistory) => (
          <div
            key={item.roundId.toString()}
            className="grid grid-cols-4 text-[#000] text-[14px] mb-2 items-center"
          >
            <div className="font-medium">{item.roundId.toString()}</div>
            <div className="font-medium">
              {new Date(Number(item.startTime) * 1000).toLocaleString()}
            </div>
            <div className="font-medium">
              {item.totalTicketCount.toString()}
            </div>
            <div className="font-medium text-right">
              {formatAmount(Number(item.prizeWon))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
