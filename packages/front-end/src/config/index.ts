// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export const projectId = "842497ffbfc8c1a13975988f4508fcfa";

export const eduTestnet = {
  id: 656476,
  name: "EduChain-Testnet",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://open-campus-codex-sepolia.drpc.org"],
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
