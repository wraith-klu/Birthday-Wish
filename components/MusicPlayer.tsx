"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, VolumeX, Volume2 } from "lucide-react";

export default function MusicPlayer({
  src = "/Forever.mp3",
  name = "Love ♥",
}: {
  src?: string;
  name?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [level, setLevel] = useState(0);
  const rafRef = useRef<number | null>(null);

  /* RANDOMIZED ELEMENTS */
  const [hearts, setHearts] = useState<any[]>([]);
  const [sparks, setSparks] = useState<any[]>([]);
  const [petals, setPetals] = useState<any[]>([]);

  /* Generate hearts, sparks, petals */
  useEffect(() => {
    setHearts(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${Math.random() * 40 + 10}%`,
        delay: Math.random() * 3,
        size: 14 + Math.random() * 18,
        hue: Math.floor(Math.random() * 40 + 320),
      }))
    );

    setSparks(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );

    setPetals(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        rotate: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.7,
      }))
    );
  }, []);

  /* Audio analyser setup — only once */
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if ((audioEl as any)._ctx) return; // prevent duplicate

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    const srcNode = ctx.createMediaElementSource(audioEl);

    analyser.fftSize = 256;
    const dataArr = new Uint8Array(analyser.frequencyBinCount);

    srcNode.connect(analyser);
    analyser.connect(ctx.destination);

    (audioEl as any)._ctx = ctx; // mark context
    (audioEl as any)._srcNode = srcNode;

    const tick = () => {
      analyser.getByteFrequencyData(dataArr);
      const avg = dataArr.reduce((a, b) => a + b, 0) / dataArr.length;
      const normalized = Math.min(1, Math.max(0, avg / 180));
      setLevel((prev) => normalized * 0.98 + prev * 0.02);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        analyser.disconnect();
        srcNode.disconnect();
        ctx.close();
      } catch {}
    };
  }, []);

  /* Keyboard shortcuts */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === "m") toggleMute();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  /* Play/pause control */
  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    const ctx = (el as any)._ctx as AudioContext | undefined;
    if (ctx && ctx.state === "suspended") {
      await ctx.resume(); // resume audio context for browsers
    }

    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.log("Play blocked:", err));
    }
  };

  /* Mute/unmute */
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  const neonScale = 0.9 + level * 0.5;
  const neonBlur = 18 + level * 28;

  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center gap-6 p-6 rounded-3xl max-w-xl w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,245,250,0.6), rgba(240,240,255,0.35))",
          border: "1px solid rgba(255,255,255,0.55)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 10px 40px rgba(25,20,40,0.06)",
        }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-pink-600"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Forever — Just for You
        </motion.h2>

        {/* Visuals */}
        <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0.05 }}
              animate={{ opacity: [0.05, 0.7, 0.05], y: [-10, -20, -10] }}
              transition={{
                duration: 4 + (h.delay % 3),
                repeat: Infinity,
                delay: h.delay,
              }}
              className="absolute"
              style={{ left: h.left, top: h.top }}
            >
              <Heart
                style={{
                  width: h.size,
                  height: h.size,
                  color: `hsl(${h.hue} 85% 70%)`,
                }}
              />
            </motion.div>
          ))}

          <motion.div
            animate={{ scale: neonScale }}
            transition={{ type: "spring", stiffness: 80, damping: 10 }}
            style={{
              width: 240,
              height: 240,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,130,200,0.12), transparent 30%)",
              filter: `blur(${neonBlur}px)`,
              position: "absolute",
            }}
          />

          {/* Vinyl Disc */}
          <motion.div
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{
              repeat: playing ? Infinity : 0,
              duration: 8,
              ease: "linear",
            }}
            style={{
              width: 180,
              height: 180,
              borderRadius: "999px",
              background:
                "radial-gradient(circle,#111 0%,#000 50%,#111 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "999px",
                background: "linear-gradient(180deg,#ff6fb5,#c77bff)",
              }}
            />
            <motion.div
              animate={{ rotate: playing ? -360 : 0 }}
              transition={{
                repeat: playing ? Infinity : 0,
                duration: 11,
                ease: "linear",
              }}
              className="absolute flex items-center justify-center"
              style={{ width: 230, height: 230 }}
            >
              <motion.span
                style={{
                  transform: "translateY(-70px)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(255,200,240,0.95)",
                  textShadow: "0 0 12px rgba(255,140,200,0.8)",
                }}
              >
                {name}
              </motion.span>
            </motion.div>
          </motion.div>

          {sparks.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                delay: s.delay,
              }}
              className="absolute"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                borderRadius: 999,
                background: "white",
              }}
            />
          ))}

          {petals.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -40, opacity: 0, rotate: p.rotate }}
              animate={{
                y: 160 + Math.random() * 80,
                opacity: [0, 1, 0],
                rotate: [p.rotate, p.rotate + 90],
              }}
              transition={{
                repeat: Infinity,
                duration: 6 + Math.random() * 3,
                delay: p.delay,
              }}
              className="absolute"
              style={{
                left: p.left,
                width: 14 * p.scale,
                height: 8 * p.scale,
                background: "pink",
                borderRadius: 8,
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white/10 border border-white/20"
          >
            {playing ? <Pause className="w-6 h-6 text-pink-300" /> : <Play className="w-6 h-6 text-pink-300" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-white/10 border border-white/20"
          >
            {muted ? <VolumeX className="w-5 h-5 text-pink-300" /> : <Volume2 className="w-5 h-5 text-pink-300" />}
          </button>
        </div>

        <audio ref={audioRef} src={src} preload="auto" />

        <p className="text-sm text-pink-400 italic">
          This melody spins for you — like my heart does.
        </p>
      </motion.div>
    </div>
  );
}
