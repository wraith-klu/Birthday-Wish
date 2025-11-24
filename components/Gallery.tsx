"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/**
 * Gallery.tsx
 * - Mixed Magic: slide (apple) + glow (romantic)
 * - Height-matching note panel, responsive
 * - Bokeh badge, sparkles, gentle transitions
 * - Uses uploaded local asset as bokeh badge
 */

export default function Gallery({ images }: { images: string[] }) {
  const notes = [
  "Happy Birthday, my love. You are the softest part of my life, the calm in my chaos, and the smile behind all of my best days. Being with you has taught me how gentle, warm, and peaceful love can be. I hope today feels as magical as the way you make my heart feel every single day, because you truly deserve every bit of happiness the world can give.",

  "On your special day, I just want you to know this — loving you is easily the most beautiful thing that has ever happened to me. You turn ordinary moments into memories I want to keep forever. You make life lighter, sweeter, and so much more meaningful. Thank you for being you… for choosing me… for being the peace and love I never knew I needed until I found you.",

  "Every birthday of yours reminds me how blessed I am that the universe brought you into my life. You aren’t just my favourite person — you are my comfort, my safe place, and my endless happiness. You make me feel understood in ways no one else ever has. I love you endlessly, and I hope this year gives you everything your beautiful heart deserves.",

  "To the girl who makes my world brighter just by existing — Happy Birthday. Your laughter is my favourite sound, your presence is my favourite comfort, and your heart is my favourite home. You bring light to places in my life I didn’t even realize were dark. Thank you for being the one person who makes everything feel right.",

  "Happy Birthday, jaan. I hope today fills your heart with the same love, warmth, and peace that you bring into my life every single day. You’re not just important to me… you’re everything I once wished for, everything I prayed for, and everything I’ll always protect and cherish. You deserve all the love in the world, and I promise to give you as much of it as I can."
];


  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // bokeh badge (uploaded file)
  const bokehUrl = "/mnt/data/54b20322-93b3-438d-b1fd-da089bb22a54.png";

  // update heights when images load or window resizes
  useEffect(() => {
    const updateHeights = () => {
      const heights = imageRefs.current.map((img) => img?.clientHeight || 0);
      setImageHeights(heights);
    };

    // update when images finish loading (some may load later)
    const imgs = imageRefs.current.filter(Boolean) as HTMLImageElement[];
    imgs.forEach((img) => {
      if (!img) return;
      if (!img.complete) {
        img.addEventListener("load", updateHeights, { once: true });
      }
    });

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [images]);

  const toggleNote = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="gallery-grid mt-8 flex flex-col gap-6 w-full">
      {images.map((src, i) => {
        const isOpen = openIndex === i;
        const measuredHeight = imageHeights[i] || undefined;

        return (
          <motion.div
            key={i}
            layout
            className="relative card rounded-2xl overflow-visible p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 transition-all duration-350"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
          >
            {/* subtle bokeh badge inside card */}
            <img
              src={bokehUrl}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-6 w-48 opacity-6 blur-sm select-none"
              style={{ zIndex: 0 }}
            />

            {/* IMAGE */}
            <motion.img
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={src}
              alt={`photo-${i + 1}`}
              className="rounded-xl object-cover w-full md:w-[420px] max-h-[420px] shadow-lg"
              initial={{ scale: 0.995 }}
              animate={{ scale: isOpen ? 0.995 : 1 }}
              transition={{ duration: 0.45 }}
            />

            {/* NOTE BUTTON (keeps position consistent) */}
            <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 order-last md:order-none">
              <div
                role="button"
                onClick={() => toggleNote(i)}
                className="note-sticker cursor-pointer px-3 py-1 rounded-lg shadow-md text-white font-semibold group transition-transform duration-200 transform hover:scale-105 select-none"
                style={{
                  zIndex: 40,
                  background: `linear-gradient(90deg, hsl(${(i * 60) % 360} 85% 62%), hsl(${(i * 60 + 40) % 360} 80% 65%))`,
                  boxShadow: "0 8px 30px rgba(199,123,255,0.12)",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 21s-8-4.5-8-10a8 8 0 1 1 16 0c0 5.5-8 10-8 10z" fill="rgba(255,255,255,0.92)" />
                  </svg>
                  Note
                </span>

                <span className="tooltip hidden group-hover:inline-block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/90 text-gray-900 text-xs shadow-sm">
                  Click to read
                </span>
              </div>
            </div>

            {/* NOTE PANEL — slides in, matches image height, has glow bloom */}
            <AnimatePresence>
              {isOpen && (
                <motion.aside
                  layout
                  initial={{ opacity: 0, x: 48, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 48, scale: 0.98 }}
                  transition={{ duration: 0.42, type: "spring", stiffness: 110 }}
                  className="note-paragraph relative z-30 rounded-xl p-6 shadow-2xl border border-white/30 flex-shrink-0"
                  style={{
                    minWidth: 280,
                    maxWidth: 720,
                    width: "100%",
                    // on desktop: flexible width filling remaining space while respecting maxWidth
                    flex: "1 1 auto",
                    height: measuredHeight ? measuredHeight : "auto",
                    display: "flex",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(250,245,255,0.45))",
                    backdropFilter: "blur(8px) saturate(1.05)",
                  }}
                >
                  {/* small sparkle + glow layer */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        boxShadow: "0 30px 60px rgba(199,123,255,0.08) inset",
                        mixBlendMode: "screen",
                        borderRadius: 14,
                      }}
                    />
                    {/* few floating sparkles */}
                    <motion.span
                      className="spark"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: [0.2, 1, 0.2], y: [-6, 0, -6] }}
                      transition={{ repeat: Infinity, duration: 3.6, delay: 0.2 }}
                      style={{
                        position: "absolute",
                        width: 8,
                        height: 8,
                        right: 28,
                        top: "30%",
                        borderRadius: 4,
                        background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.1) 60%)",
                        boxShadow: "0 6px 20px rgba(199,123,255,0.18)",
                      }}
                    />
                    <motion.span
                      className="spark"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: [0.2, 1, 0.2], y: [-6, 0, -6] }}
                      transition={{ repeat: Infinity, duration: 4.2, delay: 0.6 }}
                      style={{
                        position: "absolute",
                        width: 10,
                        height: 10,
                        right: 14,
                        top: "62%",
                        borderRadius: 6,
                        background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.12) 60%)",
                        boxShadow: "0 8px 26px rgba(255,120,200,0.12)",
                      }}
                    />
                  </div>

                  {/* Note text — slide+glow: main element */}
                  <motion.p
                    className="note-text text-lg md:text-xl font-semibold text-center md:text-left"
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      background: "linear-gradient(90deg, #ff6fb5, #c77bff, #9fd8ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.45,
                      margin: 0,
                      paddingRight: 8,
                      paddingLeft: 8,
                    }}
                  >
                    {notes[i]}
                  </motion.p>

                  {/* romantic bloom outline (appears after slide) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.12 }}
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: 16,
                      pointerEvents: "none",
                      boxShadow:
                        "0 30px 60px rgba(199,123,255,0.06), 0 0 40px rgba(255,120,180,0.06)",
                      mixBlendMode: "screen",
                    }}
                  />
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* MOBILE overrides */}
      <style jsx>{`
        @media (max-width: 768px) {
          .card {
            padding: 1rem;
          }
          .note-paragraph {
            position: static !important;
            margin-top: 0.75rem;
            height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            align-items: flex-start !important;
            padding: 1rem !important;
          }
          .note-sticker .tooltip {
            display: none !important;
          }
        }

        /* small sparkle animation (desktop) */
        .spark::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        /* subtle card look */
        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.72), rgba(250,248,255,0.64));
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(77,63,111,0.06);
        }
        .note-sticker {
          z-index: 50;
        }
      `}</style>

      {/* handwritten font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
