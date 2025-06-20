import { useReadContract, useAccount } from "wagmi";
import { PointsABI } from "../abi/Points";
import { POINTS_ADDRESS } from "../config";

export const useYuzuBalance = () => {
  const { address } = useAccount();

  const { data, isPending, error, refetch } = (useReadContract as any)({
    address: POINTS_ADDRESS as `0x${string}`,
    abi: PointsABI,
    functionName: "balances",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: data,
    isPending,
    error,
    refetch,
  };
};
