"use client";

import Hearts from "../components/Hearts";
import TypingText from "../components/TypingText";
import Gallery from "../components/Gallery";
import MusicPlayer from "../components/MusicPlayer";
import ConfettiToggle from "../components/ConfettiToggle";
import VideoHero from "../components/VideoHero";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const images = [
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpg",
    "/img4.jpeg",
    "/img5.jpeg",
  ];

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-6 gap-10 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 relative overflow-hidden">

      {/* Global Floating Hearts */}
      <Hearts />

      <div className="w-full max-w-6xl flex flex-col gap-14">

        {/* HERO VIDEO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <VideoHero />
        </motion.div>

        {/* ✨ MAGIC BIRTHDAY CARD ✨ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="card p-10 rounded-3xl bg-white/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,150,200,0.35)] border border-white/50"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-6xl font-extrabold text-center 
            bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 
            bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,120,180,0.6)]"
          >
            🌸 Happy Birthday, My Moonflower 🌸
          </motion.h2>

          {/* Typing Effect */}
          <div className="mt-8">
            <TypingText
              text={
                "On this day, the stars learned to whisper your name.\nEvery moment becomes poetry, every breath a soft melody."
              }
              speed={33}
            />
          </div>

          {/* Music Player Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-12"
          >
            <MusicPlayer src="/Forever.mp3" name="Love ♥" />
          </motion.div>

          {/* GALLERY SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-12"
          >
            <Gallery images={images} />
          </motion.div>

          {/* BUTTONS */}
          <div className="mt-12 flex justify-center gap-6">
            <Link href="/surprise">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full text-lg 
                bg-gradient-to-r from-pink-500 to-rose-500
                text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,100,150,0.9)] 
                transition-all"
              >
                Open the Letter 💌
              </motion.button>
            </Link>

            <Link href="/video">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="px-7 py-3 text-lg rounded-full 
                bg-white/90 text-pink-600 shadow-md 
                hover:bg-white transition-all"
              >
                Watch Scene 🎥
              </motion.button>
            </Link>
          </div>

          {/* CONFETTI */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12"
          >
            <ConfettiToggle />
          </motion.div>

          {/* Signature */}
          <p className="mt-10 text-center text-sm opacity-75 italic tracking-wide">
            — With all my heart, Wraith
          </p>
        </motion.div>
      </div>
    </main>
  );
}
