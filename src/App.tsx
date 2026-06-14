import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Calendar, Edit3, Save, Smile, MoonStar, Gift, Compass } from "lucide-react";
import FloatingHearts from "./components/FloatingHearts";
import AudioPlayer from "./components/AudioPlayer";
import ProposalStage from "./components/ProposalStage";
import LoveTimeline from "./components/LoveTimeline";
import LoveQuiz from "./components/LoveQuiz";
import JarOfWishes from "./components/JarOfWishes";
import LetterComposer from "./components/LetterComposer";
import { CoupleInfo } from "./types";

export default function App() {
  const [couple, setCouple] = useState<CoupleInfo>({
    partner1: "Rahul",
    partner2: "Priya",
    anniversaryDate: "2024-02-14",
  });
  const [isEditingNames, setIsEditingNames] = useState(false);
  const [edit1, setEdit1] = useState("");
  const [edit2, setEdit2] = useState("");
  const [editDate, setEditDate] = useState("");

  const [activeTab, setActiveTab] = useState("story");
  const [annivDays, setAnnivDays] = useState(0);

  // Load configuration from local storage
  useEffect(() => {
    const saved = localStorage.getItem("couple_metadata");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCouple(parsed);
        setEdit1(parsed.partner1);
        setEdit2(parsed.partner2);
        setEditDate(parsed.anniversaryDate);
      } catch (e) {
        // use default state
      }
    } else {
      setEdit1(couple.partner1);
      setEdit2(couple.partner2);
      setEditDate(couple.anniversaryDate);
    }
  }, []);

  // Compute anniversary days recursively but guard safely
  useEffect(() => {
    if (couple.anniversaryDate) {
      const anniv = new Date(couple.anniversaryDate);
      const today = new Date();
      const diffTime = today.getTime() - anniv.getTime();
      const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
      setAnnivDays(diffDays);
    }
  }, [couple.anniversaryDate]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edit1 || !edit2 || !editDate) return;

    const updated: CoupleInfo = {
      partner1: edit1,
      partner2: edit2,
      anniversaryDate: editDate,
    };
    
    setCouple(updated);
    localStorage.setItem("couple_metadata", JSON.stringify(updated));
    setIsEditingNames(false);
  };

  const tabs = [
    { id: "story", label: "📖 Our Story Chapters", icon: "📖" },
    { id: "envelope", label: "💌 AI Love Note Designer", icon: "💌" },
    { id: "jar", label: "🫙 Memory Jar", icon: "🫙" },
    { id: "quiz", label: "🎯 Compatibility Test", icon: "🎯" },
    { id: "proposal", label: "💍 The Forever Locked", icon: "💍" }
  ];

  return (
    <div className="relative min-h-screen bg-[#FFF5F7] text-[#4A1D1D] font-sans pb-16 overflow-x-hidden selection:bg-[#FFD1D6] selection:text-[#4A1D1D]">
      {/* Floating Ambient Canvas Hearts Background */}
      <FloatingHearts />

      {/* Decorative Giant Serif Background Hearts from Design HTML */}
      <div className="absolute top-24 left-6 md:left-16 font-serif text-[150px] md:text-[240px] text-rose-200/30 select-none pointer-events-none -rotate-12 z-0">♥</div>
      <div className="absolute bottom-64 right-6 md:right-16 font-serif text-[150px] md:text-[240px] text-rose-200/30 select-none pointer-events-none rotate-12 z-0">♥</div>

      {/* Main Container Layer */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-8">
        
        {/* UPPER BANNER / TOP NAV BAR inspired by reference */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-[#E63946]/10 mb-10">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-sm md:text-base font-black tracking-[0.2em] text-[#E63946] uppercase">
              {couple.partner1} + {couple.partner2}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#4A1D1D]/60 uppercase mt-1">
              EST. {new Date(couple.anniversaryDate).toLocaleDateString("en-IN", { month: "2-digit", day: "2-digit", year: "numeric" }).replace(/\//g, " . ")}
            </span>
          </div>

          {/* Audio Player Component */}
          <div className="w-full md:w-auto">
            <AudioPlayer />
          </div>
        </header>

        {/* HERO TITLE - The signature oversized bold statement from design */}
        <div className="text-center my-14 md:my-20 select-none relative z-10">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tight text-[#E63946] leading-[0.9] uppercase">
            THE BEST<br />IS YET TO<br />COME.
          </h1>
          <p className="font-serif text-sm sm:text-lg md:text-xl italic text-[#4A1D1D]/75 mt-5 max-w-2xl mx-auto">
            From random coffee dates to a lifetime of custom adventures together.
          </p>
        </div>

        {/* HERO CARD STATUS PANEL - High Contrast Editorial Design */}
        <section id="hero-couple-banner" className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-3 border-[#E63946]/15 relative overflow-hidden mb-12">
          {/* Decorative subtle background colors */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-50 rounded-full blur-3xl pointer-events-none" />

          {!isEditingNames ? (
            /* SHOW COUPLE LOGO & DAYS ELAPSED */
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                {/* Cute Couple Profile Logos */}
                <div className="flex items-center -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-400 to-[#E63946] border-4 border-white shadow-md flex items-center justify-center text-2xl">
                    🧸
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E63946] to-pink-500 border-4 border-white shadow-md flex items-center justify-center text-2xl">
                    🐰
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-3xl font-black text-[#4A1D1D] flex items-center justify-center sm:justify-start gap-2.5">
                    {couple.partner1} <Heart className="w-6 h-6 text-[#E63946] fill-[#E63946] animate-pulse" /> {couple.partner2}
                  </h2>
                  <p className="text-xs md:text-sm font-semibold text-[#E63946] mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-4 h-4" /> Anniversary Date: {new Date(couple.anniversaryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Dynamic Living Days Counter Frame */}
              <div className="text-center md:text-right bg-[#FFF5F7] py-4 px-7 rounded-2xl border border-[#E63946]/10 shadow-inner shrink-0">
                <span className="text-[10px] font-sans font-black uppercase text-[#E63946] tracking-widest block mb-0.5">
                  Loving & Living Together
                </span>
                <span className="text-4xl font-serif font-black text-[#E63946] block leading-none my-1">
                  {annivDays} <span className="text-lg font-serif italic text-[#4A1D1D]">Days</span>
                </span>
                <span className="text-xs font-semibold text-[#4A1D1D]/70 block">
                  ...and counting endlessly! 💞
                </span>
              </div>

              <div className="absolute top-0 right-0">
                <button
                  id="edit-couple-metadata-btn"
                  onClick={() => setIsEditingNames(true)}
                  className="p-2 rounded-full hover:bg-rose-50 text-[#E63946]/50 hover:text-[#E63946] transition-colors cursor-pointer"
                  title="Edit Partner Names & Anniversary"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ) : (
            /* CONFIG PANEL FORM */
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSaveConfig}
              className="space-y-4 max-w-xl mx-auto"
            >
              <h3 className="font-serif text-lg font-black text-[#4A1D1D] flex items-center gap-1.5 border-b border-rose-100 pb-2">
                ⚙️ Customised Your App Settings
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Partner 1 Name *</label>
                  <input
                    type="text"
                    required
                    value={edit1}
                    onChange={(e) => setEdit1(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Partner 2 Name *</label>
                  <input
                    type="text"
                    required
                    value={edit2}
                    onChange={(e) => setEdit2(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Anniversary Date *</label>
                <input
                  type="date"
                  required
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                />
              </div>

              <div className="flex justify-end gap-2 p-1">
                <button
                  type="button"
                  onClick={() => setIsEditingNames(false)}
                  className="px-4 py-2 text-[#4A1D1D]/80 hover:bg-[#FFF5F7] font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E63946] hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-md flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </motion.form>
          )}

        </section>

        {/* TABS SELECTOR ROW with High Contrast and Pill styling */}
        <nav id="app-features-tabs" className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              id={`tab-select-${tb.id}`}
              onClick={() => setActiveTab(tb.id)}
              className={`px-5 py-3 rounded-full text-xs md:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tb.id
                  ? "bg-[#E63946] text-white shadow-lg scale-105"
                  : "bg-white hover:bg-[#FFF5F7] text-[#4A1D1D] border-2 border-[#E63946]/10 hover:border-[#E63946]/35"
              }`}
            >
              <span>{tb.icon}</span>
              {tb.label}
            </button>
          ))}
        </nav>

        {/* ACTIVE MODULE CONTAINER FRAME */}
        <main className="relative min-h-[420px] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "story" && <LoveTimeline />}
              {activeTab === "envelope" && <LetterComposer />}
              {activeTab === "jar" && <JarOfWishes />}
              {activeTab === "quiz" && <LoveQuiz />}
              {activeTab === "proposal" && <ProposalStage />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* APPRECIATIVE FOOTER LINE */}
        <footer className="text-center mt-20 pt-8 border-t border-[#E63946]/15 text-xs text-[#4A1D1D]/60 font-bold tracking-wide">
          <p>© {new Date().getFullYear()} Our Cute Love Story. MADE WITH LOVE &bull; ALL RIGHTS RESERVED.</p>
        </footer>

      </div>
    </div>
  );
}
