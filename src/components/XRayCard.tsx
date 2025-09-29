'use client';
import React, { useRef, useState, useEffect } from 'react';

interface XRayCardProps {
  initialPosition: { x: number; y: number };
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

export default function XRayCard({
  initialPosition,
  width = '400px',
  height = '250px',
  children,
}: XRayCardProps) {
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
  };

  return (
    <>
      {/* 全螢幕背景 */}
      <div className="fixed inset-0 -z-10">
        <video
          src="/chaewon-le-sserafim.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* 如果要用圖片就換成： */}
        {/* <img src="/images/bg.jpg" className="w-full h-full object-cover" /> */}
      </div>

      {/* 卡片玻璃窗 */}
      <div
        ref={cardRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          width,
          height,
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px) saturate(140%)',
          background: 'rgba(0, 0, 0, 0.3)',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <div className="p-4 text-white">{children}</div>
      </div>
    </>
  );
}
