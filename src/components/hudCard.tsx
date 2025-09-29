'use client';
import React, { useRef, useState, useEffect } from 'react';

interface HudCardProps {
  className?: string;
  children?: React.ReactNode;
  initialPosition?: { x: number; y: number };
  onPositionChange?: (pos: { x: number; y: number }) => void;
}

export default function HudCard({
  className = '',
  children,
  initialPosition,
  onPositionChange,
}: HudCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // 延遲初始化到 client side 避免 SSR hydration mismatch
  useEffect(() => {
    const safeX = Math.min(initialPosition?.x || 0, window.innerWidth - 100); // 100 = 卡片預估寬度
    const safeY = Math.min(initialPosition?.y || 0, window.innerHeight - 100);
    setPosition({ x: safeX, y: safeY });
  }, [initialPosition]);

  // SSR 時不渲染
  if (!position) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const maxX = window.innerWidth - card.offsetWidth;
      const maxY = window.innerHeight - card.offsetHeight;

      let newX = e.clientX - startX;
      let newY = e.clientY - startY;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
      onPositionChange?.({ x: newX, y: newY });

      card.style.left = `${newX}px`;
      card.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      className={`absolute cursor-grab ${className}`}
      style={{ userSelect: 'none', left: position.x, top: position.y }}
    >
      {/* 顯示座標 */}
      <div className="absolute -top-4 left-0 text-xs text-white/70 pointer-events-none select-none">
        {`x: ${position.x}px, y: ${position.y}px`}
      </div>
      <div>{children}</div>
    </div>
  );
}
