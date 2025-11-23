"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const notes = [
    "I promise to always listen to you — not just your words, but your heart, your dreams, and even the unspoken things. With me, your feelings will always have a home.",
    "I promise to support your dreams — every dream you chase, every goal you set, I’ll be right there cheering you on, lifting you up, and believing in you endlessly.",
    "I promise to be honest and faithful — in my words, my actions, and even in silence. My heart will belong only to you, and you’ll never need to doubt my loyalty.",
    "I promise to make you smile, even on your tough days — with little surprises, gentle words, or just holding your hand… I’ll always try to bring light into your world.",
    "I promise to grow with you — learning, improving, celebrating, and building a beautiful future together, step by step, hand in hand."
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  const imageRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const updateHeights = () => {
      const heights = imageRefs.current.map((img) => img?.clientHeight || 0);
      setImageHeights(heights);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [images]);

  const toggleNote = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="gallery-grid mt-8 flex flex-wrap justify-center gap-6">
      {images.map((src, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            layout
            className="relative card rounded-xl overflow-visible p-3 flex flex-col md:flex-row items-start gap-6 transition-all duration-300"
          >
            {/* IMAGE */}
            <motion.img
              ref={(el) => (imageRefs.current[i] = el!)}
              src={src}
              alt={`photo-${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-xl object-contain max-w-full max-h-[420px]"
              layout
            />

            {/* NOTE BUTTON */}
            <div className="relative mt-2 md:mt-0">
              <div
                className="note-sticker cursor-pointer px-3 py-1 rounded-lg shadow-lg text-white font-semibold group transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, hsl(${(i * 60) % 360} 90% 70%), hsl(${(i * 60 + 40) % 360} 80% 65%))`,
                  boxShadow: "0 0 0px rgba(255,255,255,0.7)"
                }}
                onClick={() => toggleNote(i)}
              >
                <span className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s-8-4.5-8-10a8 8 0 1 1 16 0c0 5.5-8 10-8 10z"
                      fill="rgba(255,255,255,0.9)"
                    />
                  </svg>
                  Note
                </span>

                <span className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:inline-block px-2 py-1 rounded bg-white/90 text-gray-900 text-xs shadow-lg">
                  Click to read
                </span>
              </div>
            </div>

            {/* NOTE PARAGRAPH */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                  className="note-paragraph mt-3 md:mt-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-100 bg-opacity-90 rounded-xl p-6 shadow-2xl border border-gray-200 relative flex-shrink-0"
                  style={{
                    height: imageHeights[i] ? imageHeights[i] : "auto",
                    display: "flex",
                    alignItems: "center",
                    flex: "1 1 auto", // <--- flexible width
                    minWidth: "280px",
                    maxWidth: "600px" // optional max width for large screens
                  }}
                >
                  {[...Array(8)].map((_, h) => (
                    <motion.div
                      key={h}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 8 + h,
                        ease: "linear",
                        delay: h * 0.2
                      }}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        width: 12,
                        height: 12,
                        marginLeft: -6,
                        marginTop: -6,
                        transformOrigin: `${20 + h * 6}px center`
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21s-8-4.5-8-10a8 8 0 1 1 16 0c0 5.5-8 10-8 10z"
                          fill={`hsl(${(h * 50) % 360}, 90%, 70%)`}
                        />
                      </svg>
                      <motion.div
                        className="absolute w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1 + Math.random() * 2,
                          delay: Math.random() * 2
                        }}
                        style={{ top: -4, left: -4 }}
                      />
                    </motion.div>
                  ))}

                  <p
                    className="text-lg md:text-xl font-bold"
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      background: "linear-gradient(90deg, #ff6fb5, #c77bff, #ffb3e6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {notes[i]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* MOBILE STYLING */}
      <style jsx>{`
        @media (max-width: 768px) {
          .note-paragraph {
            position: static !important;
            margin-top: 0.75rem;
            transform: none !important;
            height: auto !important;
            align-items: flex-start !important;
            flex: none !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .note-sticker {
            position: static !important;
            margin-top: 0.5rem;
          }
          .tooltip {
            display: none !important;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
