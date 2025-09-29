'use client';
import React from 'react';

interface FullBackgroundProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  className?: string;
}

export default function FullBackground({
  backgroundImage,
  backgroundVideo,
  className = '',
}: FullBackgroundProps) {
  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}>
      {backgroundVideo ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600" />
      )}
    </div>
  );
}
