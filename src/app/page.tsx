'use client';
import React, { useState, useEffect } from 'react';
import HudCard from '@/components/hudCard';
import Profile from '@/components/Profile';
import SkillCard from '@/components/SkillCard';
import Headers from '@/components/Header';
import { usePathname } from 'next/navigation';
import XRayCard from '@/components/XRayCard';

export default function Home() {
  const Path = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [showSkillCard, setShowSkillCard] = useState(false);

  // 🔑 集中管理哪張卡片在最上層
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Headers />

      {isDesktop && (
        <HudCard
          id="profile"
          initialPosition={{ x: 400, y: 100 }}
          isActive={activeCard === 'profile'}
          onActivate={() => setActiveCard('profile')}
        >
          <Profile onOpenSkill={() => setShowSkillCard(true)} />
        </HudCard>
      )}

      {/* SkillCard 彈出在頁面上 */}
      {showSkillCard && isDesktop && (
        <HudCard
          id="skill"
          initialPosition={{ x: 1000, y: 40 }}
          isActive={activeCard === 'skill'}
          onActivate={() => setActiveCard('skill')}
        >
          <SkillCard onClose={() => setShowSkillCard(false)} />
        </HudCard>
      )}

    </main>
  );
}
