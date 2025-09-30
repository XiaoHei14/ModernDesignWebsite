'use client';
import { usePathname } from 'next/navigation';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = 'flex z-50' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const validPaths = ['/', '/Works', '/About', '/Studio', '/Contact'];


  const linkList = [
    { link: '/', name: 'Home' },
    { link: '/Works', name: 'Works' },
    { link: '/About', name: 'About' },
    { link: '/Studio', name: 'Studio' },
    { link: '/Contact', name: 'Contact', isPopup: true },
  ];

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect) setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    },
    [dragging, offset]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const pathname = usePathname();
  const pathLink = `C:/DaoHui/${
    validPaths.includes(pathname) ? (pathname === '/' ? 'Home' : pathname.slice(1)) : '404'
  }`;
  // 點擊外部收起
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={headerRef}
      style={{ position: 'absolute', left: pos.x, top: pos.y, userSelect: 'none' }}
      className={`${className} font-[PPSupplyMono]`}
    >
      {/* 拖曳點 */}
      <div
        onMouseDown={onMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        className="menu-drag menu-blur group relative w-8 max-xl:hidden flex items-center justify-center bg-black/30 backdrop-blur-md shadow-lg rounded-md mr-5"
      >
        <svg width="10" height="24" viewBox="0 0 10 24" fill="none">
          <rect x="6" width="4" height="4" rx="1" fill="currentColor" />
          <rect x="6" y="10" width="4" height="4" rx="1" fill="currentColor" />
          <rect x="6" y="20" width="4" height="4" rx="1" fill="currentColor" />
          <rect width="4" height="4" rx="1" fill="currentColor" />
          <rect y="10" width="4" height="4" rx="1" fill="currentColor" />
          <rect y="20" width="4" height="4" rx="1" fill="currentColor" />
        </svg>
      </div>

      {/* Header pathLink + dropdown */}
      <div className="relative">
        {/* pathLink button */}
        <div
          className="menu-tab-button flex px-4 py-2 justify-between items-center cursor-pointer bg-black/30 backdrop-blur-md rounded-md shadow-md relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-tab-text text-white">
            {pathLink} <span className="blink-char"> \</span>
          </span>
          <span className="ml-2 text-white">{menuOpen ? '-' : '+'}</span>
        </div>

        {/* dropdown */}
        {menuOpen && (
          <div className="menu-dropdown absolute top-full left-0 w-full mt-1 z-50 bg-black/30 backdrop-blur-md">
            <div
              className={`menu-dropdown-wrapper flex flex-col px-4 pt-2 pb-2 rounded-md shadow-lg ${
                pathname === '/' 
                  ? 'bg-white/20 text-black'  // Home頁面改成半透明白底，文字改黑色
                  : 'bg-black/30 backdrop-blur-md text-white' // 其他頁面保持原本黑色
              }`}
            >
            {linkList.map((link) =>
              link.isPopup ? (
                <div
                  key={link.name}
                  className={`menu-dropdown-item cursor-pointer px-3 py-2 rounded-md ${
                    pathname === '/' ? 'hover:bg-black/10 text-black' : 'hover:bg-white/10 text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.link}
                  className={`menu-dropdown-item px-3 py-2 rounded-md ${
                    pathname === '/' ? 'hover:bg-black/10 text-black' : 'hover:bg-white/10 text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
