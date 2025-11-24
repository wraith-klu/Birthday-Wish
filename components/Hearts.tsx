"use client";

import { useEffect, useState } from "react";

export default function Hearts() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const shapes = ["💗", "💖", "💞", "💘", "💝"];
    const colors = ["#ff4d6d", "#ff80b0", "#ff99e6", "#ff1e56", "#ff66c4", "#ff3b7a"];

    const heartCount = window.innerWidth < 500 ? 15 : 50; // mobile responsive

    const newHearts = Array.from({ length: heartCount }).map(() => ({
      id: Math.random(),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100 + "vw",
      size: Math.random() * 20 + 20, // 20px – 40px
      duration: Math.random() * 4 + 6, // slower flow (6–10 sec)
      delay: Math.random() * 5,
      rotate: Math.random() * 360,
    }));

    setHearts(newHearts);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: h.left,
            bottom: "-50px",
            fontSize: h.size,
            color: h.color,
            animation: `rise ${h.duration}s linear ${h.delay}s infinite`,
            transform: `rotate(${h.rotate}deg)`,
            textShadow: "0 0 10px rgba(255,255,255,0.8)",
            userSelect: "none",
          }}
        >
          {h.shape}
        </span>
      ))}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) scale(1.6) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
