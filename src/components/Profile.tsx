'use client';
import Image from 'next/image';
import React from 'react';

interface ProfileProps {
  onOpenSkill?: () => void;
}

export default function Profile({ onOpenSkill }: ProfileProps) {
  const [hovertype, setHovertype] = React.useState(false);
  const TagRef = React.useRef<HTMLSpanElement>(null);

  return (
    <div className="border border-white w-full p-4 bg-[#1c1b1bff] grid gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 左邊頭像 */}
        <div className="relative group flex-shrink-0">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-105 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-200">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/chaewon.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 右邊文字 */}
        <div className="flex flex-col justify-center text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
            DaoHui
          </h1>
          <span
            ref={TagRef}
            onMouseEnter={() => setHovertype(true)}
            onMouseLeave={() => setHovertype(false)}
            className="text-[#b891f5] font-bold cursor-pointer select-none transition-colors duration-300 text-sm sm:text-base mt-1"
          >
            {hovertype ? 'i love chaewon 💜' : '@daohuirealm'}
          </span>
          <p className="text-sm sm:text-base text-white/90 mt-2">
            Full Stack Developer & Web Penetration Tester
          </p>
          <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed max-w-xs sm:max-w-md">
            Full Stack Developer with a passion for secure and scalable applications.
            Skilled in React, Node.js, and cloud platforms, bridging development and
            penetration testing to create resilient solutions.
          </p>
        </div>
      </div>

      {/* 按鈕區 */}
      <div className="mt-4 flex justify-center sm:justify-start">
        <button
          onClick={onOpenSkill}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
        >
          Open Skill Card
        </button>
      </div>
    </div>
  );
}
