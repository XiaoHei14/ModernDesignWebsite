'use client';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MouseLayout({ children }: LayoutProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX + 12, // 右下偏移，避免蓋到滑鼠
          y: e.clientY + 12,
          duration: 0.25, // 增加一點延遲
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {children}

      {/* 跟隨滑鼠的座標顯示 */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2px",
          transform: "translate(-50%, -50%)",
        }}
        className="font-[PPSupplyMono] text-[10px] font-bold tracking-wide text-white/80 select-none"
      >
        <span>X: {mousePos.x}px</span>
        <span>Y: {mousePos.y}px</span>
      </div>
    </div>
  );
}
