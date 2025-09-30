'use client';
import React, { useRef, useState, useEffect } from 'react';

interface XRayCardProps {
  width?: number;
  height?: number;
  initialPosition?: { x: number; y: number };
  perspective?: number;
  backgroundImage: string;
  className?: string;
}


export default function XRayCard({
  width = 300,
  height = 200,
  initialPosition = { x: 100, y: 100 },
  perspective = 20,
  backgroundImage,
  className = '',
}: XRayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false); // 只在 client 渲染
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 拖曳
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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

  // 計算透視視差，只在 client
  const getBgOffset = () => {
    if (!isClient) return { dx: 0, dy: 0 };
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = (mousePos.x - centerX) / perspective;
    const dy = (mousePos.y - centerY) / perspective;
    return { dx, dy };
  };

  const { dx, dy } = getBgOffset();


  return (
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
        overflow: 'hidden',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px) saturate(140%)',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
      }}
      className={className}
    >
      {/* 背景只在卡片內顯示 */}
      <div
        className="w-full h-full "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: `${isClient ? window.innerWidth : 1920}px ${
            isClient ? window.innerHeight : 1080
          }px`,
          backgroundPosition: `${-position.x - dx}px ${-position.y - dy}px`,
          transition: isDragging ? 'none' : 'background-position 0.1s ease',
        }}
      />
    </div>
  );
}
