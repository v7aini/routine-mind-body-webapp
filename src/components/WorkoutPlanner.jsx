import React, { useState, useEffect } from "react";
import { DUMBBELL_WORKOUT_PLAN } from "../data/workoutData";
import { EXERCISE_VISUAL_GUIDES } from "../data/exerciseVisualsData";
import ExerciseVisualCard from "./ExerciseVisualCard";
import WorkoutVisualizerModal from "./WorkoutVisualizerModal";
import PlateLoadCalculator, { DEFAULT_PLATE_INVENTORY } from "./PlateLoadCalculator";
import {
  Dumbbell,
  CheckCircle2,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  Award,
  ShieldCheck,
  Zap,
  Eye,
  EyeOff,
  Activity,
  Maximize2,
  Sliders,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function WorkoutPlanner({
  workoutProgress,
  setWorkoutProgress,
  userProfile,
  plateInventory,
  setPlateInventory,
}) {
  const [selectedDayId, setSelectedDayId] = useState("day1");
  const [showPlateCalculator, setShowPlateCalculator] = useState(true);
  const activeWorkout =
    DUMBBELL_WORKOUT_PLAN.find((d) => d.id === selectedDayId) ||
    DUMBBELL_WORKOUT_PLAN[0];

  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [isRestTimerActive, setIsRestTimerActive] = useState(false);
  const [activeRestPreset, setActiveRestPreset] = useState(60);

  // Visualizer State
  const [showAllVisuals, setShowAllVisuals] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [modalExercise, setModalExercise] = useState(null);

  // Countdown for Rest Timer
  useEffect(() => {
    let timer = null;
    if (isRestTimerActive && restSecondsLeft > 0) {
      timer = setInterval(() => {
        setRestSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (restSecondsLeft === 0 && isRestTimerActive) {
      setIsRestTimerActive(false);
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = 880; // A5 tone
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
      } catch (e) {
        console.log("Audio play suppressed");
      }
    }
    return () => clearInterval(timer);
  }, [isRestTimerActive, restSecondsLeft]);

  const startRestTimer = (seconds) => {
    setActiveRestPreset(seconds);
    setRestSecondsLeft(seconds);
    setIsRestTimerActive(true);
  };

  const toggleCardVisual = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? !showAllVisuals : !prev[id],
    }));
  };

  const toggleSetCompleted = (exerciseId, setIndex) => {
    setWorkoutProgress((prev) => {
      const dayLogs = prev[selectedDayId] || {};
      const exSets = dayLogs[exerciseId] || [];
      const updatedSets = [...exSets];
      updatedSets[setIndex] = !updatedSets[setIndex];

      // Auto start rest timer when set completed
      if (updatedSets[setIndex]) {
        startRestTimer(60);
      }

      // Check if all sets completed across workout
      const newProgress = {
        ...prev,
        [selectedDayId]: {
          ...dayLogs,
          [exerciseId]: updatedSets,
        },
      };

      // Check if total workout day completed for celebration
      const totalSetsNeeded = activeWorkout.exercises.reduce(
        (acc, ex) => acc + ex.sets,
        0
      );
      let totalCompleted = 0;
      activeWorkout.exercises.forEach((ex) => {
        const logged = newProgress[selectedDayId]?.[ex.id] || [];
        totalCompleted += logged.filter(Boolean).length;
      });

      if (totalCompleted === totalSetsNeeded) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      return newProgress;
    });
  };

  // Plate combination calculator examples
  const plateCombinations = [
    { weight: "Bodyweight", setup: "Floor & Feet-Elevated Push-Ups", level: "Push Mass Builder" },
    { weight: "2.5 kg", setup: "1 x 2.5kg plate per hand", level: "Rear Delts & Lateral Raises" },
    { weight: "5.0 kg", setup: "1 x 5kg plate OR 2 x 2.5kg plates per hand", level: "Bicep Curls & Arnold Press" },
    { weight: "7.5 kg", setup: "1 x 5kg + 1 x 2.5kg plate per hand", level: "Two-Arm Bent-Over Rows" },
    { weight: "10.0 kg", setup: "1 x 10kg plate OR 2 x 5kg plates per hand", level: "Single-Arm Rows (No Pull-Up Bar)" },
    { weight: "12.5 kg", setup: "1 x 10kg + 1 x 2.5kg plate per hand", level: "Goblet Squats & Heavy Rows" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-emerald-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" />
                Push-Ups & Dumbbells with Visual Biomechanics
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Push-Ups & Dumbbell Mass Hypertrophy Planner
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Equipped with <strong>live visual form animations</strong>, <strong>biomechanical motion cues</strong>, and <strong>dumbbell plates (2.5kg, 5kg, 10kg)</strong>. Zero pull-up bar needed!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPlateCalculator(!showPlateCalculator)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Sliders className="w-4 h-4" />
              <span>{showPlateCalculator ? "Hide Plate Matrix" : "Plate Loading Calculator"}</span>
            </button>

            <button
              onClick={() => setShowAllVisuals(!showAllVisuals)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              {showAllVisuals ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAllVisuals ? "Collapse Visuals" : "Expand All Visuals"}</span>
            </button>

            <div className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs text-center font-bold">
              <span>Push-Ups + DB Plates</span>
              <span className="block text-[11px] font-normal text-slate-300">4×2.5k | 2×5k | 2×10k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Plate Load Calculator */}
      {showPlateCalculator && (
        <PlateLoadCalculator
          inventory={plateInventory}
          setInventory={setPlateInventory}
        />
      )}

      {/* Zero Pull-Up Bar Notice & Plate Guide */}
      <div className="glass-panel p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Pull-Up Bar Alternative Matrix:</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-white block">No Pull-Up Bar? No Problem!</span>
            <span className="text-[11px] text-slate-400">
              We replaced pull-ups with <strong>Heavy Two-Arm Rows (7.5kg/10kg)</strong>, <strong>Single-Arm Supported Rows</strong>, and <strong>Dumbbell Pullovers</strong> to build lat width and back thickness using your dumbbell plates.
            </span>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 text-xs font-bold shrink-0">
            100% Home Compatible
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {plateCombinations.map((p, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/40 transition-all text-xs"
            >
              <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                <span>{p.weight}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{p.setup}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Day Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DUMBBELL_WORKOUT_PLAN.map((day) => {
          const isSelected = selectedDayId === day.id;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-lg glow-emerald"
                  : "bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>{day.dayName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workout Day Detail & Rest Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercises List (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5 border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {activeWorkout.focus}
              </span>
              <h3 className="text-xl font-bold text-white">{activeWorkout.dayName}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {activeWorkout.recommendedCalorieBonus}
            </span>
          </div>

          {/* Exercises Cards with Visual Demonstration */}
          <div className="space-y-4">
            {activeWorkout.exercises.map((ex, exIdx) => {
              const loggedSets = workoutProgress[selectedDayId]?.[ex.id] || [];
              const completedCount = loggedSets.filter(Boolean).length;
              const isAllDone = completedCount === ex.sets;
              const guide = EXERCISE_VISUAL_GUIDES[ex.id] || {
                primaryMuscles: [ex.target],
                tempo: "2-0-2",
                svgType: "pushup_std",
              };

              const isCardExpanded =
                expandedCards[ex.id] !== undefined
                  ? expandedCards[ex.id]
                  : showAllVisuals;

              return (
                <div
                  key={ex.id}
                  className={`glass-card p-5 space-y-3.5 border transition-all ${
                    isAllDone
                      ? "border-emerald-500/40 bg-emerald-950/10"
                      : "border-slate-700/40 hover:border-slate-600"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center">
                          {exIdx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white">{ex.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target: <strong className="text-slate-200">{ex.target}</strong> • {ex.reps}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300">
                        {ex.recommendedWeight}
                      </span>
                      <button
                        onClick={() => toggleCardVisual(ex.id)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                          isCardExpanded
                            ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                        }`}
                        title={isCardExpanded ? "Hide Visual" : "Show Visual"}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {isCardExpanded ? "Hide Visual" : "Visualize"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Biomechanics Section */}
                  {isCardExpanded && (
                    <div className="animate-fadeIn">
                      <ExerciseVisualCard
                        exercise={ex}
                        guideData={guide}
                        onOpenModal={(e, g) => setModalExercise({ exercise: e, guide: g })}
                      />
                    </div>
                  )}

                  {/* Plate / Setup Guide */}
                  <div className="p-2.5 rounded-lg bg-slate-900/60 text-xs text-slate-300 flex items-start gap-2 border border-slate-800">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Form / Setup:</strong> {ex.plateGuide}</span>
                  </div>

                  {/* Interactive Sets Checkboxes */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Track Sets:</span>
                      {Array.from({ length: ex.sets }).map((_, setIdx) => {
                        const isDone = loggedSets[setIdx] || false;
                        return (
                          <button
                            key={setIdx}
                            onClick={() => toggleSetCompleted(ex.id, setIdx)}
                            className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center transition-all border ${
                              isDone
                                ? "bg-emerald-500 text-white border-emerald-400 shadow-sm"
                                : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white"
                            }`}
                          >
                            {isDone ? "✓" : `Set ${setIdx + 1}`}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setModalExercise({ exercise: ex, guide: guide })
                        }
                        className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 text-xs font-semibold flex items-center gap-1 border border-indigo-800/60"
                        title="Open step-by-step guide and tempo metronome"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Form Guide</span>
                      </button>

                      <button
                        onClick={() => startRestTimer(ex.restSec || 60)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 border border-slate-700"
                      >
                        <Timer className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{ex.restSec || 60}s Rest</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Tip */}
                  <p className="text-[11px] text-slate-400 italic">💡 Form Tip: {ex.tips}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Rest Timer & Hypertrophy Rules for 42kg */}
        <div className="space-y-6">
          {/* Active Rest Timer Box */}
          <div className="glass-panel p-6 border border-emerald-500/30 text-center space-y-4 sticky top-20">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                <Timer className="w-4 h-4 text-emerald-400" /> Rest Between Sets
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px]">
                {isRestTimerActive ? "Counting Down..." : "Ready"}
              </span>
            </div>

            <div className="py-2">
              <div className="text-5xl font-extrabold font-mono text-emerald-400 tracking-wider glow-emerald">
                {restSecondsLeft}s
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {[45, 60, 90, 120].map((s) => (
                <button
                  key={s}
                  onClick={() => startRestTimer(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    activeRestPreset === s && isRestTimerActive
                      ? "bg-emerald-500 text-white border-emerald-400"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {s}s
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsRestTimerActive(!isRestTimerActive)}
                className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md ${
                  isRestTimerActive
                    ? "bg-amber-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {isRestTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRestTimerActive ? "Pause Rest" : "Start Rest"}</span>
              </button>

              <button
                onClick={() => {
                  setIsRestTimerActive(false);
                  setRestSecondsLeft(60);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hypertrophy Rules for Underweight Gainer (42 kg) */}
          <div className="glass-panel p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Rules for Gaining Mass at 42 kg:</span>
            </h4>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Push-Up Progression:</strong> Start with standard floor push-ups. When you reach 15 reps easily, elevate feet on a chair for incline/decline chest overload!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Back Growth Without Pull-Up Bar:</strong> Heavy Two-Arm DB Rows (7.5kg/10kg) and DB Pullovers target the exact same lats and rhomboids as pull-ups.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Post-Workout Shake:</strong> Drink your oats + milk + peanut butter smoothie within 45 mins after lifting.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-Screen Biomechanics Visualizer Modal */}
      {modalExercise && (
        <WorkoutVisualizerModal
          isOpen={Boolean(modalExercise)}
          onClose={() => setModalExercise(null)}
          exercise={modalExercise.exercise}
          guideData={modalExercise.guide}
        />
      )}
    </div>
  );
}
