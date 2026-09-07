import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Brain,
  Dumbbell,
  UtensilsCrossed,
  Droplets,
  CalendarCheck,
  BookOpen,
  FolderPlus,
  Sparkles,
  Flame,
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  userProfile,
  waterMl,
  currentMood,
  todayWorkoutDone,
}) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "mood", label: "Mood Adaptive Learning", icon: Brain, badge: currentMood ? currentMood.icon : null },
    { id: "workout", label: "Dumbbell Routine", icon: Dumbbell, indicator: todayWorkoutDone },
    { id: "diet", label: "Veg Gainer Diet", icon: UtensilsCrossed },
    { id: "hydration", label: "Water & Idle Break", icon: Droplets },
    { id: "schedule", label: "Master Schedule", icon: CalendarCheck },
    { id: "practice", label: "GATE/Aptitude Practice", icon: BookOpen },
    { id: "workbook", label: "Workbook & Video Vault", icon: FolderPlus },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 py-3 mb-6 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & User Profile Info */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 flex items-center justify-center text-white shadow-lg glow-indigo">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
                Mind-Body Routine Hub
              </h1>
            </div>
          </div>

          {/* Clock & Water Mini Status */}
          <div className="flex md:hidden items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
              {timeStr}
            </span>
          </div>
        </div>

        {/* Live Clock & Quick Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/50 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-slate-200">{timeStr}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-medium">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>{(waterMl / 1000).toFixed(1)}L / {(userProfile.waterTargetMl / 1000).toFixed(1)}L</span>
          </div>

          {currentMood && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-200 font-medium">
              <span>{currentMood.icon}</span>
              <span>{currentMood.label}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-300 font-medium">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>2.5kg | 5kg | 10kg Plates</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md glow-indigo border border-indigo-400/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && <span className="text-xs">{item.badge}</span>}
                {item.indicator && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
