import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface GlobalBannerProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number;
}

const bannerStyle = {
  position: "fixed" as const,
  top: 32,
  left: 0,
  right: 0,
  zIndex: 99999,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none" as const,
};

const fontStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '100%',
  letterSpacing: 0,
  textAlign: 'center' as const,
  verticalAlign: 'middle',
  color: '#102C24',
};

export const GlobalBanner: React.FC<GlobalBannerProps> = ({
  type,
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === "success" ? "#D2FF70" : "#F05A28";

  return createPortal(
    <div style={bannerStyle}>
      <div
        className={`px-8 flex items-center shadow-2xl w-full max-w-5xl mx-auto h-16 relative pointer-events-auto transition-all duration-300 animate-fade-in`}
        style={{ background: bgColor, borderRadius: 24 }}
      >
        <span className="flex-1" style={fontStyle}>{message}</span>
        <button
          className="ml-6 text-2xl font-bold hover:text-gray-500 transition"
          onClick={onClose}
          aria-label="Close"
          style={{ lineHeight: 1 }}
        >
          ×
        </button>
      </div>
    </div>,
    document.getElementById("global-banner-root")!
  );
};