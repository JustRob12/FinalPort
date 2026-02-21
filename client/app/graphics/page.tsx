"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { Sun, Moon } from "lucide-react";

const graphicsImages = [
    "/Graphics/1.jpeg",
    "/Graphics/58th LOGO.png",
    "/Graphics/Buwan ng Wika.png",
    "/Graphics/INDEPENDENCE DAY.png",
    "/Graphics/PASAR NAMAN ATA KO.png",
    "/Graphics/TARRAGONA TRAILBLAZERS.png",
    "/Graphics/TOP DAVAO ORIENTAL JOY.png",
    "/Graphics/prelim4.png",
];

const tshirtImages = Array.from({ length: 17 }, (_, i) => `/Tshirts/${i + 1}.png`);

const allImages = [...graphicsImages, ...tshirtImages];

export default function GraphicsPage() {
    const { ref: toggleRef, toggleSwitchTheme, isDarkMode } = useModeAnimation({
        animationType: ThemeAnimationType.CIRCLE,
    });

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <div className="min-h-screen bg-white py-10 font-['Inter',sans-serif] text-black dark:bg-[#0a0a0a] dark:text-white overflow-x-hidden">

                {/* Fixed Corner Toggle */}
                <div className="fixed top-6 right-6 z-[110]">
                    <button
                        ref={toggleRef}
                        onClick={toggleSwitchTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-lg transition-all hover:scale-110 active:scale-95 dark:border-neutral-800 dark:bg-[#111111] dark:text-white"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                    </button>
                </div>

                <div className="mx-auto max-w-5xl px-4 relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                        >
                            <ChevronLeft size={14} />
                            Back to Home
                        </Link>
                        <h1 className="text-xl font-bold tracking-tight">Graphics Designs</h1>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {allImages.map((src, i) => (
                            <div
                                key={i}
                                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={src}
                                    alt={`Design ${i + 1}`}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white">
                                        {src.split('/').pop()?.replace('.png', '').replace('.jpeg', '')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
