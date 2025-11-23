"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function ConfettiToggle() {
  const [active, setActive] = useState(false);
  const { width, height } = useWindowSize();

  // 🎉 Auto stop after 6 seconds
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setActive(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-6 mt-6">

      {/* 🎆 Glowing Button */}
      <button
        onClick={() => setActive(true)}
        className="
          px-8 py-3 text-xl font-semibold rounded-full
          bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 
          text-white shadow-xl hover:scale-105 active:scale-95
          transition-all duration-300
          animate-glow
        "
      >
    
        🎉 Celebrate Now!
      </button>

      {/* Confetti */}
      {active && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={350}
          gravity={0.25}
          recycle={false}
        />
      )}
    </div>
  );
}
