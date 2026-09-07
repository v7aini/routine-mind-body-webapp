import React, { useState, useEffect } from "react";
import {
  Droplets,
  Plus,
  Minus,
  RotateCcw,
  Timer,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  Sparkles,
  Activity,
  Heart,
  Volume2,
} from "lucide-react";

export default function HydrationIdleTracker({ waterMl, setWaterMl, userProfile }) {
  const targetMl = userProfile.waterTargetMl || 3500;
  const progressPercent = Math.min(100, Math.round((waterMl / targetMl) * 100));

  // Idle Desk Break Timer States
  const [idleIntervalMins, setIdleIntervalMins] = useState(45);
  const [idleSecondsLeft, setIdleSecondsLeft] = useState(45 * 60);
  const [isIdleTimerRunning, setIsIdleTimerRunning] = useState(true);
  const [showBreakAlertModal, setShowBreakAlertModal] = useState(false);

  // Countdown timer for Idle state
  useEffect(() => {
    let timer = null;
    if (isIdleTimerRunning && idleSecondsLeft > 0) {
      timer = setInterval(() => {
        setIdleSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (idleSecondsLeft === 0 && isIdleTimerRunning) {
      setIsIdleTimerRunning(false);
      setShowBreakAlertModal(true);
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 659.25; // E5 tone
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.8);
      } catch (e) {
        console.log("Audio alert suppressed");
      }
    }
    return () => clearInterval(timer);
  }, [isIdleTimerRunning, idleSecondsLeft]);

  const handleResetIdleTimer = (mins = idleIntervalMins) => {
    setIdleIntervalMins(mins);
    setIdleSecondsLeft(mins * 60);
    setIsIdleTimerRunning(true);
    setShowBreakAlertModal(false);
  };

  const formatIdleTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const stretchExercises = [
    { title: "Neck Rolls & Chin Tucks", duration: "30 secs", desc: "Slow gentle neck rotations to release cervical tension from studying." },
    { title: "Shoulder Blade Squeezes", duration: "30 secs", desc: "Pinch shoulder blades together for posture correction." },
    { title: "Seated Spinal Twist", duration: "30 secs", desc: "Twist upper torso to left and right while keeping hips grounded." },
    { title: "Standing Quad & Calf Stretch", duration: "30 secs", desc: "Stand up from chair, stretch quadriceps and boost leg blood circulation." },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-cyan-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" />
                Hydration & Movement Protocol
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Water Tracker & Sedentary Break Alert
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Dehydration and prolonged sitting lower cognitive capacity and cause muscle tightness. Maintain <strong>3.5 Liters</strong> daily water intake and break idle posture every <strong>45 minutes</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-bold text-center">
              Water: {(waterMl / 1000).toFixed(1)}L / 3.5L
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Water Intake Section & Sedentary Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Intake Logger Box */}
        <div className="glass-panel p-6 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Daily Hydration Log</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              {progressPercent}% Achieved
            </span>
          </div>

          {/* Animated Water Level Display */}
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="relative w-44 h-56 rounded-3xl bg-slate-900 border-4 border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col justify-end">
              {/* Fill background */}
              <div
                className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-sky-400 transition-all duration-700 relative"
                style={{ height: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse-slow" />
              </div>

              {/* Water amount text inside bottle */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
                <span className="text-3xl font-extrabold font-mono">
                  {(waterMl / 1000).toFixed(2)}L
                </span>
                <span className="text-xs text-cyan-100">/ 3.50L Goal</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 text-center">
              Equivalent to: <strong className="text-cyan-400">{Math.round(waterMl / 250)} glasses</strong> of 250ml
            </p>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWaterMl((prev) => Math.min(5000, prev + 250))}
                className="py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md glow-cyan transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+250 ml</span>
              </button>

              <button
                onClick={() => setWaterMl((prev) => Math.min(5000, prev + 500))}
                className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+500 ml</span>
              </button>

              <button
                onClick={() => setWaterMl((prev) => Math.max(0, prev - 250))}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1 border border-slate-700"
              >
                <Minus className="w-4 h-4" />
                <span>Undo</span>
              </button>
            </div>

            <button
              onClick={() => setWaterMl(0)}
              className="w-full py-1.5 text-slate-400 hover:text-white text-xs flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Daily Water Log</span>
            </button>
          </div>
        </div>

        {/* Sedentary / Idle Time Break Controller */}
        <div className="glass-panel p-6 space-y-6 flex flex-col justify-between border border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Sedentary Idle Break Reminder</h3>
                <p className="text-xs text-slate-400">Leave your desk to stretch & move</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {[30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => handleResetIdleTimer(m)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    idleIntervalMins === m
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* Idle Countdown Display */}
          <div className="text-center py-6 bg-slate-900/60 rounded-2xl border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Time Until Next Movement Break:
            </span>
            <div className="text-5xl font-extrabold font-mono text-amber-400 tracking-wider my-2 glow-amber">
              {formatIdleTime(idleSecondsLeft)}
            </div>

            <p className="text-xs text-slate-300">
              {isIdleTimerRunning
                ? "Active posture monitoring on"
                : "Timer paused"}
            </p>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => setIsIdleTimerRunning(!isIdleTimerRunning)}
                className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md ${
                  isIdleTimerRunning
                    ? "bg-amber-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {isIdleTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isIdleTimerRunning ? "Pause Monitoring" : "Resume Monitoring"}</span>
              </button>

              <button
                onClick={() => handleResetIdleTimer(idleIntervalMins)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stretch Instructions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>2-Minute Desk Mobility Routine:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {stretchExercises.slice(0, 2).map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <span className="font-bold text-white block">{s.title} ({s.duration})</span>
                  <span className="text-[11px] text-slate-400">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Break Alert Modal Popup when Idle Timer Reaches 0 */}
      {showBreakAlertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-md w-full border-2 border-amber-500 text-center space-y-4 animate-bounce-short">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40 glow-amber">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              TIME TO LEAVE THE IDLE POSITION! 🚶‍♂️
            </h3>

            <p className="text-sm text-slate-300">
              You have been sitting for <strong>{idleIntervalMins} minutes</strong>! Stand up, stretch your body, walk around, and drink a glass of water to refresh your brain.
            </p>

            {/* Stretch Exercises List */}
            <div className="space-y-2 text-left bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase">2-Minute Movement Routine:</h4>
              {stretchExercises.map((ex, i) => (
                <div key={i} className="text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  <div>
                    <strong>{ex.title}:</strong> {ex.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setWaterMl((prev) => Math.min(5000, prev + 250));
                handleResetIdleTimer();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-lg glow-amber"
            >
              Drank Water & Completed 2-Min Stretch ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
