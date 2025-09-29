'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HudBox {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'scan' | 'data' | 'warning' | 'status';
}

export default function HudBackground() {
  const [boxes, setBoxes] = useState<HudBox[]>([]);
  const [date, setDate] = useState<string>('');
  const [display, setDisplay] = useState<string>('');
  const [browser, setBrowser] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // 日期和時間更新
    const updateTime = () => {
      const now = new Date();
      setDate(now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }));
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // 螢幕解析度
    setDisplay(`${window.innerWidth}x${window.innerHeight}`);

    // 瀏覽器偵測
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) setBrowser('CHROME');
    else if (ua.includes('Firefox')) setBrowser('FIREFOX');
    else if (ua.includes('Safari') && !ua.includes('Chrome')) setBrowser('SAFARI');
    else if (ua.includes('Edg')) setBrowser('EDGE');
    else setBrowser('UNKNOWN');
  }, []);


  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 網格背景 */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#e9d4ff28 1px, transparent 1px),
              linear-gradient(90deg, #e9d4ff28 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>


      {/* 角落定位框 */}
      <div className="absolute top-12 left-12 w-8 h-8">
        <div className="absolute top-0 left-0 w-4 h-0.5 bg-white"></div>
        <div className="absolute top-0 left-0 w-0.5 h-4 bg-white"></div>
      </div>
      <div className="absolute top-12 right-12 w-8 h-8">
        <div className="absolute top-0 right-0 w-4 h-0.5 bg-white"></div>
        <div className="absolute top-0 right-0 w-0.5 h-4 bg-white"></div>
      </div>
      <div className="absolute bottom-12 left-12 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-white"></div>
      </div>
      <div className="absolute bottom-12 right-12 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white"></div>
      </div>




      {/* 系統資訊 - 左下角 */}
      <motion.div 
        className="absolute bottom-14 left-11 px-11 py-3  rounded-lg"
      >
        <div className="text-xs text-gray-400/80 font-mono space-y-1 select-none">
          <div>DATE: {date || 'LOADING...'}</div>
          <div>TIME: {time || 'LOADING...'}</div>
          <div>DISPLAY: {display || 'DETECTING...'}</div>
          <div>CLIENT: {browser || 'UNKNOWN'}</div>

          {/* ACTIVE CONNECTION */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-400"
          >
            ● ACTIVE CONNECTION
          </motion.div>

          {/* 科技風 Loading */}
          {!date && !time && (
            <div className="flex space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-cyan-400 rounded-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    delay: i * 0.2,
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>


    </div>
  );
}