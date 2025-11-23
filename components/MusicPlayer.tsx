"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart } from "lucide-react";

export default function MusicPlayer({ src = "/Forever.mp3", name = "Love ♥" }: { src?: string; name?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // 🌸 Floating hearts
  const [heartPositions, setHeartPositions] = useState<{ top: number; left: number }[]>([]);
  // ✨ Galaxy sparks
  const [sparkPositions, setSparkPositions] = useState<{ top: number; left: number; size: number }[]>([]);
  // 🌸 Cherry petals
  const [petalPositions, setPetalPositions] = useState<{ top: number; left: number; rotate: number; scale: number }[]>([]);

  useEffect(() => {
    // Hearts — increased from 6 → 20
    setHeartPositions(Array.from({ length: 20 }, () => ({
      top: Math.random() * 220 - 20,
      left: Math.random() * 220 - 20,
    })));

    // Galaxy sparks
    setSparkPositions(Array.from({ length: 20 }, () => ({
      top: Math.random() * 260 - 30,
      left: Math.random() * 260 - 30,
      size: Math.random() * 4 + 2,
    })));

    // Cherry petals
    setPetalPositions(Array.from({ length: 15 }, () => ({
      top: Math.random() * 200 - 50,
      left: Math.random() * 200 - 50,
      rotate: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
    })));
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center mt-14 mb-10 relative"
      style={{
        background: "linear-gradient(135deg, #ffb6c1, #8a2be2, #1e1e3f)",
        backgroundSize: "400% 400%",
        animation: "bgGradient 15s ease infinite",
      }}
    >
      {/* 💖 Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-pink-300 drop-shadow-[0_0_18px_rgba(255,120,200,0.9)] tracking-wide"
      >
        Forever — Just for You
      </motion.h2>

      {/* Floating Hearts & Galaxy Sparks & Cherry Petals */}
      <div className="relative w-60 h-60 mt-10">
        {/* Hearts */}
        {heartPositions.map((pos, i) => (
          <motion.div
            key={`heart-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [-15, -25, -15],
              x: [0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 4 + i * 0.3 }}
            className="absolute"
            style={{ top: pos.top, left: pos.left }}
          >
            <Heart className="text-pink-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(255,80,180,0.7)]" />
          </motion.div>
        ))}

        {/* Galaxy Sparks */}
        {sparkPositions.map((spark, i) => (
          <motion.div
            key={`spark-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: Math.random() * 2, ease: "easeInOut" }}
            className="absolute rounded-full bg-white/80 blur-sm"
            style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size }}
          />
        ))}

        {/* Cherry Petals */}
        {petalPositions.map((petal, i) => (
          <motion.div
            key={`petal-${i}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ y: 260, rotate: petal.rotate, opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 6 + Math.random() * 3, delay: Math.random() * 2, ease: "linear" }}
            className="absolute w-4 h-2 bg-pink-300 rounded-full blur-sm"
            style={{
              top: petal.top,
              left: petal.left,
              transform: `rotate(${petal.rotate}deg) scale(${petal.scale})`,
            }}
          />
        ))}
      </div>

      {/* Vinyl with glow, heartbeat & name orbit */}
      <motion.div
        animate={{ rotate: playing ? 360 : 0, scale: playing ? [1, 1.02, 1] : 1 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 8, ease: "linear" }}
        className="relative mt-10 w-60 h-60"
      >
        {/* Outer Glow Trail */}
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-full bg-pink-400/20 blur-3xl"
        />

        {/* Vinyl Disc */}
        <div className="w-60 h-60 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-[6px] border-pink-300 shadow-[0_0_40px_rgba(255,120,200,0.8)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-40 h-40 rounded-full border-2 border-pink-400/40 blur-[2px]"></div>
          <div className="w-18 h-18 rounded-full bg-pink-400 shadow-[0_0_25px_rgba(255,120,200,1)]"></div>

          {/* Neon Orbiting Name */}
          <motion.div
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <span className="absolute text-pink-200 text-sm font-bold drop-shadow-[0_0_12px_rgba(255,150,220,0.8)]">
              {name}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Play / Pause Button */}
      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
        className="mt-10 p-5 rounded-full bg-white/10 backdrop-blur-xl border border-pink-200/40 shadow-[0_0_25px_rgba(255,120,200,0.6)] hover:shadow-[0_0_40px_rgba(255,120,200,1)] transition-all duration-300"
      >
        {playing ? (
          <Pause className="w-10 h-10 text-pink-200 drop-shadow-[0_0_10px_white]" />
        ) : (
          <Play className="w-10 h-10 text-pink-200 drop-shadow-[0_0_10px_white]" />
        )}
      </motion.button>

      {/* Audio */}
      <audio ref={audioRef} src={src}></audio>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="mt-8 text-center text-pink-200 text-sm italic tracking-wide opacity-90"
      >
        This melody spins for you — like my heart does.
      </motion.p>

      {/* Background Gradient Animation */}
      <style>{`
        @keyframes bgGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
}
