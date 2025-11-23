"use client";
import { motion } from "framer-motion";

export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="gallery-grid mt-8">
      {images.map((src, i) => (
        <div key={i} className="relative card rounded-xl overflow-visible" style={{ padding: 12 }}>
          {/* image displayed at its actual size */}
          <motion.img
            src={src}
            alt={`photo-${i+1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            style={{ display: "block", width: "auto", height: "auto", maxWidth: "420px", maxHeight: "420px" }}
          />

          {/* animated colorful note (in front) */}
          <div className="note-sticker" style={{
            background: `linear-gradient(90deg, hsl(${(i*60)%360} 90% 70%), hsl(${(i*60+40)%360} 80% 65%))`,
            color: "white",
          }}>
            <span style={{display:"inline-flex", gap:8, alignItems:"center"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s-8-4.5-8-10a8 8 0 1 1 16 0c0 5.5-8 10-8 10z" fill="rgba(255,255,255,0.9)"/></svg>
              Note
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
