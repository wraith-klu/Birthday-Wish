"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TypingText from "@/components/TypingText";

/**
 * NOTE: this uses the uploaded local file path as the flower image.
 * Your environment / deploy tool will translate this path to a web URL.
 */
const FLOWER_IMG = "flower.jpg";

type Flower = {
  id: number;
  leftPct: number;      // percent from left (0..100)
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

You are the hush between two heartbeats,
the sunrise that reads my secret lines.
If I could fold the sky into a letter,
I would gift it to you in trembling hands.

Forever yours.`;

  // client-only generated arrays (no randomness during SSR)
  const [flowers, setFlowers] = useState<Flower[] | null>(null);
  const [sparks, setSparks] = useState<Spark[] | null>(null);

  useEffect(() => {
    // Generate stable-ish random values only on the client
    const f: Flower[] = Array.from({ length: 14 }).map((_, i) => {
      return {
        id: i,
        leftPct: Math.round((Math.random() * 86 + 2) * 1000) / 1000, // 2%..88%
        sizePx: Math.round(18 + Math.random() * 36), // 18..54 px
        duration: 12 + Math.random() * 8, // 12..20s
        delay: Math.random() * 3, // 0..3s
        rotateStart: Math.round(Math.random() * 360),
      };
    });
    setFlowers(f);

    const s: Spark[] = Array.from({ length: 20 }).map((_, i) => {
      return {
        id: i,
        x: Math.round(Math.random() * 1000),
        y: Math.round(Math.random() * 800),
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      };
    });
    setSparks(s);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* -- Floating Flowers (render only after client has generated positions) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {flowers &&
          flowers.map((flower) => (
            <motion.img
              key={flower.id}
              src={FLOWER_IMG}
              alt="flower"
              className="absolute opacity-70"
              // initial position (y above viewport)
              initial={{ y: -60, rotate: flower.rotateStart }}
              // animate falling down and rotating
              animate={{
                y: ["-60px", "110vh"],
                rotate: [flower.rotateStart, flower.rotateStart + 360],
              }}
              transition={{
                duration: flower.duration,
                repeat: Infinity,
                delay: flower.delay,
                ease: "linear", // valid easing
              }}
              // style relies only on stable values produced after mount
              style={{
                left: `${flower.leftPct}%`,
                width: `${flower.sizePx}px`,
                height: `${flower.sizePx}px`,
                transformOrigin: "center",
              }}
            />
          ))}
      </div>

      {/* -- Sparkles (render only after client has generated positions) */}
      <div className="absolute inset-0 pointer-events-none">
        {sparks &&
          sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut", // valid easing
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

      {/* -- Central Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 p-10 w-full max-w-2xl rounded-3xl shadow-2xl bg-white/30 backdrop-blur-xl border border-white/40"
      >
        {/* Birthday Title */}
        <motion.h1
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center text-5xl font-extrabold text-pink-700 drop-shadow-lg"
        >
          🎉 Happy Birthday 🎉
        </motion.h1>

        <div className="mt-8 text-lg leading-relaxed text-purple-900 font-medium">
          <TypingText text={poem} speed={30} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <button className="px-6 py-3 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700 transition">
              Back Home
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
