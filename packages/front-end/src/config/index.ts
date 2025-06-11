// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export const projectId =
  process.env.REACT_APP_PROJECT_ID || "842497ffbfc8c1a13975988f4508fcfa";

export const LOTTERY_ADDRESS =
  process.env.REACT_APP_LOTTERY_ADDRESS ||
  "0x2AB4644281eEDE3CD8Ec1fCA009D75ae59eDA33c";
export const POINTS_ADDRESS =
  process.env.REACT_APP_POINTS_ADDRESS ||
  "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7";

const eduTestnet = {
  id: 656476,
  name: "EduChain-Testnet",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
};

export const eduChain = {
  id: 41923,
  name: "Edu Chain",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.edu-chain.raas.gelato.cloud"],
    },
  },
};

export const currentChain =
  process.env.REACT_APP_ENV === "production" ? eduChain : eduTestnet;
