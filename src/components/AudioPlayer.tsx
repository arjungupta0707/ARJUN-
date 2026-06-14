import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ROMANTIC_TRACKS = [
  {
    title: "Sufi Love Lofi",
    artist: "Acoustic Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // high quality fallback
    desc: "Soft piano & cozy vibes"
  },
  {
    title: "Chocolaty Hearts",
    artist: "Chime Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    desc: "Sweet bell tones & soft beat"
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [synthMode, setSynthMode] = useState(true); // default to beautiful synthesized tunes for 100% offline guarantee
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = ROMANTIC_TRACKS[trackIndex];

  // Synthesize soft, romantic lofi chime melodies if the user plays in synth mode!
  // This is a custom built-in romantic tone generator that works 100% of the time, no external asset dependencies!
  const playCuteSynthNote = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Sweet romantic chords: major pentatonic (C4, D4, E4, G4, A4, C5, E5)
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      const randomFreq = notes[Math.floor(Math.random() * notes.length)];
      
      // Create oscillator & gain
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Cozy sweet sine wave + sweet triangle overtone
      osc.type = Math.random() > 0.5 ? "sine" : "triangle";
      osc.frequency.value = randomFreq;
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Soft fading notes
      gain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.log("AudioContext synth ignored.", e);
    }
  };

  useEffect(() => {
    if (isPlaying && synthMode) {
      // Play a soft romantic ding/chime notes every 2 seconds
      synthIntervalRef.current = setInterval(() => {
        playCuteSynthNote();
      }, 1600);
      // Immediately play first note
      playCuteSynthNote();
    } else {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    }
    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, [isPlaying, synthMode, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !synthMode) {
        audioRef.current.play().catch(() => {
          // Fallback to synth if stream blocked
          setSynthMode(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, trackIndex, synthMode]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const selectSynth = (mode: boolean) => {
    setSynthMode(mode);
    if (!mode) {
      // stop synth immediately
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    }
  };

  return (
    <div id="audio-player-widget" className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-md border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4 max-w-lg mx-auto">
      {/* Visual Disc and Track Title */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 rounded-full bg-rose-500 border-2 border-rose-300 flex items-center justify-center shadow-inner relative"
        >
          <div className="w-4 h-4 rounded-full bg-rose-50 border border-rose-200" />
          <Music className="w-5 h-5 text-white absolute inset-0 m-auto" />
          {isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -inset-1 rounded-full border border-rose-300"
            />
          )}
        </motion.div>

        <div>
          <h4 className="text-sm font-semibold text-rose-900 flex items-center gap-1.5">
            {synthMode ? "Lofi Chimes Synthesizer" : currentTrack.title}
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          </h4>
          <p className="text-xs text-rose-500">
            {synthMode ? "Soft customized piano beats" : currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Control Area */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Toggle Mode */}
        <div className="flex bg-rose-50/80 p-0.5 rounded-lg text-xs font-medium text-rose-600 border border-rose-100">
          <button
            id="synth-mode-btn"
            onClick={() => selectSynth(true)}
            className={`px-2.5 py-1 rounded-md transition-all ${
              synthMode ? "bg-white text-rose-700 shadow-sm font-semibold" : "opacity-60"
            }`}
          >
            Soft Chimes
          </button>
          <button
            id="stream-mode-btn"
            onClick={() => selectSynth(false)}
            className={`px-2.5 py-1 rounded-md transition-all ${
              !synthMode ? "bg-white text-rose-700 shadow-sm font-semibold" : "opacity-60"
            }`}
          >
            Lofi Radio
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {!synthMode && (
            <button
              id="next-track-btn"
              onClick={() => setTrackIndex((prev) => (prev + 1) % ROMANTIC_TRACKS.length)}
              className="p-1.5 rounded-full hover:bg-rose-50 text-rose-600 transition-colors"
              title="Next song"
            >
              <Music className="w-4 h-4" />
            </button>
          )}

          <button
            id="play-pause-btn"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>

          <button
            id="mute-unmute-btn"
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-rose-50 text-rose-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Hidden HTML Audio Element */}
      {!synthMode && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          loop
          muted={isMuted}
          onEnded={() => setTrackIndex((prev) => (prev + 1) % ROMANTIC_TRACKS.length)}
        />
      )}
    </div>
  );
}
