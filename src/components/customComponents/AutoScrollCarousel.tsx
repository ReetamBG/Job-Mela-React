"use client";

import { useEffect, useRef } from "react";

export default function AutoScrollCarousel({
  children,
  speed = 1.5,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let frameId: number;

    const scroll = () => {
      if (!container) return;

      container.scrollLeft += speed;

      // When halfway through duplicated children, reset scroll position to original
      if (
        container.scrollLeft >=
        container.scrollWidth / 2
      ) {
        container.scrollLeft = 0;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frameId);
  }, [speed]);

  return (
    <div
      ref={scrollRef}
      className="auto-scroll-wrapper hide-scrollbar"
    >
      {/* Duplicate children to fake infinite loop */}
      <div className="flex gap-6 lg:gap-12">
        {children}
        {children}
      </div>
    </div>
  );
}
