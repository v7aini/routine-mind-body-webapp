import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Dumbbell,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Activity,
  Layers,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Check,
} from "lucide-react";
import ExerciseVisualCard from "./ExerciseVisualCard";

export default function WorkoutVisualizerModal({
  isOpen,
  onClose,
  exercise,
  guideData,
}) {
  const [activeTab, setActiveTab] = useState("steps"); // 'steps' | 'mistakes' | 'plates' | 'heatmap'
  const [cadenceCount, setCadenceCount] = useState(0);
  const [cadencePhase, setCadencePhase] = useState("Ready");
  const [isCadenceRunning, setIsCadenceRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live Rep Cadence Metronome (2s down, 1s pause, 2s up, 1s squeeze)
  useEffect(() => {
    let timer = null;
    if (isCadenceRunning) {
      timer = setInterval(() => {
        setCadenceCount((prev) => {
          const next = (prev + 1) % 6;
          if (next === 1 || next === 2) {
            setCadencePhase("Lowering (Eccentric) ↓ Inhale 🫁");
            playBeep(440, 0.08);
          } else if (next === 3) {
            setCadencePhase("Hold / Bottom Stretch ⏸");
            playBeep(520, 0.08);
          } else if (next === 4 || next === 5) {
            setCadencePhase("Drive / Squeeze (Concentric) ↑ Exhale 💨");
            playBeep(660, 0.08);
          } else {
            setCadencePhase("Peak Contraction ★ Hold!");
            playBeep(880, 0.15);
          }
          return next;
        });
      }, 1000);
    } else {
      setCadencePhase("Ready");
      setCadenceCount(0);
    }

    return () => clearInterval(timer);
  }, [isCadenceRunning, soundEnabled]);

  const playBeep = (freq, duration) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.05; // gentle beep
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context suppressed
    }
  };

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-indigo-500/40 bg-slate-900 shadow-2xl space-y-5 p-6 text-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" />
                HD Biomechanics & Execution Guide
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                {guideData?.category || "Upper Body Push"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{exercise.name}</h2>
            <p className="text-xs text-slate-400">
              Prescribed: <strong className="text-slate-200">{exercise.sets} sets × {exercise.reps}</strong> • Target Weight: <strong className="text-amber-300">{exercise.recommendedWeight}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Definition Anatomical Contoured Visualizer */}
        <ExerciseVisualCard exercise={exercise} guideData={guideData} isExpanded={true} />

        {/* Real-Time Rep Cadence Metronome Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Live Rep Metronome & Tempo Guide: {guideData?.tempo || "2-0-2"}
              </span>
              <span className="text-xs font-mono text-emerald-300 font-semibold">
                {cadencePhase} {isCadenceRunning && `(${cadenceCount}s)`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg text-xs border transition-all ${
                soundEnabled
                  ? "bg-slate-800 text-cyan-300 border-slate-700"
                  : "bg-slate-900 text-slate-500 border-slate-800"
              }`}
              title={soundEnabled ? "Mute Cadence Beep" : "Unmute Cadence Beep"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsCadenceRunning(!isCadenceRunning)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isCadenceRunning
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {isCadenceRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isCadenceRunning ? "Pause Cadence" : "Start Metronome"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("steps")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "steps"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Step-by-Step Execution
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "heatmap"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Muscle Activation Heatmap
          </button>
          <button
            onClick={() => setActiveTab("mistakes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "mistakes"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Mistakes & Joint Safety
          </button>
          <button
            onClick={() => setActiveTab("plates")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "plates"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Plate Load & Pro Cues
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4 text-xs">
          {activeTab === "steps" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-cyan-300 block mb-1">Starting Stance & Setup:</span>
                <p className="text-slate-300">{guideData?.setup || exercise.plateGuide}</p>
              </div>

              <div className="space-y-2.5">
                {guideData?.steps?.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-slate-200 leading-relaxed text-xs">{st}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "heatmap" && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>Hypertrophy Muscle Fiber Recruitment Heatmap:</span>
              </div>

              {/* Primary Muscles Gauge */}
              <div className="space-y-3">
                {guideData?.primaryMuscles?.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-emerald-300">🔥 Primary Target: {m}</span>
                      <span className="text-emerald-400 font-mono">100% Full Recruitment</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full rounded-full" />
                    </div>
                  </div>
                ))}

                {/* Secondary Stabilizers */}
                {guideData?.secondaryMuscles?.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-cyan-300">⚡ Secondary Stabilizer: {m}</span>
                      <span className="text-cyan-400 font-mono">70% Synergist Load</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[70%] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "mistakes" && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-semibold">Prevent Joint Shear & Ensure 100% Target Tension:</span>
              </div>

              <div className="space-y-2">
                {guideData?.commonMistakes?.map((mst, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 rounded-xl bg-slate-900 border border-rose-900/30 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300">{mst}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "plates" && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Plate Loading Guide for 4 × 2.5kg, 2 × 5kg, 2 × 10kg Plates:</span>
                </div>
                <p className="text-slate-300 text-xs">{exercise.plateGuide}</p>
              </div>

              {guideData?.proTip && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Hypertrophy Pro Cue:</span>
                    <p className="text-xs text-emerald-300/90 mt-0.5 leading-relaxed">{guideData.proTip}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Got It! Return to Workout
          </button>
        </div>
      </div>
    </div>
  );
}
