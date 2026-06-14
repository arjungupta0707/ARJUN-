import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Stars, Sparkles, RefreshCw, Layers } from "lucide-react";
import { JarMessage } from "../types";

const JAR_MESSAGES: JarMessage[] = [
  {
    id: "1",
    category: "compliment",
    text: "Pata hai? Aapki smile duniya ki sabse pyari cheez hai. Jab aap haste ho, pure room me light aa jati hai! 😊💖"
  },
  {
    id: "2",
    category: "challenge",
    text: "Daily Love Challenge: Send your partner a random funny voice note right now saying 'I miss you, bubble head!' in a weird voice! 🎙️😜"
  },
  {
    id: "3",
    category: "quote",
    text: "'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.' — Maya Angelou ✨"
  },
  {
    id: "4",
    category: "wish",
    text: "I wish that we get to eat infinite cheesy pizzas together while watching our favorite movie under a warm heavy blanket. 🍕❄️"
  },
  {
    id: "5",
    category: "compliment",
    text: "Aapke dimaag me jo cute thoda pagalpan hai, mujhe usse sabase zyada pyaar hai! Hamesha aise hi weird rehna! 🤪💕"
  },
  {
    id: "6",
    category: "challenge",
    text: "Today's task: Buy them their favorite chocolate bar today or order a bubble tea for them as a sweet surprise. 🍫🧋"
  },
  {
    id: "7",
    category: "wish",
    text: "I wish to travel to a beautiful quiet mountain station with you, hold warm cups of ginger tea, and listen to the cold wind together. 🏔️☕"
  },
  {
    id: "8",
    category: "quote",
    text: "Mere dil, dimaag, aur playlist par sirf aapka hi raaj hai! You are my favorite frequency. 🎶💓"
  }
];

export default function JarOfWishes() {
  const [activeMessage, setActiveMessage] = useState<JarMessage | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const pullMessage = () => {
    setIsShaking(true);
    setActiveMessage(null); // hide previous first
    
    setTimeout(() => {
      setIsShaking(false);
      const randomIndex = Math.floor(Math.random() * JAR_MESSAGES.length);
      setActiveMessage(JAR_MESSAGES[randomIndex]);
    }, 700);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "compliment": return "bg-rose-100 text-rose-800 border-rose-200";
      case "challenge": return "bg-amber-100 text-amber-800 border-amber-200";
      case "quote": return "bg-violet-100 text-violet-800 border-violet-200";
      default: return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "compliment": return "Compliment 🌸";
      case "challenge": return "Cute Challenge 🎯";
      case "quote": return "Deep Quote 📜";
      default: return "Warm Wish 🌠";
    }
  };

  return (
    <div id="love-jar-container" className="max-w-md mx-auto my-12 px-4 text-center select-none">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-3 border-[#E63946]/15 relative">
        <h3 className="font-serif text-2xl md:text-3xl font-black text-[#4A1D1D] mb-1.5 uppercase tracking-tight">
          Memory Jar of Affection 🫙
        </h3>
        <p className="text-xs md:text-sm text-[#4A1D1D]/70 font-serif italic mb-6">
          Shake the glass jar to pull out a random warm compliment, custom daily challenge, or sweet wish!
        </p>

        {/* MASON JAR SVG GRAPHIC */}
        <div className="relative h-56 flex items-center justify-center mb-6">
          <motion.div
            id="jar-graphic"
            onClick={pullMessage}
            animate={
              isShaking
                ? {
                    x: [0, -12, 12, -10, 10, -5, 5, 0],
                    y: [0, -5, 2, -3, 3, 0],
                    rotate: [0, -4, 4, -3, 3, 0],
                  }
                : { y: [0, -6, 0] }
            }
            transition={
              isShaking
                ? { duration: 0.6, ease: "easeInOut" }
                : { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }
            className="cursor-pointer relative z-10 hover:scale-105 active:scale-95 transition-transform"
          >
            {/* SVG Glass Jar */}
            <svg
              width="140"
              height="180"
              viewBox="0 0 140 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {/* Lid */}
              <rect x="35" y="10" width="70" height="15" rx="4" fill="#FFC4D6" stroke="#E63946" strokeWidth="3" />
              <line x1="45" y1="18" x2="95" y2="18" stroke="#E63946" strokeWidth="2" />
              
              {/* Neck */}
              <path d="M42 25 H98 V35 H42 Z" fill="#FFF5F7" stroke="#E63946" strokeWidth="3" />
              
              {/* Body */}
              <path
                d="M42 35 C25 45 15 60 15 80 V150 C15 165 25 175 45 175 H95 C115 175 125 165 125 150 V80 C125 60 115 45 98 35 Z"
                fill="url(#jarGrad)"
                stroke="#E63946"
                strokeWidth="4"
              />

              {/* Tag hanging around neck */}
              <path d="M48 35 L30 65 H10 L28 35 Z" fill="#FFC4D6" stroke="#E63946" strokeWidth="2" />
              <circle cx="21" cy="50" r="3" fill="#E63946" />

              {/* Little hearts floating INSIDE jar */}
              <path d="M50 80 C48 76 40 76 40 82 C40 88 50 94 50 94 C50 94 60 88 60 82 C60 76 52 76 50 80 Z" fill="#E63946" opacity="0.8" />
              <path d="M90 100 C88 97 82 97 82 101 C82 106 90 110 90 110 C90 110 98 106 98 101 C98 97 92 97 90 100 Z" fill="#FB7185" opacity="0.6" />
              <path d="M70 125 C68 122 62 122 62 126 C62 131 70 135 70 135 C70 135 78 131 78 126 C78 122 72 122 70 125 Z" fill="#EC4899" opacity="0.72" />

              {/* Highlights */}
              <path d="M24 80 V130" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
              <path d="M115 70 V150" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.25" />

              <defs>
                <linearGradient id="jarGrad" x1="70" y1="35" x2="70" y2="175" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#FFE4E6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FFD1D6" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute bottom-2 text-[10px] font-sans font-black text-white bg-[#E63946] px-3.5 py-1 rounded-full border-2 border-white shadow uppercase tracking-widest">
              Tap to shake 💖
            </span>
          </motion.div>

          {/* Sparkly visual rays around the jar */}
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="w-5 h-5 text-amber-500 absolute top-4 left-1/4 animate-pulse" />
            <Stars className="w-5 h-5 text-[#E63946] absolute bottom-6 right-1/4 animate-ping" />
            <Heart className="w-4 h-4 text-pink-500 absolute top-12 right-1/3 fill-pink-500 opacity-60 animate-bounce" />
          </div>
        </div>

        {/* DRAWN NOTE RESULTS */}
        <AnimatePresence mode="wait">
          {activeMessage && (
            <motion.div
              key={activeMessage.id}
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white border-2 border-[#E63946]/20 rounded-3xl p-5 shadow-lg relative max-w-sm mx-auto overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 w-2.5 h-full bg-[#E63946]" />
              
              <div className="flex items-center justify-between mb-2 pl-2">
                <span className={`text-[10px] font-sans font-black px-3 py-1 rounded-full border-2 ${getCategoryColor(activeMessage.category)}`}>
                  {getCategoryLabel(activeMessage.category)}
                </span>
                <Heart className="w-4 h-4 text-[#E63946] fill-[#E63946] animate-pulse" />
              </div>

              <p className="text-sm text-[#4A1D1D] font-serif italic leading-relaxed py-2 pl-2">
                "{activeMessage.text}"
              </p>

              <button
                id="reset-jar-draw-btn"
                onClick={pullMessage}
                className="mt-4 w-full py-2.5 border-2 border-dashed border-[#E63946]/20 hover:border-solid hover:bg-[#FFF5F7] text-[#E63946] text-xs font-sans font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Pull another note!
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pull Instructions when empty */}
        {!activeMessage && !isShaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#E63946] font-sans font-black uppercase tracking-wider"
          >
            * Click the jar to shake and draw a custom daily blessing! *
          </motion.div>
        )}

        {isShaking && (
          <span className="text-xs text-[#E63946] font-sans font-black uppercase animate-pulse">
            Shaking Sweetness... 🍬
          </span>
        )}
      </div>
    </div>
  );
}
