"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
    {
        id: 1,
        badge: "☀️ SUMMER SALE 50% OFF 🏷️",
        heading1: "Feel the",
        highlight: "Summer Vibes",
        heading2: "Refresh Your Style with SunCart",
        desc: "Discover our curated collection of premium summer essentials designed to make every beach day, sunset stroll, and vacation moment unforgettable.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
            "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400",
            "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        ],
        bg: "from-orange-50 to-amber-100",
    },
    {
        id: 2,
        badge: "🌊 NEW ARRIVALS 2025",
        heading1: "Stay Cool &",
        highlight: "Look Amazing",
        heading2: "Your Summer Starts Here",
        desc: "Shop our handpicked selection of sun care, accessories, and clothing — everything you need for the hottest season of the year.",
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400",
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
        ],
        bg: "from-sky-50 to-cyan-100",
    },
    {
        id: 3,
        badge: "🎉 FREE SHIPPING OVER $50",
        heading1: "Sun, Sand &",
        highlight: "Pure Style",
        heading2: "Gear Up for the Best Summer",
        desc: "From UV-protection sunglasses to reef-safe sunscreen — we bring the best brands to your doorstep with fast, reliable delivery.",
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
            "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=400",
            "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400",
        ],
        bg: "from-pink-50 to-rose-100",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
    const next = () => setCurrent((p) => (p + 1) % slides.length);

    return (
        <div className="relative w-full overflow-hidden h-120 sm:h-130 md:h-140 lg:h-155">

            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                className={`absolute inset-0 w-full h-full bg-linear-to-br ${slide.bg}
            transition-opacity duration-700 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-10 sm:py-12 lg:py-0">

                        {/* ── Left Content ── */}
                        <div className="flex-1 z-10 w-full text-center lg:text-left">

                            {/* Badge */}
                            <span className="inline-block bg-amber-100 border border-amber-300 text-amber-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-4 tracking-wide">
                                {slide.badge}
                            </span>

                            {/* Heading */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
                                {slide.heading1}{" "}
                                <span className="text-orange-500 italic">{slide.highlight}</span>
                            </h1>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-snug">
                                {slide.heading2}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                                {slide.desc}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start">
                                <a
                                    href="/products"
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition shadow-md text-sm sm:text-base"
                                >
                                    Shop Now
                                </a>
                                <a
                                    href="/products"
                                    className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition text-sm sm:text-base"
                                >
                                    Explore Deals
                                </a>
                            </div>
                        </div>

                        {/* ── Right — Image Grid (tablet+) ── */}
                        <div className="flex-1 w-full hidden sm:flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
                                {slide.images.map((src, i) => (
                                    <div
                                        key={i}
                                        className={`relative rounded-2xl overflow-hidden shadow-lg
                        h-28 sm:h-36 md:h-40 lg:h-44
                        ${i % 2 === 0 ? "mt-0" : "mt-5 sm:mt-6"}`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`slide-${index}-img-${i}`}
                                            fill
                                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Mobile — Single Featured Image ── */}
                        <div className="sm:hidden w-full flex justify-center">
                            <div className="relative w-60 h-40 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={slide.images[0]}
                                    alt="featured"
                                    fill
                                    sizes="240px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            ))}

            {/* ── Arrows ── */}
            <button
                onClick={prev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-gray-700 text-xl w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow flex items-center justify-center"
            >
                ‹
            </button>
            <button
                onClick={next}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-gray-700 text-xl w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow flex items-center justify-center"
            >
                ›
            </button>

            {/* ── Dots ── */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-orange-500" : "w-2 bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}