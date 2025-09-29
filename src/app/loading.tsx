'use client';
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
    const boxRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Step 1: 中心點 → 水平線
        tl.to(boxRef.current, {
            width: 120,
            height: 4,
            duration: 0.5,
            ease: "power2.out",
            transformOrigin: "center center",
        });

        // Step 2: 線 → 視窗框
        tl.to(boxRef.current, {
            width: "50%",
            height: "50%",
            borderRadius: 0,
            duration: 0.6,
            ease: "power3.out",
        });

        // Step 3: Header & Content 淡入
        tl.to(
            [headerRef.current, contentRef.current],
            { opacity: 1, duration: 0.4, stagger: 0.1, ease: "power1.out" },
            "-=0.2"
        );

        // Step 4: 進度條動畫
        if (progressRef.current) {
            const progressBar = progressRef.current.querySelector<HTMLDivElement>("div");
            if (progressBar) {
                gsap.to(progressBar, {
                    width: "100%",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }
        }
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen relative ">
            {/* 視窗框 */}
            <div
                ref={boxRef}
                className="border rounded-md flex flex-col overflow-hidden relative"
                style={{ width: 0, height: 0 }}
            >
                {/* Header */}
                <div
                    ref={headerRef}
                    className="border-b  text-white w-full flex justify-between items-center px-4 py-2 opacity-0"
                >
                    <span className="font-semibold tracking-wide">Loading</span>
                    <div className="flex gap-2">
                        <button className="w-5 h-5 flex items-center justify-center border border-white text-xs leading-none hover:bg-white hover:text-black transition">
                            口
                        </button>
                        <button className="w-5 h-5 flex items-center justify-center border border-white text-xs leading-none hover:bg-white hover:text-black transition">
                            X
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="flex-1 flex items-center justify-center p-4 opacity-0"
                >
                    {/* 進度條 */}
                    <div
                        ref={progressRef}
                        className="relative w-100 h-1 bg-gray-200 rounded overflow-hidden"
                    >
                        <div className="absolute left-0 top-0 h-full w-0 bg-gray-400"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
