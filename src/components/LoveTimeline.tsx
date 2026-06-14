import React, { useState, useEffect } from "react";
import { Plus, Trash, Calendar, Tag, Smile, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineEvent } from "../types";

const INITIAL_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-02-14",
    title: "Jab We Met 🌟",
    description: "The very first moment our eyes collided. It was like a movie scene! A spark flew and everything changed.",
    emoji: "💖",
  },
  {
    id: "2",
    date: "2024-05-10",
    title: "The 3:00 AM Chat 🌙",
    description: "When normal conversations turned into endless late-night chats talking about stars, life, childhood and silly secrets.",
    emoji: "💬",
  },
  {
    id: "3",
    date: "2024-09-20",
    title: "First Sweet Coffee Date ☕",
    description: "Sharing the warm chocolate cookie and coffee while getting nervous and hiding smiles behind our cups.",
    emoji: "☕",
  },
  {
    id: "4",
    date: "2025-01-01",
    title: "The Hand-Hold Journey Begins 🤝",
    description: "Walking together holding hands. It was cold outside, but our warmth made everything feel like heaven.",
    emoji: "✨",
  },
];

export default function LoveTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [emoji, setEmoji] = useState("💖");

  const emojisList = ["💖", "🌟", "☕", "🍿", "💬", "🚲", "🌹", "🎁", "🌴", "🍕", "📷", "🎂"];

  useEffect(() => {
    const saved = localStorage.getItem("love_timeline_events");
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        setEvents(INITIAL_EVENTS);
      }
    } else {
      setEvents(INITIAL_EVENTS);
    }
  }, []);

  const saveEvents = (newEvents: TimelineEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem("love_timeline_events", JSON.stringify(newEvents));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !desc) return;

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      title,
      date,
      description: desc,
      emoji,
    };

    const updated = [...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    saveEvents(updated);
    
    // Reset Form
    setTitle("");
    setDate("");
    setDesc("");
    setEmoji("💖");
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const filtered = events.filter((e) => e.id !== id);
    saveEvents(filtered);
  };

  const restoreDefaults = () => {
    if (window.confirm("Restore default timeline memories? This will delete your custom events.")) {
      saveEvents(INITIAL_EVENTS);
    }
  };

  return (
    <div id="love-stories-timeline" className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-[#E63946]/10 pb-6">
        <div>
          <h3 className="font-serif text-3xl md:text-4xl font-black text-[#4A1D1D] flex items-center gap-2 tracking-tight">
            OUR LOVE TIMELINE <Sparkles className="w-6 h-6 text-[#E63946] animate-pulse" />
          </h3>
          <p className="text-sm md:text-base font-serif italic text-[#4A1D1D]/70 mt-1">
            A beautiful scrapbook of our sweet milestones and gold-plated memories.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            id="open-add-form-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-[#E63946] hover:bg-rose-700 text-white font-sans font-black rounded-full text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Add Memory
          </button>
          
          <button
            id="restore-defaults-btn"
            onClick={restoreDefaults}
            className="px-4 py-2 bg-white hover:bg-[#FFF5F7] text-[#E63946] border border-[#E63946]/20 font-sans font-black rounded-full text-xs transition-colors cursor-pointer uppercase tracking-wider"
          >
            Reset
          </button>
        </div>
      </div>

      {/* New Event Form Card */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border-2 border-[#E63946]/20 p-6 mb-8 overflow-hidden shadow-lg"
          >
            <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h4 className="font-serif text-lg font-black text-[#4A1D1D] col-span-full border-b border-rose-100 pb-2">
                ✍️ Write a New Story Chapter
              </h4>
              
              <div>
                <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Memory Title *</label>
                <input
                  type="text"
                  placeholder="e.g. First long drive together"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-1 uppercase tracking-wider">Description *</label>
                <textarea
                  placeholder="Describe the sweet memories, smells, conversations..."
                  rows={3}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFF5F7] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-xs font-sans font-black text-[#4A1D1D]/80 mb-2 uppercase tracking-wider">Choose Emoji Accent</label>
                <div className="flex flex-wrap gap-2">
                  {emojisList.map((emo) => (
                    <button
                      key={emo}
                      type="button"
                      onClick={() => setEmoji(emo)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                        emoji === emo
                          ? "bg-[#E63946] text-white shadow-md scale-110 border-2 border-[#E63946]"
                          : "bg-[#FFF5F7] hover:bg-rose-100/50 border border-rose-100"
                      }`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-full flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-[#4A1D1D]/80 hover:bg-[#FFF5F7] font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E63946] hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-md"
                >
                  Save Milestone 💖
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Timeline Visual Array */}
      <div className="relative border-l-3 border-[#E63946]/15 ml-4 md:ml-32 py-4">
        {events.length === 0 ? (
          <div className="text-center py-12 text-[#4A1D1D]/50">
            <Smile className="w-12 h-12 mx-auto stroke-1 mb-2 text-[#E63946]/60" />
            <p className="text-sm font-serif italic">No memory stories left. Restore components by clicking "Reset" above!</p>
          </div>
        ) : (
          events.map((ev, index) => {
            const formattedDate = new Date(ev.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            });

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative mb-8 pl-8 md:pl-12"
              >
                {/* Timeline Ball Icon */}
                <div className="absolute -left-[18px] top-1.5 w-9 h-9 rounded-full bg-white border-3 border-[#E63946] shadow-md flex items-center justify-center z-10 text-base">
                  {ev.emoji}
                </div>

                {/* Left side side-labels on desktop */}
                <div className="hidden md:block absolute -left-32 top-2.5 w-24 text-right text-xs font-mono font-black text-[#E63946] tracking-wider uppercase">
                  {formattedDate}
                </div>

                {/* Memory Card content */}
                <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#E63946]/10 hover:border-[#E63946]/30 transition-all group relative">
                  <span className="block md:hidden text-xs font-mono font-black text-[#E63946] tracking-wider uppercase mb-1">
                    {formattedDate}
                  </span>

                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif text-lg md:text-xl font-black text-[#4A1D1D]">
                      {ev.title}
                    </h4>
                    
                    {/* Delete handle */}
                    <button
                      id={`delete-event-${ev.id}`}
                      onClick={() => handleDelete(ev.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[#FFF5F7] text-rose-300 hover:text-[#E63946] transition-all"
                      title="Delete memory block"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-[#4A1D1D]/80 leading-relaxed mt-3 font-medium">
                    {ev.description}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
