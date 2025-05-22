import { useReadContract, useWriteContract, useSignTypedData, useAccount, useChainId } from 'wagmi'
import { ILotteryABI as lotteryAbi } from '../abi/ILottery'
import { LOTTERY_ADDRESS, POINTS_ADDRESS } from '../config/contracts'

export function useLastRoundId() {
  const {
    data: lastRoundId,
    error,
    isPending
  } = useReadContract({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: 'getLastRoundId',
  })

  return {
    lastRoundId: lastRoundId ? Number(lastRoundId) : 0,
    error,
    isPending
  }
}

export function useGenerateSigParam(holder: `0x${string}`, roundId: number | bigint) {
  // 如果参数无效，返回空结果
  if (!holder || holder === '0x0000000000000000000000000000000000000000' || !roundId) {
    return {
      consumeReasonCode: undefined,
      nonce: undefined,
      isPending: false,
      error: undefined
    }
  }

  const {
    data,
    isPending,
    error,
  } = useReadContract({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: lotteryAbi,
    functionName: 'generateSigParam',
    args: [holder, BigInt(roundId)],
  })

  return {
    consumeReasonCode: data ? data[0] : undefined,
    nonce: data ? Number(data[1]) : undefined,
    isPending,
    error,
  }
}

export function useBuy() {
  const {
    writeContractAsync,
    isPending,
    data: hash,
    error,
  } = useWriteContract()

  /**
   * 购买彩票
   * @param params 购买参数
   * @returns 交易hash
   */
  const buy = async ({
    roundId,
    amount,
    signature,
    deadline
  }: {
    roundId: bigint | number
    amount: bigint | number
    signature: `0x${string}`
    deadline: bigint | number
  }) => {
    if (!roundId || !amount || !signature || !deadline) {
      throw new Error('Missing required parameters')
    }

    return await writeContractAsync({
      address: LOTTERY_ADDRESS as `0x${string}`,
      abi: lotteryAbi,
      functionName: 'buy',
      args: [
        BigInt(roundId),
        BigInt(amount),
        signature,
        BigInt(deadline)
      ],
    })
  }

  return {
    buy,
    isPending,
    hash,
    error,
  }
}

export function usePointsSignature() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signTypedDataAsync } = useSignTypedData()

  // 获取最新轮次ID
  const { lastRoundId, isPending: isRoundIdLoading, error: roundIdError } = useLastRoundId()

  // 获取签名参数
  const {
    consumeReasonCode,
    nonce,
    isPending: isParamLoading,
    error: paramError
  } = useGenerateSigParam(
    address as `0x${string}`,
    lastRoundId
  )

  /**
   * 生成购买彩票所需的签名
   */
  async function signForBuy(amount: bigint) {
    if (!chainId) throw new Error('chainId not found')
    if (!address) throw new Error('wallet not connected')
    if (isRoundIdLoading) throw new Error('roundId not ready')
    if (!lastRoundId) throw new Error('invalid roundId')
    if (!consumeReasonCode || nonce === undefined) throw new Error('signature params not ready')

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600) // 1小时后过期

    const domain = {
      name: 'Points',
      version: '1.0',
      chainId,
      verifyingContract: POINTS_ADDRESS as `0x${string}`,
    }

    const types = {
      Consume: [
        { name: 'holder', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'reasonCode', type: 'bytes32' },
        { name: 'deadline', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    }

    const message = {
      holder: address as `0x${string}`,
      spender: address as `0x${string}`,
      amount,
      reasonCode: consumeReasonCode,
      deadline,
      nonce: BigInt(nonce),
    }

    const signature = await signTypedDataAsync({
      domain,
      types,
      primaryType: 'Consume',
      message,
    })

    return {
      signature,
      deadline,
      roundId: lastRoundId,
    }
  }

  return {
    signForBuy,
    isLoading: isRoundIdLoading || isParamLoading,
    roundId: lastRoundId,
    error: roundIdError || paramError
  }
}