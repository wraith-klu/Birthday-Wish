"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TypingText from "@/components/TypingText";

const FLOWER_IMG = "flower.jpg";
const BG_IMG = "poster.jpg";

type Flower = {
  id: number;
  leftPct: number;
  sizePx: number;
  duration: number;
  delay: number;
  rotateStart: number;
};

type Spark = {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
};

export default function Surprise() {
  const poem = `My dearest Moonflower,

You are the hush between two heartbeats, 💗
the sunrise that reads my secret lines. ✨
If I could fold the sky into a letter,📜
I would gift it to you in trembling hands. 🤍

Your name is the echo my soul whispers, 🌙
a gentle warmth that never leaves. 💞
In you, every silence becomes poetry, ✒️
and every moment feels like home. 🏡💕

Forever yours.`;

  const [flowers, setFlowers] = useState<Flower[] | null>(null);
  const [sparks, setSparks] = useState<Spark[] | null>(null);

  useEffect(() => {
    const f: Flower[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      leftPct: Math.round((Math.random() * 86 + 2) * 1000) / 1000,
      sizePx: Math.round(20 + Math.random() * 40),
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 5,
      rotateStart: Math.round(Math.random() * 360),
    }));
    setFlowers(f);

    const s: Spark[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 800),
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
    setSparks(s);
  }, []);

  return (
    <main
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to enhance text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none"></div>

      {/* Floating Flowers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {flowers &&
          flowers.map((flower) => (
            <motion.img
              key={flower.id}
              src={FLOWER_IMG}
              alt="flower"
              className="absolute opacity-80 drop-shadow-xl"
              initial={{ y: -80, rotate: flower.rotateStart }}
              animate={{
                y: ["-80px", "110vh"],
                rotate: [flower.rotateStart, flower.rotateStart + 360],
              }}
              transition={{
                duration: flower.duration,
                repeat: Infinity,
                delay: flower.delay,
                ease: "linear",
              }}
              style={{
                left: `${flower.leftPct}%`,
                width: `${flower.sizePx}px`,
                height: `${flower.sizePx}px`,
                transformOrigin: "center",
              }}
            />
          ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparks &&
          sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute bg-white rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
              style={{
                left: s.x,
                top: s.y,
                width: 4,
                height: 4,
              }}
            />
          ))}
      </div>

      {/* Central Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 p-10 w-full max-w-2xl rounded-3xl shadow-2xl bg-black/40 backdrop-blur-xl border border-white/20"
      >
        {/* Birthday Title */}
        <motion.h1
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center text-5xl font-extrabold text-yellow-300 drop-shadow-lg"
        >
          🎉 Happy Birthday 🎉
        </motion.h1>

        {/* Poem Text */}
        <div className="mt-8 text-lg md:text-xl leading-relaxed text-white font-medium drop-shadow-sm">
          <TypingText text={poem} speed={30} />
        </div>

        {/* Back Home Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <button className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700 transition-all transform hover:scale-105">
              Back Home
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
