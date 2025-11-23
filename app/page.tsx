"use client";

import Hearts from "../components/Hearts";
import TypingText from "../components/TypingText";
import Gallery from "../components/Gallery";
import MusicPlayer from "../components/MusicPlayer";
import ConfettiToggle from "../components/ConfettiToggle";
import VideoHero from "../components/VideoHero";
import Link from "next/link";

export default function Home() {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg"
  ];

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-6 gap-8 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      
      {/* Floating Hearts */}
      <Hearts />

      <div className="w-full max-w-6xl flex flex-col gap-10">

        {/* Video Hero Section */}
        <VideoHero />

        {/* Main Birthday Card */}
        <div className="card p-10 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/50">

          <h2 className="text-4xl font-extrabold text-center text-pink-600 drop-shadow">
            🌸 Happy Birthday, My Moonflower 🌸
          </h2>

          {/* Typing Text Section */}
          <div className="mt-6">
            <TypingText
              text={
                "On this day the stars learned to whisper your name.\nEach breath becomes a poem, every step a song."
              }
              speed={35}
            />
          </div>

          {/* 🔥 NEW BEAUTIFUL MUSIC SECTION (Forever.mp3) */}
          <div className="mt-10">
            <MusicPlayer src="/Forever.mp3" />
          </div>

          {/* Gallery Section */}
          <div className="mt-10">
            <Gallery images={images} />
          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-6">
            <Link href="/surprise">
              <button className="btn-primary text-lg px-6 py-3 rounded-full">
                Open the Letter 💌
              </button>
            </Link>

            <Link href="/video">
              <button className="px-6 py-3 text-lg rounded-full bg-white/90 text-pink-600 shadow-md hover:bg-white transition">
                Watch Scene 🎥
              </button>
            </Link>
          </div>

          {/* Confetti */}
          <div className="mt-10">
            <ConfettiToggle />
          </div>

          <p className="mt-8 text-center text-sm opacity-80">
            — With all my heart, Wraith
          </p>
        </div>
      </div>
    </main>
  );
}
