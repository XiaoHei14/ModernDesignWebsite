'use client';
import React from 'react';

interface SkillCardProps {
  onClose?: () => void;
}

export default function SkillCard({ onClose }: SkillCardProps) {
  return (
    <div className="w-80 p-4  rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white font-bold text-lg">Skills</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
        >
          ✕
        </button>
      </div>
      <ul className="text-white/90 list-disc list-inside space-y-1">
        <li>React / Next.js</li>
        <li>Node.js / Express</li>
        <li>TypeScript / JavaScript</li>
        <li>Penetration Testing</li>
        <li>Cloud (AWS, GCP)</li>
      </ul>
    </div>
  );
}
