"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfettiToggle() {
  const [active, setActive] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const { width, height } = useWindowSize();
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (active) {
      setShowNote(true);
      const timer = setTimeout(() => {
        setActive(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-6 mt-6 relative">
      {/* Celebrate Button */}
      <button
        onClick={() => setActive(true)}
        className="px-8 py-3 text-xl font-semibold rounded-full
          bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 
          text-white shadow-xl hover:scale-105 active:scale-95
          transition-all duration-300 animate-glow"
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

      {/* Image + Note Row */}
      <div className="flex items-center gap-4 mt-8">
        {/* Image */}
        <div
          ref={imgRef}
          className="relative shadow-xl rounded-xl overflow-hidden"
        >
          <img
            src="/poster.jpg"
            alt="Celebration"
            className="w-[280px] md:w-[360px] rounded-xl"
          />
        </div>

        {/* NOTE Floating on Right Middle */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-3 rounded-xl shadow-xl text-lg font-bold
                bg-white/40 backdrop-blur-md border border-white/30
                text-transparent bg-clip-text
                bg-gradient-to-r from-pink-500 via-purple-600 to-red-500
                animate-pulse-slow"
            >
              You make everything magical ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
