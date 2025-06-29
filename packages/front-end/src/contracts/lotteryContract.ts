import {
  useReadContract,
  useWriteContract,
  useSignTypedData,
  useAccount,
  useChainId,
} from "wagmi";
import { ILotteryABI, ILotteryABI as lotteryAbi } from "../abi/ILottery";
import { LOTTERY_ADDRESS, POINTS_ADDRESS } from "../config";
import { useEffect } from "react";

export function useLastRoundId() {
  const {
    data: lastRoundId,
    error,
    isPending,
  } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "getLastRoundId",
  });

  return {
    lastRoundId: lastRoundId ? Number(lastRoundId) : 0,
    error,
    isPending,
  };
}

export function useRoundInfo() {
  const {
    lastRoundId,
    isPending: isRoundIdLoading,
    error: roundIdError,
  } = useLastRoundId();

  const { data, isPending, error } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "rounds",
    args: [lastRoundId],
  });

  return {
    isOpen: data?.[0],
    startTime: data?.[1],
    endTime: data?.[2],
    rewardAmount: data?.[3],
    winnerCount: data?.[4],
    totalTickets: data?.[5],
    accumulatedAmount: data?.[6],
    accumulatedParticipants: data?.[7],
    winNumber: data?.[8],
    isPending,
    error,
  };
}

export function useGenerateSigParam(
  holder: `0x${string}`,
  roundId: number | bigint
) {
  const { data, isPending, error } = (useReadContract as any)({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: lotteryAbi,
    functionName: "generateSigParam",
    args: [holder, BigInt(roundId)],
  });

  return {
    consumeReasonCode: data ? data[0] : undefined,
    nonce: data ? Number(data[1]) : undefined,
    isPending,
    error,
  };
}

export function useBuy() {
  const {
    writeContractAsync,
    isPending,
    data: hash,
    error,
  } = useWriteContract();

  /**
   * 购买彩票
   * @param params 购买参数
   * @returns 交易hash
   */
  const buy = async ({
    roundId,
    amount,
    signature,
    deadline,
  }: {
    roundId: bigint | number;
    amount: bigint | number;
    signature: `0x${string}`;
    deadline: bigint | number;
  }) => {
    if (roundId == null || amount == null || !signature || deadline == null) {
      throw new Error("Missing required parameters");
    }

    if (roundId == -1) {
      throw new Error("No round is open now");
    }

    return await (writeContractAsync as any)({
      address: LOTTERY_ADDRESS as `0x${string}`,
      abi: lotteryAbi,
      functionName: "buy",
      args: [BigInt(roundId), BigInt(amount), signature, BigInt(deadline)],
    });
  };

  return {
    buy,
    isPending,
    hash,
    error,
  };
}

export function usePointsSignature() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { signTypedDataAsync } = useSignTypedData();

  // 获取最新轮次ID
  const {
    lastRoundId,
    isPending: isRoundIdLoading,
    error: roundIdError,
  } = useLastRoundId();

  // 获取签名参数
  const {
    consumeReasonCode,
    nonce,
    isPending: isParamLoading,
    error: paramError,
  } = useGenerateSigParam(address as `0x${string}`, lastRoundId);

  /**
   * 生成购买彩票所需的签名
   */
  async function signForBuy(amount: bigint) {
    if (!chainId) throw new Error("chainId not found");
    if (!address) throw new Error("wallet not connected");
    if (isRoundIdLoading) throw new Error("roundId not ready");
    if (lastRoundId < -1) throw new Error("invalid roundId");
    if (lastRoundId === -1) throw new Error("No round is open now");
    if (!consumeReasonCode || nonce === undefined)
      throw new Error("signature params not ready");

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1小时后过期

    const domain = {
      name: "Points",
      version: "1.0",
      chainId: 656476,
      verifyingContract: POINTS_ADDRESS as `0x${string}`,
    };

    const types = {
      Consume: [
        { name: "holder", type: "address" },
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "reasonCode", type: "bytes32" },
        { name: "deadline", type: "uint256" },
        { name: "nonce", type: "uint256" },
      ],
    };

    const message = {
      holder: address as `0x${string}`,
      spender: LOTTERY_ADDRESS as `0x${string}`,
      amount,
      reasonCode: consumeReasonCode,
      deadline,
      nonce: BigInt(nonce),
    };

    const signature = await (signTypedDataAsync as any)({
      domain,
      types,
      primaryType: "Consume",
      message,
    });

    return {
      signature,
      deadline,
      roundId: lastRoundId,
    };
  }

  return {
    signForBuy,
    isLoading: isRoundIdLoading || isParamLoading,
    roundId: lastRoundId,
    error: roundIdError || paramError,
  };
}

// Hook to get user round history
export function useUserRoundHistory() {
  const { address: walletAddress } = useAccount();

  const {
    lastRoundId: roundId,
    isPending: isRoundIdLoading,
    error: roundIdError,
  } = useLastRoundId();

  const { data, isPending, error, refetch } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "getUserRoundHistory",
    args: [walletAddress, BigInt(roundId)],
  });

  return {
    roundId: data?.roundId,
    startTime: data?.startTime,
    endTime: data?.endTime,
    totalAmountSpent: data?.totalAmountSpent,
    totalTicketCount: data?.totalTicketCount,
    winningTicketCount: data?.winningTicketCount,
    prizeWon: data?.prizeWon,
    isPending,
    error,
    refetch,
  };
}

export function useYourHistory(page: bigint, pageSize: bigint) {
  const { isConnected, address } = useAccount();
  const { data } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "getUserHistory",
    args: isConnected && address ? [address, page, pageSize] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    historyListRaw: data?.[0],
    hasMore: data?.[1],
  };
}

export function useLastEndRoundId() {
  const {
    data: lastRoundId,
    error,
    isPending,
  } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "getLastDrawnRoundId",
  });

  return {
    lastEndRoundId: lastRoundId ? Number(lastRoundId) : 0,
    error,
    isPending,
  };
}

export function useRoundsHistory(roundId: bigint) {
  const { data, isLoading, error } = (useReadContract as any)({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: "getRound",
    args: [roundId],
  });

  return {
    isOpen: data?.isOpen,
    startTime: data?.startTime,
    endTime: data?.endTime,
    rewardAmount: data?.rewardAmount,
    winnerCount: data?.winnerCount,
    prizeTiers: data?.prizeTiers,
    totalTickets: data?.totalTickets,
    accumulatedAmount: data?.accumulatedAmount,
    accumulatedParticipants: data?.accumulatedParticipants,
    winnerUsers: data?.winnerUsers,
    winNumber: data?.winNumber,
  };
}
