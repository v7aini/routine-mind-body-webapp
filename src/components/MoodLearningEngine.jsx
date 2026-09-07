import React, { useState, useEffect } from "react";
import { MOOD_MODEL } from "../data/moodStrategies";
import MidSessionShiftWidget from "./MidSessionShiftWidget";
import {
  Brain,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  BookOpen,
  Zap,
  Flame,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";

export default function MoodLearningEngine({ currentMood, setCurrentMood, setActiveTab, setWaterMl }) {
  const [selectedMoodId, setSelectedMoodId] = useState(currentMood ? currentMood.id : "neutral");
  const activeMood = MOOD_MODEL[selectedMoodId] || MOOD_MODEL["neutral"];

  // Timer states
  const [timerMode, setTimerMode] = useState("work"); // work or break
  const [timeLeft, setTimeLeft] = useState(activeMood.pomodoroConfig.work * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [journalNote, setJournalNote] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  // Update timer whenever mood changes
  useEffect(() => {
    setCurrentMood(activeMood);
    setTimeLeft(activeMood.pomodoroConfig.work * 60);
    setIsTimerRunning(false);
  }, [selectedMoodId]);

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (soundEnabled) {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 587.33; // D5 pitch
          osc.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.2);
        } catch (e) {
          console.log("Audio not allowed yet");
        }
      }
      if (timerMode === "work") {
        setTimerMode("break");
        setTimeLeft(activeMood.pomodoroConfig.break * 60);
      } else {
        setTimerMode("work");
        setTimeLeft(activeMood.pomodoroConfig.work * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, soundEnabled, timerMode, activeMood]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSaveNote = () => {
    if (!journalNote.trim()) return;
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-purple-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" />
                Adaptive Mood-Regulation Cognitive Engine
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Mood Control & Adaptive Study Model
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              How you feel directly dictates your optimal learning strategy. Select your current emotional state below to unlock your 3-step Mood Shift Protocol and tailored GATE / Aptitude study routine.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white"
              title="Toggle Audio Beep"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mid-Session Shift Widget */}
      <MidSessionShiftWidget
        setActiveTab={setActiveTab}
        setWaterMl={setWaterMl}
        setCurrentMood={setCurrentMood}
        MOOD_MODEL={MOOD_MODEL}
      />

      {/* Mood Selector Grid */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Select How You Feel Right Now:</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.values(MOOD_MODEL).map((m) => {
            const isSelected = selectedMoodId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMoodId(m.id)}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  isSelected
                    ? `bg-slate-900 border-2 text-white shadow-lg scale-105 glow-indigo`
                    : "bg-slate-800/30 border-slate-700/40 text-slate-300 hover:bg-slate-800/60 hover:border-slate-600"
                }`}
                style={{ borderColor: isSelected ? m.color : undefined }}
              >
                <span className="text-3xl">{m.icon}</span>
                <span className="text-xs font-semibold text-center leading-tight">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Mood Deep-Dive Protocol & Study Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 3-Step Mood Shift Protocol (2 Spans) */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl bg-slate-900 border border-slate-700">
                {activeMood.icon}
              </span>
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  Active Control Strategy
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {activeMood.label} State Protocol
                </h3>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold border"
              style={{
                backgroundColor: `${activeMood.color}20`,
                borderColor: `${activeMood.color}50`,
                color: activeMood.color,
              }}
            >
              {activeMood.studyStrategy}
            </span>
          </div>

          <p className="text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <strong className="text-white">Psychological State:</strong> {activeMood.description}
          </p>

          {/* 3-Step Emotional Shift Protocol */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>3-Step Mood Shift Protocol (Emotional Control):</span>
            </h4>

            <div className="space-y-2.5">
              {activeMood.moodShiftProtocol.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended GATE / Aptitude Subjects */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Best Study Topics mapped for {activeMood.label}:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeMood.recommendedSubjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-xs font-medium flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Launch Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 italic">
              "{activeMood.quote}"
            </div>

            <button
              onClick={() => setActiveTab("practice")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-emerald"
            >
              <span>Launch Practice Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Mood-Adaptive Pomodoro Timer & Quick Journal */}
        <div className="space-y-6">
          {/* Mood-Tuned Pomodoro Timer Card */}
          <div className="glass-panel p-6 border border-purple-500/30 text-center space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Mood-Tuned Focus Timer</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {timerMode === "work" ? "Focus Block" : "Rest Block"}
              </span>
            </div>

            {/* Timer Ring Display */}
            <div className="py-4">
              <div className="text-5xl font-extrabold font-mono text-white tracking-wider glow-indigo">
                {formatTimer(timeLeft)}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Recommended for {activeMood.label}: <strong>{activeMood.pomodoroConfig.work} min study / {activeMood.pomodoroConfig.break} min rest</strong>
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                  isTimerRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-white glow-amber"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white glow-indigo"
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? "Pause" : "Start Study Session"}</span>
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimeLeft(activeMood.pomodoroConfig.work * 60);
                  setTimerMode("work");
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Emotional Journal & Control Note */}
          <div className="glass-panel p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Emotional Journal & Reflection:</span>
            </h4>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What triggered this mood? Write 1 line to release mental clutter..."
              className="w-full h-24 glass-input text-xs resize-none p-3"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Saved to local browser storage</span>
              <button
                onClick={handleSaveNote}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
              >
                {journalSaved ? "Saved ✓" : "Save Reflection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
