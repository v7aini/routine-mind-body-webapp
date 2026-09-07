import React, { useState } from "react";
import {
  Zap,
  Dumbbell,
  Droplets,
  UtensilsCrossed,
  Video,
  BookOpen,
  ArrowRight,
  Sparkles,
  RefreshCw,
  X,
  Flame,
} from "lucide-react";

export default function MidSessionShiftWidget({ setActiveTab, setWaterMl, setCurrentMood, MOOD_MODEL }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const shiftMatrix = {
    restless: {
      label: "Restless / Angry / High Physical Energy 😡",
      color: "border-rose-500 bg-rose-950/20 text-rose-300",
      reason: "High adrenaline makes sitting still difficult. Channel this physical energy directly into muscle hypertrophy!",
      recommendations: [
        {
          title: "Shift to Dumbbell Hypertrophy Workout",
          icon: Dumbbell,
          actionText: "Open 15-Min Dumbbell Routine (5kg/10kg)",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white glow-emerald",
          onClick: () => {
            if (MOOD_MODEL?.angry) setCurrentMood(MOOD_MODEL.angry);
            setActiveTab("workout");
            setIsOpen(false);
          },
        },
        {
          title: "Shift to Speed Aptitude Time Trial",
          icon: Zap,
          actionText: "Launch 5-Min Speed Quiz",
          btnColor: "bg-indigo-600 hover:bg-indigo-500 text-white glow-indigo",
          onClick: () => {
            if (MOOD_MODEL?.angry) setCurrentMood(MOOD_MODEL.angry);
            setActiveTab("practice");
            setIsOpen(false);
          },
        },
      ],
    },

    drowsy: {
      label: "Drowsy / Brain Fog / Low Energy 😴",
      color: "border-amber-500 bg-amber-950/20 text-amber-300",
      reason: "Low blood glucose or dehydration reduces prefrontal cortex function. Replenish hydration and fast calories!",
      recommendations: [
        {
          title: "Hydration & High-Protein Gainer Snack",
          icon: Droplets,
          actionText: "Drink +250ml Water & Check Veg Gainer Shake",
          btnColor: "bg-cyan-600 hover:bg-cyan-500 text-white glow-cyan",
          onClick: () => {
            setWaterMl((prev) => Math.min(5000, prev + 250));
            setActiveTab("hydration");
            setIsOpen(false);
          },
        },
        {
          title: "2-Minute Posture Stretch Break",
          icon: RefreshCw,
          actionText: "Do 2-Min Neck & Shoulder Stretch",
          btnColor: "bg-amber-600 hover:bg-amber-500 text-white glow-amber",
          onClick: () => {
            setActiveTab("hydration");
            setIsOpen(false);
          },
        },
      ],
    },

    overwhelmed: {
      label: "Overwhelmed / Stressed / High Friction 🤯",
      color: "border-purple-500 bg-purple-950/20 text-purple-300",
      reason: "Cognitive overload. High-stress math creates friction. Switch to low-friction visual learning or verbal reasoning.",
      recommendations: [
        {
          title: "Shift to Passive GATE Video Vault",
          icon: Video,
          actionText: "Open Telegram Lecture Notes & Videos",
          btnColor: "bg-purple-600 hover:bg-purple-500 text-white glow-purple",
          onClick: () => {
            if (MOOD_MODEL?.depressed) setCurrentMood(MOOD_MODEL.depressed);
            setActiveTab("workbook");
            setIsOpen(false);
          },
        },
        {
          title: "Shift to Verbal Reasoning Vocabulary",
          icon: BookOpen,
          actionText: "Practice Verbal & Syllogisms",
          btnColor: "bg-indigo-600 hover:bg-indigo-500 text-white glow-indigo",
          onClick: () => {
            if (MOOD_MODEL?.sad) setCurrentMood(MOOD_MODEL.sad);
            setActiveTab("practice");
            setIsOpen(false);
          },
        },
      ],
    },

    bored: {
      label: "Bored / Demotivated / Sluggish 🥱",
      color: "border-indigo-500 bg-indigo-950/20 text-indigo-300",
      reason: "Dopamine deficiency. Break monotony with gamified problem solving or quick physical movement.",
      recommendations: [
        {
          title: "Gamified Aptitude Quiz Challenge",
          icon: Sparkles,
          actionText: "Solve 5 Puzzles & Earn XP",
          btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white glow-emerald",
          onClick: () => {
            if (MOOD_MODEL?.demotivated) setCurrentMood(MOOD_MODEL.demotivated);
            setActiveTab("practice");
            setIsOpen(false);
          },
        },
        {
          title: "Light Dumbbell Bicep Curls (5kg)",
          icon: Dumbbell,
          actionText: "1 Set of 12 Curls for Quick Dopamine",
          btnColor: "bg-amber-600 hover:bg-amber-500 text-white glow-amber",
          onClick: () => {
            setActiveTab("workout");
            setIsOpen(false);
          },
        },
      ],
    },
  };

  const activeShift = selectedFeeling ? shiftMatrix[selectedFeeling] : null;

  return (
    <div className="my-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-between shadow-lg glow-amber transition-all transform hover:scale-[1.01]"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Mood Changed Mid-Study? Run Dynamic Activity Shift Algorithm</span>
          </div>
          <span className="px-2.5 py-1 rounded bg-black/30 border border-white/20 text-[11px]">
            Shift Activity Now →
          </span>
        </button>
      ) : (
        <div className="glass-panel p-6 border-2 border-indigo-500/50 space-y-4 animate-fade-in relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">
                Mid-Session Activity Shift Algorithm
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-300">
            Select your current mid-study feeling below to let the algorithm route you to the optimal activity (Workout, Hydration Gainer, Passive Video Vault, or Speed Practice):
          </p>

          {/* Feeling Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {Object.keys(shiftMatrix).map((key) => {
              const item = shiftMatrix[key];
              const isSelected = selectedFeeling === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFeeling(key)}
                  className={`p-3 rounded-xl border font-bold text-center transition-all ${
                    isSelected
                      ? `${item.color} shadow-lg scale-105`
                      : "bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Recommended Pivot Actions */}
          {activeShift && (
            <div className={`p-4 rounded-xl border space-y-3 ${activeShift.color}`}>
              <div className="text-xs text-slate-200">
                💡 <strong>Algorithm Diagnosis:</strong> {activeShift.reason}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {activeShift.recommendations.map((rec, idx) => {
                  const Icon = rec.icon;
                  return (
                    <button
                      key={idx}
                      onClick={rec.onClick}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center justify-between shadow-md transition-all ${rec.btnColor}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{rec.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
