import React from "react";
import { VEGETARIAN_DIET_PLAN } from "../data/dietData";
import {
  UtensilsCrossed,
  CheckCircle2,
  Zap,
  Flame,
  Wheat,
  PieChart,
  Plus,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function DietTracker({
  todaysMealsCompleted,
  setTodaysMealsCompleted,
  userProfile,
}) {
  const toggleMealCompleted = (meal) => {
    setTodaysMealsCompleted((prev) => {
      const exists = prev.some((m) => m.id === meal.id);
      if (exists) {
        return prev.filter((m) => m.id !== meal.id);
      } else {
        return [...prev, meal];
      }
    });
  };

  const totalCaloriesLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProteinLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbsLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFatsLogged = todaysMealsCompleted.reduce((acc, m) => acc + (m.fats || 0), 0);

  const caloriePct = Math.min(100, Math.round((totalCaloriesLogged / userProfile.calorieTarget) * 100));
  const proteinPct = Math.min(100, Math.round((totalProteinLogged / userProfile.proteinTarget) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbsLogged / userProfile.carbTarget) * 100));
  const fatsPct = Math.min(100, Math.round((totalFatsLogged / userProfile.fatTarget) * 100));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-amber-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Vegetarian Hypertrophy Diet Plan
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              High-Protein Veg Mass Gainer Diet
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Specially calculated for your <strong>42 kg</strong> starting body weight. High-density liquid shakes, Soya chunks, and Paneer platters to achieve <strong>2,500 kcal surplus and 100g protein</strong> daily.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-bold text-center">
              Target: 2,500 kcal / 100g Protein
            </div>
          </div>
        </div>
      </div>

      {/* Macro Targets Tracker Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Progress */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase">Surplus Calories</span>
            <span className="text-amber-400 font-bold">{caloriePct}%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white">{totalCaloriesLogged}</span>
            <span className="text-xs text-slate-400">/ {userProfile.calorieTarget} kcal</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
              style={{ width: `${caloriePct}%` }}
            />
          </div>
        </div>

        {/* Protein Progress */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase">Veg Protein</span>
            <span className="text-rose-400 font-bold">{proteinPct}%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white">{totalProteinLogged}g</span>
            <span className="text-xs text-slate-400">/ {userProfile.proteinTarget}g</span>
          </div>
          <div className="w-full h-full max-h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
              style={{ width: `${proteinPct}%` }}
            />
          </div>
        </div>

        {/* Carbs Progress */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase">Carbohydrates</span>
            <span className="text-emerald-400 font-bold">{carbsPct}%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white">{totalCarbsLogged}g</span>
            <span className="text-xs text-slate-400">/ {userProfile.carbTarget}g</span>
          </div>
          <div className="w-full h-full max-h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${carbsPct}%` }}
            />
          </div>
        </div>

        {/* Healthy Fats Progress */}
        <div className="glass-card p-5 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase">Healthy Fats</span>
            <span className="text-cyan-400 font-bold">{fatsPct}%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white">{totalFatsLogged}g</span>
            <span className="text-xs text-slate-400">/ {userProfile.fatTarget}g</span>
          </div>
          <div className="w-full h-full max-h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
              style={{ width: `${fatsPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Meal Schedule & High-Protein Food Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Preset Meal Schedule (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Today's Vegetarian Meal Schedule:</span>
          </h3>

          <div className="space-y-4">
            {VEGETARIAN_DIET_PLAN.mealSchedule.map((meal) => {
              const isDone = todaysMealsCompleted.some((m) => m.id === meal.id);
              return (
                <div
                  key={meal.id}
                  className={`glass-card p-5 space-y-3 border transition-all ${
                    isDone
                      ? "border-amber-500/40 bg-amber-950/10"
                      : "border-slate-700/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                          {meal.time}
                        </span>
                        <h4 className="text-base font-bold text-white">{meal.title}</h4>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleMealCompleted(meal)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        isDone
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isDone ? "Meal Logged ✓" : "Mark Ate Meal"}</span>
                    </button>
                  </div>

                  {/* Meal Macros breakdown */}
                  <div className="flex flex-wrap gap-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
                      🔥 {meal.calories} kcal
                    </span>
                    <span className="px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50">
                      💪 {meal.protein}g Protein
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                      🌾 {meal.carbs}g Carbs
                    </span>
                    <span className="px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                      🥑 {meal.fats}g Fats
                    </span>
                  </div>

                  {/* Food Items List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Ingredients & Portion:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-200">
                      {meal.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-slate-900/40 p-2 rounded border border-slate-800">
                          <span className="text-amber-400">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    💡 <strong>Mass Gainer Tip:</strong> {meal.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High Protein Vegetarian Food Density Cheat Sheet */}
        <div className="space-y-6">
          <div className="glass-panel p-5 space-y-4 border border-amber-500/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Top High-Protein Veg Foods (Per 100g):</span>
            </h4>

            <div className="space-y-2.5">
              {VEGETARIAN_DIET_PLAN.highProteinFoodsList.map((food, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{food.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-white">{food.name}</span>
                      <span className="block text-[10px] text-slate-400">{food.calories}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50">
                    {food.protein}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
