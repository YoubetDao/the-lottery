// Contract addresses for different environments
export const LOTTERY_ADDRESS = process.env.LOTTERY_ADDRESS as `0x${string}`;

if (!LOTTERY_ADDRESS) {
  throw new Error("LOTTERY_ADDRESS is not defined in environment variables");
}