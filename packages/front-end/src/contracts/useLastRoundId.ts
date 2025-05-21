import { useReadContract } from 'wagmi'
import { ILotteryABI as lotteryAbi } from '../abi/ILottery'
import { LOTTERY_ADDRESS } from '../config/contracts'

export function useLastRoundId() {
  const {
    data: lastRoundId,
    isLoading,
    error,
  } = useReadContract({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: 'getLastRoundId',
  })

  return {
    lastRoundId: lastRoundId ? Number(lastRoundId) : 0,
    isLoading,
    error,
  }
}
