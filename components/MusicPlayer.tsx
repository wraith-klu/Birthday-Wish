"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart } from "lucide-react";

export default function MusicPlayer({ src = "/Forever.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // 🌸 Heart positions (generated only on client)
  const [heartPositions, setHeartPositions] = useState<{ top: number; left: number }[]>([]);

  useEffect(() => {
    const positions = Array.from({ length: 6 }, () => ({
      top: Math.random() * 220 - 20,
      left: Math.random() * 220 - 20,
    }));
    setHeartPositions(positions);
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
      className="flex flex-col items-center mt-14 mb-10"
    >
      {/* ✨ Romantic Title with Glow */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-pink-300 drop-shadow-[0_0_18px_rgba(255,120,200,0.9)] tracking-wide"
      >
        Forever — Just for You
      </motion.h2>

      {/* 💗 Floating Hearts Around Vinyl */}
      <div className="relative w-60 h-60 mt-10">
        {heartPositions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [-15, -25, -15],
              x: [0, 10, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i * 0.5,
            }}
            className="absolute"
            style={{ top: pos.top, left: pos.left }}
          >
            <Heart className="text-pink-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(255,80,180,0.7)]" />
          </motion.div>
        ))}
      </div>

      {/* 🌸 Rotating Soft-Glow Vinyl */}
      <motion.div
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 8, ease: "linear" }}
        className="relative mt-10 w-60 h-60"
      >
        {/* Outer Glow */}
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-full bg-pink-400/20 blur-3xl"
        />

        {/* Vinyl Disc */}
        <div className="w-60 h-60 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-[6px] border-pink-300 shadow-[0_0_40px_rgba(255,120,200,0.8)] flex items-center justify-center relative overflow-hidden">
          {/* Inner Glow Ring */}
          <div className="absolute w-40 h-40 rounded-full border-2 border-pink-400/40 blur-[2px]"></div>

          {/* Vinyl Center */}
          <div className="w-18 h-18 rounded-full bg-pink-400 shadow-[0_0_25px_rgba(255,120,200,1)]"></div>
        </div>
      </motion.div>

      {/* 🔥 Play / Pause Button with Luxe Glow */}
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

      {/* 🎵 Audio Element */}
      <audio ref={audioRef} src={src}></audio>

      {/* ✍️ Soft Romantic Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="mt-8 text-center text-pink-200 text-sm italic tracking-wide opacity-90"
      >
        This melody spins for you — like my heart does.
      </motion.p>
    </motion.div>
  );
}
