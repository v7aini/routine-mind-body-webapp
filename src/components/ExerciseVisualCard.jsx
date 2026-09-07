import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Activity,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers,
  ArrowUp,
  ArrowDown,
  Info,
  Sliders,
  Check,
  X,
  AlertTriangle,
  Compass,
  Camera,
  Eye,
  ShieldCheck,
  FastForward,
  Gauge,
  Film,
  Video,
  Maximize2,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function ExerciseVisualCard({
  exercise,
  guideData,
  isExpanded = false,
  onOpenModal,
}) {
  // View modes: 'video' (HD Video Player) | 'reanimation' (Real Human Reanimation) | 'vector' (Angle Protractor)
  const [activeView, setActiveView] = useState("video");

  // Continuous animation progress (0.0 to 1.0)
  const [motionProgress, setMotionProgress] = useState(0);
  const [isMotionRunning, setIsMotionRunning] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.5, 1.0, 1.5
  const [repCount, setRepCount] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Stages: 1 = Stance/Start, 2 = Eccentric Lowering, 3 = Bottom Stretch, 4 = Concentric Peak Squeeze
  const [stage, setStage] = useState(1);
  const [viewMode, setViewMode] = useState("perfect"); // 'perfect' | 'mistake'

  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Continuous 60fps Biomechanical Motion Loop
  useEffect(() => {
    if (!isMotionRunning || activeView !== "reanimation") {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const duration = 3200 / playbackSpeed; // 3.2s per full rep cycle

    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        setMotionProgress((prev) => {
          const next = (prev + delta / duration) % 1.0;
          if (prev > 0.95 && next < 0.05) {
            setRepCount((r) => (r >= 12 ? 1 : r + 1));
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    };
  }, [isMotionRunning, playbackSpeed, activeView]);

  // Derived phase & frame blending calculation
  let currentPhaseText = "Controlled Lowering ⬇ (Inhale)";
  let currentPhaseColor = "text-cyan-300";
  let muscleIntensityPct = 50;
  let blendFactor = 0;

  if (motionProgress < 0.48) {
    blendFactor = motionProgress / 0.48;
    currentPhaseText = "Controlled Lowering ⬇ (Inhale 🫁)";
    currentPhaseColor = "text-cyan-300";
    muscleIntensityPct = Math.round(50 + blendFactor * 35);
  } else if (motionProgress < 0.60) {
    blendFactor = 1.0;
    currentPhaseText = "Deep Stretch & Pause ⏸ (Zero Momentum)";
    currentPhaseColor = "text-amber-300";
    muscleIntensityPct = 85;
  } else if (motionProgress < 0.94) {
    const driveProgress = (motionProgress - 0.60) / 0.34;
    blendFactor = 1.0 - driveProgress;
    currentPhaseText = "Explosive Drive ⬆ (Exhale 💨)";
    currentPhaseColor = "text-emerald-300";
    muscleIntensityPct = Math.round(85 + (1 - blendFactor) * 15);
  } else {
    blendFactor = 0;
    currentPhaseText = "Peak Muscle Squeeze ★ (Max Tension)";
    currentPhaseColor = "text-emerald-400";
    muscleIntensityPct = 100;
  }

  const svgType = guideData?.svgType || "pushup_std";
  const startImg = guideData?.motionFrames?.start || guideData?.humanImage;
  const endImg = guideData?.motionFrames?.end || guideData?.humanImage;
  const videoId = guideData?.youtubeVideoId || "IODxDxX7oi4";

  // Trajectory laser position
  const laserY = 15 + blendFactor * 70;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 overflow-hidden space-y-3.5 shadow-2xl">
      {/* Top View Selector Header */}
      <div className="px-4 pt-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {/* HD Video Tutorial Tab */}
          <button
            onClick={() => setActiveView("video")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeView === "video"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>HD Video Player</span>
          </button>

          {/* Real Human Reanimation Tab */}
          <button
            onClick={() => setActiveView("reanimation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeView === "reanimation"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md glow-emerald"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>60fps Motion Loop</span>
          </button>

          {/* Vector Protractor Tab */}
          <button
            onClick={() => setActiveView("vector")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeView === "vector"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Angle Protractor</span>
          </button>
        </div>

        {/* Best View Badge */}
        {guideData?.bestViewAngle && (
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40 flex items-center gap-1">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>{guideData.bestViewAngle.split(" (")[0]}</span>
          </span>
        )}
      </div>

      {/* Main Display Area */}
      <div className="relative px-3">
        {/* Mode 1: 🎬 1080p HD Video Player */}
        {activeView === "video" ? (
          <div className="space-y-2">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
                title={`${exercise.name} Video Tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Action & Fallback Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
              <span className="text-[11px] text-slate-400">
                Having playback issues?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveView("reanimation")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold flex items-center gap-1 transition-all"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Switch to 60fps Motion</span>
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1 transition-all"
                >
                  <span>Watch on YouTube ↗</span>
                </a>
              </div>
            </div>
          </div>
        ) : activeView === "reanimation" ? (
          /* Mode 2: 🏃 60fps Real Human Motion Reanimation */
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group h-64 sm:h-72">
            {/* Real Human Start Frame (Base) */}
            <img
              src={startImg}
              alt="Start Frame"
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-all duration-75"
              style={{
                opacity: 1 - blendFactor * 0.95,
                filter: `brightness(${1 + blendFactor * 0.05})`,
              }}
            />

            {/* Real Human End Frame (Cross-Dissolve Layer) */}
            <img
              src={endImg}
              alt="End Frame"
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-all duration-75"
              style={{
                opacity: blendFactor,
                filter: `brightness(${1 + (1 - blendFactor) * 0.05})`,
              }}
            />

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Live Trajectory Laser Indicator */}
            <div className="absolute top-0 bottom-0 left-6 w-1 pointer-events-none flex flex-col items-center justify-start">
              <div className="h-full w-0.5 bg-gradient-to-b from-indigo-500/20 via-emerald-400/40 to-cyan-500/20" />
              <div
                className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-lg glow-emerald transform -translate-x-1/2 transition-all duration-75"
                style={{ top: `${laserY}%` }}
              />
            </div>

            {/* Top HUD */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{guideData.bestViewAngle?.split(" (")[0] || "3/4 Lateral View"}</span>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-xs font-mono font-bold text-indigo-300 shadow">
                Rep {repCount}
              </div>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className={`font-mono font-bold ${currentPhaseColor}`}>{currentPhaseText}</span>
            </div>

            {/* Frame State Labels */}
            <div className="absolute bottom-12 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span className={`px-2 py-0.5 rounded bg-slate-900/80 border ${blendFactor < 0.5 ? "border-indigo-500 text-indigo-300 font-bold" : "border-slate-800 text-slate-400"}`}>
                {guideData?.motionFrames?.startLabel || "Frame 1: Setup"}
              </span>
              <span className={`px-2 py-0.5 rounded bg-slate-900/80 border ${blendFactor >= 0.5 ? "border-emerald-500 text-emerald-300 font-bold" : "border-slate-800 text-slate-400"}`}>
                {guideData?.motionFrames?.endLabel || "Frame 2: Contraction"}
              </span>
            </div>

            {/* Checkpoints */}
            {guideData?.checkpoints && (
              <div className="absolute bottom-2 left-3 right-3 flex flex-wrap items-center gap-1.5">
                {guideData.checkpoints.slice(0, 3).map((cp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-semibold text-slate-200 flex items-center gap-1 shadow"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{cp.label}: <strong className="text-white">{cp.value}</strong></span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Mode 3: 📐 Vector Joint Protractor */
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
            <svg viewBox="0 0 400 220" className="w-full h-60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl">
              <defs>
                <linearGradient id="vectorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <line x1="30" y1="180" x2="370" y2="180" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="200" cy={60 + blendFactor * 25} r="12" fill="#f8fafc" />
              <line x1="200" y1={72 + blendFactor * 25} x2="200" y2={135 + blendFactor * 25} stroke="url(#vectorGlow)" strokeWidth="10" strokeLinecap="round" />
              <circle cx="200" cy={100 + blendFactor * 25} r="14" fill="#10b981" opacity={muscleIntensityPct / 100} />
              <line x1="200" y1={135 + blendFactor * 25} x2="180" y2="180" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
              <line x1="200" y1={135 + blendFactor * 25} x2="220" y2="180" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="220" height="32" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                <text x="12" y="16" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                  Biomechanical Vector Tracer
                </text>
                <text x="12" y="27" fill="#34d399" fontSize="9">
                  Target Tension: {muscleIntensityPct}% Peak Contraction
                </text>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Interactive Rep Timeline Scrubber */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rep Cadence & Muscle Fiber Load:</span>
          </span>
          <span className="font-mono font-bold text-emerald-400">
            {muscleIntensityPct}% Fiber Load
          </span>
        </div>

        {/* Live Scrub Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setIsMotionRunning(false);
            setMotionProgress(Math.max(0, Math.min(1, clickPos)));
          }}
          className="relative w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden cursor-pointer"
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-75 rounded-full"
            style={{ width: `${Math.round(motionProgress * 100)}%` }}
          />
        </div>

        {/* Stage Timeline Jump Buttons */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {["1. Setup & Inhale", "2. Eccentric ⬇", "3. Stretch Pause", "4. Drive & Squeeze"].map((st, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveView("reanimation");
                setIsMotionRunning(false);
                setMotionProgress(idx * 0.25 + 0.05);
              }}
              className={`py-1 rounded text-center text-[10px] font-bold border transition-all ${
                Math.floor(motionProgress * 4) === idx && activeView === "reanimation"
                  ? "bg-indigo-600 text-white border-indigo-400 shadow"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Target Muscles Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-slate-400">Target Muscle Fire:</span>
          {guideData?.primaryMuscles?.map((m, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
            >
              <Flame className="w-3 h-3 text-emerald-400" />
              <span>{m}</span>
            </span>
          ))}
        </div>

        {/* Form Execution Cue */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Real Video Technique Instruction:</span>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              {guideData?.steps?.[Math.floor(motionProgress * 4)] || guideData?.proTip || "Perform with strict cadence and zero body momentum."}
            </p>
          </div>
        </div>

        {/* Full Screen Modal Trigger */}
        {onOpenModal && (
          <button
            onClick={() => onOpenModal(exercise, guideData)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600/30 via-indigo-600/30 to-emerald-600/30 hover:from-rose-600/50 hover:via-indigo-600/50 hover:to-emerald-600/50 text-white border border-indigo-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
          >
            <Video className="w-4 h-4 text-rose-400" />
            <span>Open HD Video Masterclass & Full Breakdown</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
