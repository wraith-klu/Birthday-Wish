"use client";
import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 30 }: { text: string, speed?: number }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <p className="whitespace-pre-line text-lg md:text-xl leading-8 text-center text-pink-600">
      {display}<span className="inline-block w-2 h-6 align-bottom bg-transparent animate-pulse" />
    </p>
  );
}
