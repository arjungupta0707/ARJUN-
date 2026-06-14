import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Award, RotateCcw, AlertCircle, Heart, CheckCircle2 } from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the absolute best way to calm your partner when they are upset? 🧸",
    options: [
      "Buy them chocolates & Ice Cream 🍫🍦",
      "Give them a tight warm hug & tight kiss 🤗",
      "Sing a super weird funny song to make them laugh 🎶",
      "All of above, combined with endless pampering! 💞"
    ],
    correctAnswer: 3,
    trivia: "Duniya ka sabse best ilaaj: chocolate + hugs with a sprinkle of silly laugh!"
  },
  {
    id: 2,
    question: "What is the definition of a perfect date night? ☕",
    options: [
      "Fancy 5-star restaurant with candles 🍽️",
      "Cozy movie night inside blanket with pizza 🍕🍿",
      "Late-night long drive with Chai & street-side maggie 🚗",
      "Anywhere, as long as we are hand-in-hand! 💕"
    ],
    correctAnswer: 3,
    trivia: "Place doesn't matter, matching heartbeat is the key connection!"
  },
  {
    id: 3,
    question: "Who is more likely to win a silly argument? 😂",
    options: [
      "Partner A (Unbreakable logic) 🧠",
      "Partner B (Ultimate dramatic expressions) 🎭",
      "Silence of both, followed by sweet giggles 🔇",
      "No one wins, but both get extra cuddles! 🥰"
    ],
    correctAnswer: 3,
    trivia: "In legal terms: argument ends when the first person starts laughing!"
  },
  {
    id: 4,
    question: "What makes your partner the happiest? ✨",
    options: [
      "Telling them how special they are daily 💌",
      "Listening to their long boring office/school rants 📱",
      "Surprise morning coffees and forehead kisses ☕💋",
      "A bundle of all these cute little efforts! 💕"
    ],
    correctAnswer: 3,
    trivia: "Love resides in small actions, not in grand gestures!"
  },
  {
    id: 5,
    question: "If your partner is locked in a room, what are they most likely doing? 🔒",
    options: [
      "Overthinking every scenario since 2012 🤔",
      "Taking a sweet, infinite beauty sleep 💤",
      "Eating hidden snacks or searching for something to eat 🍪",
      "Staring at your photos and missing you tremendously! 🥺💖"
    ],
    correctAnswer: 3,
    trivia: "They are missing you, period! Go drop them a text now! 🥰"
  }
];

export default function LoveQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);

  const handleOptionSelect = (optIndex: number) => {
    setSelectedOpt(optIndex);
    setShowTrivia(true);
    if (optIndex === QUIZ_QUESTIONS[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowTrivia(false);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsDone(false);
    setShowTrivia(false);
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  return (
    <div id="couple-trivia-quiz" className="max-w-xl mx-auto my-12 px-4 select-none">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-3 border-[#E63946]/15 relative overflow-hidden">
        
        {/* Soft Background Accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-xl pointer-events-none" />

        {/* Header */}
        {!isDone && (
          <div className="flex justify-between items-center mb-6 border-b border-rose-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-black text-[#E63946] uppercase tracking-widest block mb-1">
                Couple Trivia Contest 🎈
              </span>
              <h4 className="text-xl font-serif font-black text-[#4A1D1D]">How Well Do You Match?</h4>
            </div>
            <span className="bg-[#FFF5F7] text-[#E63946] font-mono font-black text-xs px-3.5 py-1.5 rounded-full border border-[#E63946]/10">
              Q: {currentIdx + 1}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question */}
              <h3 className="font-serif text-lg sm:text-xl font-black text-[#4A1D1D] mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3.5 mb-6">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedOpt === oIdx;
                  const isCorrect = oIdx === currentQ.correctAnswer;
                  
                  let optStyle = "bg-white hover:bg-[#FFF5F7] border-[#E63946]/10 hover:border-[#E63946]/35 text-[#4A1D1D]";
                  if (selectedOpt !== null) {
                    if (isSelected) {
                      optStyle = isCorrect 
                        ? "bg-green-600 text-white border-green-600 shadow-md" 
                        : "bg-[#E63946] text-white border-[#E63946] shadow-md";
                    } else if (isCorrect) {
                      optStyle = "bg-green-100 text-green-800 border-green-200";
                    } else {
                      optStyle = "bg-white text-rose-300 border-rose-50 opacity-40";
                    }
                  }

                  return (
                    <motion.button
                      key={oIdx}
                      id={`quiz-option-${currentIdx}-${oIdx}`}
                      onClick={() => selectedOpt === null && handleOptionSelect(oIdx)}
                      disabled={selectedOpt !== null}
                      whileHover={{ scale: selectedOpt === null ? 1.01 : 1 }}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-sans font-bold transition-all flex items-center justify-between gap-3 ${
                        selectedOpt === null ? "cursor-pointer" : "cursor-default"
                      } ${optStyle}`}
                    >
                      <span>{opt}</span>
                      
                      {selectedOpt !== null && isSelected && (
                        <span>{isCorrect ? "✨" : "😢"}</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Instant Comment / Trivia box */}
              {showTrivia && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FFF5F7] rounded-3xl p-5 border border-[#E63946]/15 text-xs md:text-sm text-[#4A1D1D] flex items-start gap-2.5 mb-6 shadow-inner"
                >
                  <AlertCircle className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif font-black text-sm text-[#4A1D1D] block mb-0.5">Sweet Fact:</span>
                    {currentQ.trivia}
                  </div>
                </motion.div>
              )}

              {/* Next Button */}
              {selectedOpt !== null && (
                <motion.button
                  id="next-quiz-btn"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-[#E63946] hover:bg-rose-700 text-white font-sans font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? "Finish Quiz 🎉" : "Continue Journey ➡️"}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-block bg-[#FFF5F7] p-4 rounded-full border border-[#E63946]/20 mb-4 animate-bounce text-[#E63946]">
                <Award className="w-12 h-12" />
              </div>

              <h3 className="font-serif text-3xl font-black text-[#4A1D1D] mb-1.5 uppercase tracking-tight">
                Match Results Out! 📊
              </h3>
              <p className="text-sm md:text-base font-sans font-extrabold text-[#E63946] mb-6">
                You scored <strong className="text-2xl font-serif text-[#4A1D1D] pr-1 pl-1">{score}/{QUIZ_QUESTIONS.length}</strong> on the compatibility check!
              </p>

              {/* Compatibility Message */}
              <div className="bg-[#FFF5F7] p-6 rounded-3xl border-2 border-[#E63946]/10 text-left max-w-sm mx-auto shadow-inner mb-8 space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#E63946] fill-[#E63946] animate-pulse" />
                  <span className="text-[10px] font-mono font-black uppercase text-[#E63946] tracking-widest">
                    Compatibility Level
                  </span>
                </div>
                
                {score === QUIZ_QUESTIONS.length ? (
                  <div>
                    <h5 className="font-serif font-black text-base text-[#4A1D1D] flex items-center gap-1">
                      100% Ultimate Soulmates! 💍💖
                    </h5>
                    <p className="text-xs text-[#4A1D1D]/80 leading-relaxed mt-1.5">
                      Aap dono ek doosre ke liye hi bane ho! Pure Bollywood romance matches. Unbreakable, magical, sweet love.
                    </p>
                  </div>
                ) : score >= 3 ? (
                  <div>
                    <h5 className="font-serif font-black text-base text-[#E63946]">
                      80% Cute Love Birds! 🕊️💕
                    </h5>
                    <p className="text-xs text-[#4A1D1D]/80 leading-relaxed mt-1.5">
                      Pure affection! Some funny opinions differ, but that makes your love story sweet, tangy, and amazing.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h5 className="font-serif font-black text-base text-[#4A1D1D]">
                      Sweet Partners in Crime! 🍕😈
                    </h5>
                    <p className="text-xs text-[#4A1D1D]/80 leading-relaxed mt-1.5">
                      Aapki chemistry full of drama aur fun hai! Arguments, laughing, teasing and loving is your superpower.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Rows */}
              <button
                id="reset-quiz-btn"
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E63946] hover:bg-rose-700 text-white font-sans font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Re-evaluate Quiz!
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
