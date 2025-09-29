'use client';
import React, { useState } from 'react';
import HudCard from './hudCard';

export default function HudCardContainer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      <HudCard
        id="card1"
        isActive={activeId === 'card1'}
        onActivate={() => setActiveId('card1')}
        initialPosition={{ x: 100, y: 100 }}
      >
        <h2 className="text-white">Card 1</h2>
      </HudCard>

      <HudCard
        id="card2"
        isActive={activeId === 'card2'}
        onActivate={() => setActiveId('card2')}
        initialPosition={{ x: 300, y: 150 }}
      >
        <h2 className="text-white">Card 2</h2>
      </HudCard>
    </>
  );
}
