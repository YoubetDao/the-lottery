import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { GlobalBanner, GlobalBannerProps } from "./GlobalBanner";

type BannerState = Omit<GlobalBannerProps, "onClose"> | null;

const BannerContext = createContext<{
  showBanner: (props: Omit<GlobalBannerProps, "onClose">) => void;
  hideBanner: () => void;
}>({
  showBanner: () => {},
  hideBanner: () => {},
});

export const useGlobalBanner = () => useContext(BannerContext);

export const GlobalBannerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [banner, setBanner] = useState<BannerState>(null);

  const showBanner = (props: Omit<GlobalBannerProps, "onClose">) => {
    setBanner(props);
  };

  const handleClose = () => setBanner(null);

  const contextValue = useMemo(
    () => ({
      showBanner,
      hideBanner: handleClose,
    }),
    [showBanner, handleClose]
  );

  return (
    <BannerContext.Provider value={contextValue}>
      {children}
      {banner && <GlobalBanner {...banner} onClose={handleClose} />}
    </BannerContext.Provider>
  );
};