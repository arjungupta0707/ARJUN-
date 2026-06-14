import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Stars, Gift, Check, Trash } from "lucide-react";

export default function ProposalStage() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noButtonCount, setNoButtonCount] = useState(0);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const noTexts = [
    "No 💔",
    "Are you sure? 🥺",
    "Ek baar aur soch lo! 💕",
    "Chocolate dunga/dungi! 🍫",
    "I'll make you Maggie! 🍜",
    "Gussa thuk do, please? 🧸",
    "Aise mat karo please 💔",
    "No way out! 😉",
    "Systum hang ho jayega! 😂",
    "Access Denied! 🔐",
  ];

  const handleNoHoverOrClick = () => {
    // Generate random positions to make the button "run away"
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    setNoBtnPos({ x: randomX, y: randomY });
    setNoButtonCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setHasAccepted(true);
    // Create immediate happy effects
    triggerHeartExplosion();
  };

  // Fun helper for shooting emoji hearts inside the browser view
  const triggerHeartExplosion = () => {
    for (let i = 0; i < 40; i++) {
      const heart = document.createElement("div");
      heart.innerText = Math.random() > 0.5 ? "💖" : "🌹";
      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "60%";
      heart.style.fontSize = Math.random() * 24 + 18 + "px";
      heart.style.zIndex = "999";
      heart.style.pointerEvents = "none";
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 5; // upward bias
      
      let x = 0;
      let y = 0;
      let opacity = 1;
      
      heart.style.transform = `translate(${x}px, ${y}px)`;
      document.body.appendChild(heart);
      
      const interval = setInterval(() => {
        x += vx;
        y += vy;
        vy += 0.4; // gravity
        opacity -= 0.02;
        
        heart.style.transform = `translate(${x}px, ${y}px)`;
        heart.style.opacity = opacities(opacity);
        
        if (opacity <= 0) {
          clearInterval(interval);
          heart.remove();
        }
      }, 20);
    }
  };

  const opacities = (val: number) => {
    return val < 0 ? "0" : val.toString();
  };

  const noTextToShow = noTexts[Math.min(noButtonCount, noTexts.length - 1)];

  return (
    <div id="proposal-step-section" className="relative max-w-xl mx-auto my-12 px-4">
      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="proposal-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-3 border-rose-200 text-center relative overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />

            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 filter drop-shadow-md" />
            </motion.div>

            <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-rose-900 leading-tight mb-2">
              Will you stay with me forever? 💖
            </h3>
            <p className="text-sm font-medium text-rose-600/90 max-w-sm mx-auto mb-8">
              Pyaar kiya hai toh nibhana toh padega! Tell me if you are mine and always will be.
            </p>

            {/* Buttons Row with runway physics */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative">
              {/* YES BUTTON - grows as NO grows */}
              <motion.button
                id="yes-proposal-btn"
                onClick={handleYes}
                animate={{ scale: 1 + noButtonCount * 0.08 }}
                whileHover={{ scale: (1 + noButtonCount * 0.08) * 1.05 }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-rose-300 transition-all cursor-pointer flex items-center gap-2 relative z-20"
              >
                <Heart className="w-5 h-5 fill-white" /> YES, FOREVER!
                <Stars className="w-4 h-4 text-rose-200 absolute -top-1.5 -right-1.5 animate-pulse" />
              </motion.button>

              {/* NO RUNAWAY BUTTON */}
              <motion.button
                id="no-proposal-btn"
                onClick={handleNoHoverOrClick}
                onMouseEnter={handleNoHoverOrClick}
                animate={{
                  x: noBtnPos.x,
                  y: noBtnPos.y,
                  scale: Math.max(1 - noButtonCount * 0.08, 0.4),
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="px-6 py-3 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-base border border-slate-300 shadow cursor-pointer relative z-10 transition-colors"
              >
                {noTextToShow}
              </motion.button>
            </div>

            {/* Hint message */}
            {noButtonCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-rose-500 mt-4 italic"
              >
                *Note: No ka options humne system se delete kar diya hai! 😉*
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="proposal-success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-8 shadow-xl border-3 border-rose-300 text-center text-rose-950 overflow-hidden relative"
          >
            {/* Celebratory cute hearts */}
            <div className="absolute top-4 left-4 text-3xl opacity-70 animate-bounce">🎈</div>
            <div className="absolute top-4 right-4 text-3xl opacity-70 animate-bounce delay-100">🧸</div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-40">🍫</div>
            <div className="absolute bottom-4 right-4 text-3xl opacity-40">🌹</div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block bg-white p-5 rounded-full shadow-md border-2 border-rose-200 mb-6"
            >
              <Heart className="w-16 h-16 text-rose-600 fill-rose-600 animate-pulse" />
            </motion.div>

            <h3 className="font-sans text-3xl font-black text-rose-900 mb-3">
              YAYYY! I KNEW IT! 😍😭💕
            </h3>
            <p className="text-base font-semibold text-rose-700 max-w-sm mx-auto mb-6 leading-relaxed">
              Congratulations! Humare software ne officially ye update save kar liya hai. Aap ab hamesha ke liye locked ho!
            </p>

            <div className="bg-white/80 rounded-2xl p-5 border border-rose-200 text-left max-w-md mx-auto shadow-sm">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Official Love Certificate
              </span>
              <p className="text-sm text-rose-900 italic font-medium leading-relaxed">
                "I promise to love you, listen to you, share my snacks with you, bear your tantrums, make Maggie for you in the middle of the night, and be your favorite weirdo forever. Thank you for saying YES!"
              </p>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-rose-100 text-xs font-bold text-rose-600">
                <span>With Endless Love ✨</span>
                <span>Forever & Ever 💍</span>
              </div>
            </div>

            <button
              id="re-evaluate-btn"
              onClick={() => setHasAccepted(false)}
              className="mt-6 text-xs text-rose-400 hover:text-rose-600 transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Chorho, doobara test karte hain! 😉
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
