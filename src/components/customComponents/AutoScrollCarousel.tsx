import React from "react";

export default function AutoScrollCarousel({
  children,
  speed = 20, // duration in seconds
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex w-max animate-scroll whitespace-nowrap"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        {children}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation-name: scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
