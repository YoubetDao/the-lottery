import React, { useEffect, useState } from "react";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ReactComponent as CopyIcon } from "../assets/copy-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";

interface NavbarProps {}

interface DropTrxInfo {
  asset: string;
  amount: string;
  txHash: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();

  const [dropTrxInfo, setDropTrxInfo] = useState<DropTrxInfo | null>(null);
  const [copied, setCopied] = useState(false);

  //获取中奖列表
  const fetchPrizeList = async () => {
    const res = await fetch(
      "https://gist.githubusercontent.com/greenbookwebb/e44f4e7ab3513c09b68930e09a441994/raw/gistfile1.json"
    );
    const data: Record<string, DropTrxInfo> = await res.json();

    setDropTrxInfo(data[address || ""]);
  };

  useEffect(() => {
    fetchPrizeList();
  }, []);

  console.log("dropTrxInfo", dropTrxInfo);

  return (
    <>
      <nav className="bg-yuzu-cream yuzu-card-border mx-auto mb-4 max-w-5xl ">
        <div className="flex justify-between items-center py-6 px-10">
          <div className="flex gap-6">
            <button className="font-bold text-[#F05A28] text-base leading-3 pt-1 cursor-pointer">
              <img
                src={require("../assets/logo.png")}
                alt="logo"
                className="w-8 h-8 inline mr-1 relative -top-[1px]"
              />
              <a href="#yuzu_lottery">YUZU LOTTERY</a>
            </button>
            <button className="font-semibold text-[#102C24] text-base leading-[14px] opacity-50 hover:opacity-100 hover:font-bold hover:text-[#F05A28] cursor-pointer">
              <a href="#past_draw"> Past Draw</a>
            </button>
            <button className="font-semibold text-[#102C24] text-base leading-[14px] opacity-50 hover:opacity-100 hover:font-bold hover:text-[#F05A28] cursor-pointer">
              <a href="#how_it_works">How It Works</a>
            </button>
          </div>
          <div>
            {isConnected ? (
              <div className="cursor-pointer" onClick={openAccountModal}>
                <span className="font-bold text-[#F05A28]">
                  {address
                    ? `${address.slice(0, 5)}...${address.slice(-4)}`
                    : ""}
                </span>
                <svg
                  className="icon w-4 h-4 inline-block ml-2 fill-gray-300"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M534.4 553.6L262.4 284.8l-89.6 89.6 272 272 89.6 89.6 89.6-89.6 272-272-89.6-89.6z"></path>
                </svg>
              </div>
            ) : (
              <button
                className="bg-yuzu-green p-4 font-semibold text-black yuzu-button-border cursor-pointer"
                onClick={openConnectModal}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
      {dropTrxInfo && (
        <div className="bg-[#FFD02C] yuzu-card-border mx-auto mb-4 max-w-5xl px-8 py-4 decorated-box">
          <div className="flex justify-between items-center decorated-div">
            <div className="flex gap-6">
              <img
                src={require("../assets/playwin-logo.png")}
                alt="playwin-logo"
              />
              <div>
                <div className="bg-[#F05A28] text-white px-4 py-2 rounded-[100px] font-bold">
                  Congrats! Prize Won
                </div>
                <div className="text-[#157433] font-bold text-2xl mt-3">
                  {dropTrxInfo?.amount} {dropTrxInfo?.asset}
                </div>
              </div>
            </div>

            <div className="text-[16px] font-bold flex gap-8 items-center">
              <div className="flex gap-1 items-center">
                <span className="text-[#102C24] ">Transaction Hash</span>
                <div className="flex gap-1 items-center">
                  <span className="text-[#008C50] ">
                    {`${dropTrxInfo?.txHash.substring(0, 12)}...`}
                  </span>
                  <CopyIcon
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(dropTrxInfo?.txHash || "");
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 3000);
                    }}
                  />
                  {copied && (
                    <span className="ml-2 text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>

              <CloseIcon
                onClick={() => {
                  setDropTrxInfo(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
