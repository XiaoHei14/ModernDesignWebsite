'use client';
import React, { useState, useRef, useEffect } from 'react';

interface HudCardProps {
  initialPosition: { x: number; y: number };
  isActive: boolean;
  onActivate: () => void;
  children: React.ReactNode;
}

export default function HudCard({
  initialPosition,
  isActive,
  onActivate,
  children,
}: HudCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // 通知父層這張卡片被選中
    onActivate();
  };

  return (
    <div
        ref={cardRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          zIndex: isActive ? 40 : 1, // 選中時疊在最上
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          transform: isActive ? 'scale(1.02)' : 'scale(1)', // 選中時輕微放大
          boxShadow: isActive
            ? '0px 8px 20px rgba(0,0,0,0.6)'
            : '0px 4px 10px rgba(0,0,0,0.3)',
        }}    
    >
      <span className="text-gray-200 text-xs block mb-1">
        Y: {Math.round(position.y)} X: {Math.round(position.x)}
      </span>
      <div

        className="rounded-xl border border-white/20 backdrop-blur-md bg-black/30 p-4"
      >
        {children}
      </div>
    </div>
  );
}
