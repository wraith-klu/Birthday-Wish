"use client";
import { motion } from "framer-motion";

export default function VideoHero() {
  const videoAvailable = true; // set false if no hero.mp4

  return (
    <section className="relative w-full rounded-2xl overflow-hidden card h-[56vh] md:h-[60vh]">
      <div className="hero-flowers" />

      {videoAvailable ? (
        <video
          src="/hero.mp4"
          poster="/poster.png" /* also included from your uploaded file path */
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="w-full h-full" style={{
          background: "linear-gradient(90deg,#ff9cc9,#ffd1ec,#c7a4ff,#d7ffe8)",
          backgroundSize: "400% 400%",
          animation: "bgShift 10s linear infinite"
        }} />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          {/* <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
            For you — my moonflower
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/90 text-center">A day wrapped in stardust and wildflowers.
          </p> */}
        </motion.div>
      </div>

      <style jsx>{`@keyframes bgShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
    </section>
  );
}
