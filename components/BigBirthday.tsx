"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function LoveStrip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full py-6 bg-black overflow-hidden">

      {/* Floating Hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500"
            initial={{
              y: 300,
              x: Math.random() * 300 - 150,
              opacity: 0,
            }}
            animate={{
              y: -300,
              x: Math.random() * 300 - 150,
              opacity: [0, 1, 0.5, 0],
              scale: [0.5, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Bokeh Circles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-xl"
            style={{
              width: 40 + Math.random() * 40,
              height: 40 + Math.random() * 40,
              top: Math.random() * 300,
              left: Math.random() * 300,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 80,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: "-=20",
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Center Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-50 flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full shadow-lg"
      >
        {open ? "Close" : "Love ♥"}
        <Heart className="w-5 h-5 text-red-500" />
      </motion.button>

      {/* Opening Note */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-[-80px] w-[92%] max-w-md bg-white/90 text-black rounded-xl p-4 shadow-2xl mt-4 z-40"
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">A Note</p>
            <Sparkles className="text-yellow-500" />
          </div>

          <p className="mt-2 text-sm opacity-80">
            This space is yours. Add anything you want — a message, a memory, a surprise.
          </p>
        </motion.div>
      )}
    </div>
  );
}
