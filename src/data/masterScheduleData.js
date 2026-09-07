// Master Schedule Default Routine & Helper Utilities for Mind-Body Routine App

export const MASTER_TIME_BLOCKS = [
  {
    id: "morning",
    name: "Morning Focus & Nutrition",
    timeRange: "06:00 AM – 12:00 PM",
    iconName: "Sun",
    color: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    bg: "border-amber-500/30 bg-amber-950/10",
    accent: "from-amber-500/20 to-orange-500/10",
    description: "Metabolism activation, calorie loading smoothie, mindset alignment & GATE deep focus slot 1."
  },
  {
    id: "afternoon",
    name: "Afternoon Study & High-Protein Fuel",
    timeRange: "12:00 PM – 05:00 PM",
    iconName: "SunMedium",
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    bg: "border-cyan-500/30 bg-cyan-950/10",
    accent: "from-cyan-500/20 to-blue-500/10",
    description: "Soya/paneer lunch assimilation, aptitude speed drills, formula practice & hydration checks."
  },
  {
    id: "evening",
    name: "Evening Hypertrophy & Gainer Feast",
    timeRange: "05:00 PM – 09:00 PM",
    iconName: "Sunset",
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    bg: "border-emerald-500/30 bg-emerald-950/10",
    accent: "from-emerald-500/20 to-teal-500/10",
    description: "Pre-workout energy loading, dumbbell progressive overload, post-workout recovery & rich paneer dinner."
  },
  {
    id: "night",
    name: "Night Review & Deep Sleep Recovery",
    timeRange: "09:00 PM – 11:00 PM",
    iconName: "Moon",
    color: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    bg: "border-indigo-500/30 bg-indigo-950/10",
    accent: "from-indigo-500/20 to-purple-500/10",
    description: "GATE formula sheet revision, error log inspection, blue light cutoff & 8 hours of restorative sleep."
  },
];

export const SCHEDULE_CATEGORIES = [
  { id: "all", label: "All Items", color: "text-slate-200", bg: "bg-slate-800 border-slate-700" },
  { id: "Study", label: "GATE & Aptitude Study", color: "text-indigo-300", bg: "bg-indigo-500/20 border-indigo-500/40" },
  { id: "Diet", label: "Gainer Diet & Nutrition", color: "text-emerald-300", bg: "bg-emerald-500/20 border-emerald-500/40" },
  { id: "Workout", label: "Dumbbell Workout", color: "text-orange-300", bg: "bg-orange-500/20 border-orange-500/40" },
  { id: "Mindset", label: "Mindset & Hydration", color: "text-cyan-300", bg: "bg-cyan-500/20 border-cyan-500/40" },
];

export const DEFAULT_MASTER_ROUTINE = [
  {
    id: "rc1",
    title: "Morning Hydration (500ml water)",
    time: "07:00 AM",
    block: "morning",
    category: "Mindset",
    description: "Kickstart metabolic state & rehydrate brain after 8h sleep",
    done: true,
  },
  {
    id: "rc2",
    title: "High-Protein Gainer Smoothie (680 kcal)",
    time: "08:00 AM",
    block: "morning",
    category: "Diet",
    description: "Oats, Peanut Butter, Banana, Soy/Whole Milk (32g protein)",
    done: true,
  },
  {
    id: "rc3",
    title: "Mood Check & Emotional Shift Protocol",
    time: "09:00 AM",
    block: "morning",
    category: "Mindset",
    description: "Align focus and choose adaptive learning strategy for GATE prep",
    done: true,
  },
  {
    id: "rc4",
    title: "GATE Core Engineering Study Slot 1 (Pomodoro)",
    time: "09:30 AM",
    block: "morning",
    category: "Study",
    description: "Engineering Mathematics / Algorithms / Data Structures deep session",
    done: false,
  },
  {
    id: "rc5",
    title: "Mid-Morning Roasted Chana & Nuts Snack",
    time: "11:00 AM",
    block: "morning",
    category: "Diet",
    description: "320 kcal & 16g protein for sustained mental clarity and surplus",
    done: false,
  },
  {
    id: "rc6",
    title: "High-Protein Soya / Paneer Lunch (720 kcal)",
    time: "01:30 PM",
    block: "afternoon",
    category: "Diet",
    description: "Soya curry / Paneer with 3 Chapatis, Dal, and salad (38g protein)",
    done: false,
  },
  {
    id: "rc7",
    title: "RS Aggarwal Aptitude & Reasoning Drills",
    time: "03:00 PM",
    block: "afternoon",
    category: "Study",
    description: "Solve 10 speed practice questions & master shortcut tricks",
    done: false,
  },
  {
    id: "rc8",
    title: "Pre-Workout Peanut Butter Toast & Water",
    time: "05:00 PM",
    block: "evening",
    category: "Diet",
    description: "Glycogen top-up 30 mins before dumbbell lifting session",
    done: false,
  },
  {
    id: "rc9",
    title: "Dumbbell Muscle Hypertrophy Workout",
    time: "05:30 PM",
    block: "evening",
    category: "Workout",
    description: "Targeted push/pull/legs with 2.5kg / 5kg / 10kg plates",
    done: false,
  },
  {
    id: "rc10",
    title: "Post-Workout Milk & Protein Recovery",
    time: "06:30 PM",
    block: "evening",
    category: "Diet",
    description: "Rebuild muscle micro-tears with immediate amino acids",
    done: false,
  },
  {
    id: "rc11",
    title: "Calorie Surplus Paneer Dinner (550 kcal)",
    time: "08:30 PM",
    block: "evening",
    category: "Diet",
    description: "Casein slow-release protein for overnight muscle growth",
    done: false,
  },
  {
    id: "rc12",
    title: "GATE Formula Sheet Night Review & Sleep",
    time: "10:00 PM",
    block: "night",
    category: "Study",
    description: "Consolidate learning in memory, zero blue light, 8h sleep",
    done: false,
  },
];

// Helper to convert time strings (e.g. "07:00 AM", "01:30 PM", "14:00") into minutes from midnight for accurate sorting & block determination
export function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return 540; // Default 09:00 AM
  const cleaned = timeStr.trim().toUpperCase();

  const match12 = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const meridiem = match12[3];

    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  return 540;
}

// Determines the time block automatically if not explicitly specified
export function determineBlockForTime(timeStr, explicitBlock) {
  if (explicitBlock && ["morning", "afternoon", "evening", "night"].includes(explicitBlock)) {
    return explicitBlock;
  }
  const minutes = parseTimeToMinutes(timeStr);
  if (minutes >= 300 && minutes < 720) return "morning";    // 05:00 AM - 11:59 AM
  if (minutes >= 720 && minutes < 1020) return "afternoon"; // 12:00 PM - 04:59 PM
  if (minutes >= 1020 && minutes < 1260) return "evening";  // 05:00 PM - 08:59 PM
  return "night";                                          // 09:00 PM - 04:59 AM
}
