'use client';
import React, { useState, useEffect } from 'react';
import HudCard from '@/components/hudCard';
import Profile from '@/components/Profile';
import SkillCard from '@/components/SkillCard';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showSkillCard, setShowSkillCard] = useState(false);

  // 判斷桌面環境
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {isDesktop && (
        <HudCard initialPosition={{ x: 400, y: 100 }}>
          <Profile onOpenSkill={() => setShowSkillCard(true)} />
        </HudCard>
      )}

      {/* SkillCard 彈出在頁面上 */}
      {showSkillCard && isDesktop && (
        <HudCard initialPosition={{ x: 1000, y: 40 }}>
          <SkillCard onClose={() => setShowSkillCard(false)} />
        </HudCard>
      )}
    </main>
  );
}
