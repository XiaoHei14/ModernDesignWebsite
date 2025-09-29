'use client';
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
    const cornersRef = useRef<HTMLDivElement[]>([]);

    const setCornerRef = (el: HTMLDivElement) => {
        if (el && !cornersRef.current.includes(el)) {
            cornersRef.current.push(el);
        }
    };

    useEffect(() => {
        const tl = gsap.timeline();

        cornersRef.current.forEach((corner) => {
            const rect = corner.getBoundingClientRect();
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;

            // 先移到中央並縮小到 0
            gsap.set(corner, {
                x: centerX - rect.left,
                y: centerY - rect.top,
                scale: 0,
                opacity: 0
            });
        });

        // 從中央放大並移動到角落
        tl.to(
            cornersRef.current,
            {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power1.in"
            }
        );
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen relative bg-[#171717]">
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

            {/* 四個角落框 */}
            {/** 左上 */}
            <div ref={setCornerRef} className="absolute top-12 left-12 w-8 h-8 origin-center">
                <div className="absolute top-0 left-0 w-4 h-0.5 bg-white"></div>
                <div className="absolute top-0 left-0 w-0.5 h-4 bg-white"></div>
            </div>
            {/** 右上 */}
            <div ref={setCornerRef} className="absolute top-12 right-12 w-8 h-8 origin-center">
                <div className="absolute top-0 right-0 w-4 h-0.5 bg-white"></div>
                <div className="absolute top-0 right-0 w-0.5 h-4 bg-white"></div>
            </div>
            {/** 左下 */}
            <div ref={setCornerRef} className="absolute bottom-12 left-12 w-8 h-8 origin-center">
                <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-white"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-white"></div>
            </div>
            {/** 右下 */}
            <div ref={setCornerRef} className="absolute bottom-12 right-12 w-8 h-8 origin-center">
                <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white"></div>
            </div>

            {/* 命令 */}
            <div>
                <span></span>
            </div>
        </main>
    );
}
