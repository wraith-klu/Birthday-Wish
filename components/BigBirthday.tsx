"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BigBirthday() {
    // -------------------------------
    // ⭐ Typing Animation Logic
    // -------------------------------
    const fullText =
        "My Moonflower, My Starlight, My Poetry in Motion 💗";

    const fullText2 =
        "A day wrapped in stardust and wildflowers.";

    const [typed1, setTyped1] = useState("");
    const [typed2, setTyped2] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTyped1(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 60);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let i = 0;
        const delay = setTimeout(() => {
            const interval = setInterval(() => {
                setTyped2(fullText2.slice(0, i));
                i++;
                if (i > fullText2.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }, 1500);

        return () => clearTimeout(delay);
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 shadow-xl">

            {/* Floating Hearts Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="absolute left-10 top-20 text-pink-400 text-6xl"
            >
                💖
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4 }}
                className="absolute left-20 bottom-16 text-red-400 text-7xl"
            >
                💗
            </motion.div>

            {/* Floating Hearts Right */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}
                className="absolute right-10 top-24 text-purple-400 text-6xl"
            >
                💞
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.6 }}
                className="absolute right-20 bottom-20 text-pink-500 text-7xl"
            >
                💕
            </motion.div>

            {/* Glow Decorations */}
            <div className="absolute w-72 h-72 bg-pink-300 blur-3xl opacity-30 -top-10 -left-10"></div>
            <div className="absolute w-72 h-72 bg-purple-300 blur-3xl opacity-30 bottom-0 -right-10"></div>

            {/* MAIN HAPPY BIRTHDAY */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-20 px-4"
            >
                <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    Happy Birthday ✨🎉
                </h1>

                
                {/* ⭐ Typing Text Line 1 */}
                <p className="mt-6 text-xl md:text-2xl text-pink-700 font-medium drop-shadow whitespace-pre-wrap">
                    {typed1}
                    <span className="animate-pulse">|</span>
                </p>

                {/* ⭐ Typing Text Line 2 */}
                <p className="mt-3 text-xl md:text-2xl text-purple-500 font-medium drop-shadow whitespace-pre-wrap">
                    {typed2}
                    <span className="animate-pulse">|</span>
                </p>
            </motion.div>
        </div>
    );
}
