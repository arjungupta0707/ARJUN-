import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, Heart, Sparkles, Check, RefreshCw, Copy, Scissors } from "lucide-react";

export default function LetterComposer() {
  const [isOpen, setIsOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [yourName, setYourName] = useState("");
  const [style, setStyle] = useState("shayari");
  const [lang, setLang] = useState("Hindi");
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiLetter, setAiLetter] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const qualities = [
    "Caring ❤️",
    "Beautiful/Handsome ✨",
    "Drama Queen/King 👑",
    "Late-night chatter 🌙",
    "Amazing Foodie 🍕",
    "Extremely Cute Smile 😊",
    "Weird sense of humor 🤪",
    "My safe space 🏡",
  ];

  const handleQualityToggle = (quality: string) => {
    if (selectedQualities.includes(quality)) {
      setSelectedQualities(selectedQualities.filter((q) => q !== quality));
    } else {
      setSelectedQualities([...selectedQualities, quality]);
    }
  };

  const handleCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !yourName) return;

    setIsLoading(true);
    setAiLetter("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerName,
          yourName,
          qualities: selectedQualities,
          style,
          language: lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong creating note.");
      }

      setAiLetter(data.message);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to call Gemini server. Ensure your API key is in Settings > Secrets.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div id="envelope-letter-generator" className="max-w-2xl mx-auto my-12 px-4 select-none">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-3 border-[#E63946]/15 relative overflow-hidden">
        
        {/* Soft Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-block bg-[#FFF5F7] p-3.5 rounded-full border border-[#E63946]/10 mb-3 text-[#E63946]">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-3xl font-black text-[#4A1D1D] uppercase tracking-tight">
            AI Love Note Designer 💌
          </h3>
          <p className="text-xs md:text-sm font-sans font-extrabold text-[#E63946]/95 mt-1">
            Choose details and utilize AI intelligence to compose emotional Shayari or custom deep love letters!
          </p>
        </div>

        {!isOpen ? (
          /* Locked / Closed Envelope State */
          <div className="text-center py-8">
            <motion.div
              id="click-envelope-indicator"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FFF5F7] rounded-3xl p-8 border-3 border-dashed border-[#E63946]/30 inline-block cursor-pointer shadow-md relative group max-w-sm w-full"
            >
              <div className="absolute inset-0 bg-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-16 h-16 text-[#E63946] fill-rose-100/40 mx-auto mb-4" />
              </motion.div>
              <h4 className="font-serif text-lg font-black text-[#4A1D1D] uppercase">
                You have received a sealed envelope!
              </h4>
              <p className="text-xs text-[#4A1D1D]/70 font-semibold mt-2 leading-relaxed">
                Tap here to open the envelope folds and access the customized love message generator.
              </p>
              <span className="inline-block mt-5 text-xs font-sans font-black bg-[#E63946] hover:bg-[#c92e3a] text-white px-6 py-3 rounded-full shadow-lg tracking-wider uppercase">
                Open Envelope 💌
              </span>
            </motion.div>
          </div>
        ) : (
          /* Expanded Generator Dashboard Frame */
          <div>
            <AnimatePresence mode="wait">
              {!aiLetter && !isLoading ? (
                /* INPUT FORM PANEL */
                <motion.form
                  key="form-input"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleCompose}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Partner's Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Priya"
                        required
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul"
                        required
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                      />
                    </div>
                  </div>

                  {/* Writing Tone styles */}
                  <div>
                    <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-2 uppercase tracking-wider">Letter Aura Tone</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setStyle("shayari")}
                        className={`px-4 py-3 rounded-xl border-2 text-xs transition-all text-left flex flex-col justify-between ${
                          style === "shayari"
                            ? "bg-[#E63946] text-white border-[#E63946] shadow-md"
                            : "bg-white text-[#4A1D1D] border-[#E63946]/10 hover:border-[#E63946]/30 hover:bg-[#FFF5F7]/30"
                        }`}
                      >
                        <span className="text-xl mb-1.5">🌹</span>
                        <div>
                          <p className="font-serif font-black text-sm">Hindi Shayari</p>
                          <p className="opacity-70 text-[10px] font-semibold">Expressive poetry couplets</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStyle("letter")}
                        className={`px-4 py-3 rounded-xl border-2 text-xs transition-all text-left flex flex-col justify-between ${
                          style === "letter"
                            ? "bg-[#E63946] text-white border-[#E63946] shadow-md"
                            : "bg-white text-[#4A1D1D] border-[#E63946]/10 hover:border-[#E63946]/30 hover:bg-[#FFF5F7]/30"
                        }`}
                      >
                        <span className="text-xl mb-1.5">💌</span>
                        <div>
                          <p className="font-serif font-black text-sm">Deep Love Letter</p>
                          <p className="opacity-70 text-[10px] font-semibold">Emotional, warm thoughts</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStyle("funny")}
                        className={`px-4 py-3 rounded-xl border-2 text-xs transition-all text-left flex flex-col justify-between ${
                          style === "funny"
                            ? "bg-[#E63946] text-white border-[#E63946] shadow-md"
                            : "bg-white text-[#4A1D1D] border-[#E63946]/10 hover:border-[#E63946]/30 hover:bg-[#FFF5F7]/30"
                        }`}
                      >
                        <span className="text-xl mb-1.5">😜</span>
                        <div>
                          <p className="font-serif font-black text-sm">Cute & Playful</p>
                          <p className="opacity-70 text-[10px] font-semibold">Mini banter & affection</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-2 uppercase tracking-wider">Language Script</label>
                    <div className="flex gap-2">
                      {["Hindi / Roman Urdu", "English"].map((langSelected) => (
                        <button
                          key={langSelected}
                          type="button"
                          onClick={() => setLang(langSelected)}
                          className={`px-4 py-2 rounded-full border-2 text-xs font-black transition-all ${
                            lang === langSelected
                              ? "bg-[#FFF5F7] text-[#E63946] border-[#E63946]"
                              : "bg-white text-[#4A1D1D]/70 border-[#E63946]/10 hover:border-[#E63946]/25"
                          }`}
                        >
                          {langSelected}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Qualities Grid */}
                  <div>
                    <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-2.5 uppercase tracking-wider">
                      Select Partner Traits (max 3-4 recommended)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {qualities.map((trait) => {
                        const isSelected = selectedQualities.includes(trait);
                        return (
                          <button
                            key={trait}
                            type="button; button-element"
                            onClick={() => handleQualityToggle(trait)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all border-2 flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-[#E63946] text-white border-[#E63946] scale-102"
                                : "bg-white border-[#E63946]/10 text-[#4A1D1D]/90 hover:border-[#E63946]/25"
                            }`}
                          >
                            {trait}
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-3 flex justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-xs text-[#E63946] hover:text-rose-700 font-sans font-black transition-all underline tracking-wide uppercase"
                    >
                      Store Envelope back 📎
                    </button>
                    
                    <button
                      type="submit"
                      id="compose-letter-submit-btn"
                      className="px-6 py-3.5 bg-[#E63946] hover:bg-[#c92e3a] text-white font-sans font-black text-xs md:text-sm rounded-xl shadow-lg hover:shadow-rose-100 transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4" /> Generate Love Message ✨
                    </button>
                  </div>
                </motion.form>
              ) : isLoading ? (
                /* LOADING LOVELY PLACEHOLDERS animation */
                <motion.div
                  key="loading-letter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block"
                  >
                    <Heart className="w-14 h-14 text-[#E63946] fill-[#E63946]" />
                  </motion.div>
                  <p className="text-base font-serif font-black text-[#4A1D1D] mt-5 animate-pulse">
                    Drafting cute romantic lines inside vintage envelopes...
                  </p>
                  <p className="text-[10px] font-mono font-black text-[#E63946] italic mt-2 uppercase tracking-widest">
                    Powered by custom Gemini Generative AI 🤖
                  </p>
                </motion.div>
              ) : (
                /* COMPRESSED Parchment PAPER VIEW */
                <motion.div
                  key="letter-result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FCFBF4] border-2 border-[#EADCAE] rounded-3xl p-6 md:p-8 shadow-inner relative max-w-lg mx-auto"
                >
                  {/* Parchment aesthetic elements */}
                  <div className="absolute top-3 right-3 opacity-30 select-none pointer-events-none transform rotate-3 bg-[#EADCAE]/50 px-2.5 py-1 text-[10px] filter saturate-50 font-mono text-stone-700">
                    APPROVED BY AMOR ❤️
                  </div>

                  <span className="text-[11px] font-black uppercase text-[#8B6E32] tracking-widest block mb-4 border-b border-[#EADCAE] pb-1.5 flex justify-between items-center font-mono">
                    <span>💌 From: {yourName}</span>
                    <span>To: {partnerName} 🌹</span>
                  </span>

                  <div className="font-serif text-[#3E2E10] text-sm md:text-base leading-relaxed tracking-wide space-y-4 whitespace-pre-wrap pl-2 border-l border-amber-200">
                    {aiLetter}
                  </div>

                  <div className="border-t border-[#EADCAE] mt-6 pt-4 flex flex-wrap justify-between items-center gap-4">
                    <button
                      id="reset-compose-btn"
                      onClick={() => {
                        setAiLetter("");
                        setSelectedQualities([]);
                      }}
                      className="px-4 py-2 border border-[#EADCAE] hover:bg-stone-50 text-stone-600 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Start Over
                    </button>

                    <div className="flex gap-2">
                      <button
                        id="copy-letter-btn"
                        onClick={copyToClipboard}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          isCopied
                            ? "bg-green-500 text-white shadow"
                            : "bg-[#8B6E32] hover:bg-[#725a28] text-white shadow"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Letter
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error notifications */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mt-4 text-xs md:text-sm font-semibold text-center">
                ⚠️ {errorMsg}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
