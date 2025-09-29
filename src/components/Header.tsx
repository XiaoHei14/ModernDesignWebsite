'use client';
import { usePathname } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = 'flex z-30' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, offset]);

  let pathname = usePathname();
  const pageName = pathname === '/' ? '/Home' : pathname;

  return (
    <div
      ref={headerRef}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        userSelect: 'none',
      }}
      className={`${className} h-10 font-[PPSupplyMono]`} // ✅ 高度變高
    >
      {/* 拖曳點 */}
      <div
        onMouseDown={onMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        className="menu-drag menu-blur group relative w-8 max-xl:hidden pointer-events-auto flex items-center justify-center bg-black/30 backdrop-blur-md shadow-lg rounded-md mr-5"
      >
        <div className="svg-wrapper w-4 text-white opacity-20 xl:group-hover:opacity-100 transition-opacity duration-200 ease-out">
          <svg width="10" height="24" viewBox="0 0 10 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="6" y="10" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="6" y="20" width="4" height="4" rx="1" fill="currentColor" />
            <rect width="4" height="4" rx="1" fill="currentColor" />
            <rect y="10" width="4" height="4" rx="1" fill="currentColor" />
            <rect y="20" width="4" height="4" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>


      {/* Header 內容 */}
      <div className="h-full px-4 rounded-md flex items-center bg-black/30 backdrop-blur-md shadow-md">
        <span className="text-white text-sm ">C: {pageName}</span>
      </div>
    </div>
  );
}
