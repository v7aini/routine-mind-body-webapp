import React from "react";
import {
  Brain,
  Dumbbell,
  UtensilsCrossed,
  Droplets,
  Timer,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { calculateBMI } from "../data/userProfileData";
import MidSessionShiftWidget from "./MidSessionShiftWidget";
import { MOOD_MODEL } from "../data/moodStrategies";

export default function Dashboard({
  userProfile,
  currentMood,
  setCurrentMood,
  setActiveTab,
  waterMl,
  setWaterMl,
  todaysMealsCompleted,
  workoutProgress,
  todayWorkout,
  routineChecklist,
  toggleRoutineItem,
}) {
  const { bmi, status } = calculateBMI(userProfile.weightKg, userProfile.heightCm);

  // Calculate Calorie & Protein totals from completed meals
  const totalCaloriesLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProteinLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.protein || 0), 0);

  const waterPercent = Math.min(100, Math.round((waterMl / userProfile.waterTargetMl) * 100));
  const caloriePercent = Math.min(100, Math.round((totalCaloriesLogged / userProfile.calorieTarget) * 100));
  const proteinPercent = Math.min(100, Math.round((totalProteinLogged / userProfile.proteinTarget) * 100));

  // Weight gain progress: 42kg to 55kg (13kg total target)
  const weightGainedSoFar = userProfile.weightKg - 42;
  const weightProgressPercent = Math.max(5, Math.min(100, Math.round((weightGainedSoFar / (userProfile.targetWeightKg - 42)) * 100)));

  return (
    <div className="space-y-6">
      {/* Welcome Banner & Mood Adaptive Bar */}
      <div className="glass-panel p-6 border-l-4 border-indigo-500 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Vegetarian Muscle & Weight Gainer Protocol
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-400" />
                2.5kg / 5kg / 10kg Plates Ready
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {userProfile.name}! 👋
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Current stats: <strong className="text-white">{userProfile.weightKg} kg</strong> (5'5", BMI {bmi} - {status}). Target: <strong className="text-emerald-400">{userProfile.targetWeightKg} kg</strong> lean muscle bulk + GATE/Aptitude mastery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("mood")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg glow-indigo transition-all transform hover:scale-[1.02]"
            >
              <Brain className="w-4 h-4" />
              <span>Shift Mood & Study Strategy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mid-Session Mood Shift & Activity Switcher Algorithm Widget */}
      <MidSessionShiftWidget
        setActiveTab={setActiveTab}
        setWaterMl={setWaterMl}
        setCurrentMood={setCurrentMood}
        MOOD_MODEL={MOOD_MODEL}
      />

      {/* Grid Row 1: Key Metrics (Weight, Calorie Surplus, Protein, Water) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weight Gain Card */}
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weight Goal</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{userProfile.weightKg}</span>
            <span className="text-sm text-slate-400">/ {userProfile.targetWeightKg} kg</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Goal: +13 kg Mass</span>
              <span className="text-emerald-400 font-medium">{weightProgressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${weightProgressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Hypertrophy surplus diet active</span>
          </p>
        </div>

        {/* Veg Calories Card */}
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Veg Calorie Surplus</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalCaloriesLogged}</span>
            <span className="text-sm text-slate-400">/ {userProfile.calorieTarget} kcal</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span className="text-amber-400 font-medium">{caloriePercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${caloriePercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Remaining: <strong className="text-amber-300">{Math.max(0, userProfile.calorieTarget - totalCaloriesLogged)} kcal</strong>
          </p>
        </div>

        {/* Protein Target Card */}
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protein Target</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalProteinLogged}g</span>
            <span className="text-sm text-slate-400">/ {userProfile.proteinTarget}g</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Muscle Synthesis</span>
              <span className="text-rose-400 font-medium">{proteinPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Paneer & Soya Chunks logged: <strong className="text-rose-300">{todaysMealsCompleted.length} meals</strong>
          </p>
        </div>

        {/* Hydration Card */}
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Hydration</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{(waterMl / 1000).toFixed(1)}L</span>
            <span className="text-sm text-slate-400">/ 3.5L</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Goal</span>
              <span className="text-cyan-400 font-medium">{waterPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Quick add:</span>
            <button
              onClick={() => setWaterMl((prev) => Math.min(5000, prev + 250))}
              className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30"
            >
              +250 ml
            </button>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Mood Adaptive Learning Spotlight & Dumbbell Workout Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Adaptive Strategy Banner */}
        <div className={`glass-panel p-6 relative overflow-hidden bg-gradient-to-br ${currentMood.bgGradient}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-2xl bg-white/10 border border-white/20">
                {currentMood.icon}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                  Current Emotional State
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {currentMood.label}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("mood")}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 flex items-center gap-1"
            >
              <span>Change Mood</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-sm text-slate-200 mb-4 bg-black/20 p-3 rounded-lg border border-white/10 italic">
            "{currentMood.quote}"
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>Recommended Study Topics for this Mood:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentMood.recommendedSubjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white/15 text-white border border-white/20"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-300">
              Strategy: <strong>{currentMood.studyStrategy}</strong>
            </span>
            <button
              onClick={() => setActiveTab("practice")}
              className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-100"
            >
              <span>Launch Practice Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dumbbell Routine Spotlight */}
        <div className="glass-panel p-6 border border-emerald-500/20 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  Today's Dumbbell Workout
                </span>
                <h3 className="text-lg font-bold text-white">{todayWorkout.dayName}</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("workout")}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center gap-1"
            >
              <span>View Full Routine</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <p className="text-xs text-slate-300">
              Focus: <strong className="text-white">{todayWorkout.focus}</strong>
            </p>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Available Plates: <strong>2.5kg, 5kg, 10kg</strong> (e.g. 5kg + 2.5kg = 7.5kg per arm)</span>
            </div>
          </div>

          <div className="space-y-2">
            {todayWorkout.exercises.slice(0, 3).map((ex) => (
              <div
                key={ex.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200">{ex.name}</span>
                  <span className="text-slate-400 ml-2">({ex.sets} sets × {ex.reps})</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px] px-2 py-0.5 bg-emerald-950/60 rounded border border-emerald-800/50">
                  {ex.recommendedWeight}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Exercises: {todayWorkout.exercises.length}</span>
            <button
              onClick={() => setActiveTab("workout")}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium flex items-center gap-1"
            >
              <span>Start Workout Timer</span>
              <Timer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Daily Habit Routine Checklist */}
      <div className="glass-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Daily Gainer & Study Routine Checklist</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
              {routineChecklist.filter((i) => i.done).length} / {routineChecklist.length} Completed
            </span>
            <button
              onClick={() => setActiveTab("schedule")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Manage Master Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {routineChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleRoutineItem(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                item.done
                  ? "bg-indigo-950/40 border-indigo-500/40 text-slate-300"
                  : "bg-slate-800/40 border-slate-700/50 text-white hover:border-slate-600 hover:bg-slate-800/60"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  item.done
                    ? "bg-indigo-500 text-white"
                    : "border border-slate-500 bg-slate-900"
                }`}
              >
                {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold ${item.done ? "line-through text-slate-400" : "text-slate-200"}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono shrink-0">{item.time}</span>
                </div>
                {item.category && (
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-900 text-indigo-300 border border-slate-800">
                      {item.category}
                    </span>
                  </div>
                )}
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
