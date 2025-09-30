'use client';
import React, { useState, useEffect } from 'react';
import HeroPage from '@/components/HeroPage';
import Section from '@/components/Section';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
  }, []);
  return (
    <main className=" w-full">
      <HeroPage />
      <Section/>
    </main>
  );
}
