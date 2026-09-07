// Comprehensive Mood-Based Adaptive Cognitive & Emotional Regulation Model
// Tailored for GATE Preparation, Aptitude & Verbal Reasoning

export const MOOD_MODEL = {
  angry: {
    id: "angry",
    label: "Angry / Agitated",
    icon: "🔥",
    color: "#ef4444", // Red
    bgGradient: "from-red-950/80 to-rose-900/50",
    description: "High physiological arousal & cortisol. Sitting idle will cause rumination.",
    moodShiftProtocol: [
      "1️⃣ Physical Discharge: Do 15 fast pushups or a 2-minute 5kg dumbbell set to vent excess adrenaline.",
      "2️⃣ Box Breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s (Repeat 4 times to calm amygdala).",
      "3️⃣ Channel Fire: Direct your aggressive energy into intense timed problem solving.",
    ],
    recommendedSubjects: [
      "Speed Aptitude Drills",
      "Verbal Reasoning Spotting Errors & Syllogisms",
      "GATE Practice Problem Sprint (Time-bound)",
    ],
    studyStrategy: "Fast-Paced High Intensity Problem Solving",
    pomodoroConfig: { work: 20, break: 5 },
    quote: "Turn your anger into explosive focus. Channel the heat into solving problems fast!",
  },

  depressed: {
    id: "depressed",
    label: "Depressed / Low Energy",
    icon: "🌧️",
    color: "#6366f1", // Indigo
    bgGradient: "from-indigo-950/80 to-slate-900/50",
    description: "Low dopamine & high friction. Executive function feels paralyzed.",
    moodShiftProtocol: [
      "1️⃣ Micro-Win Rule: Commit to ONLY 5 minutes of low-stress reading. You can stop after if needed.",
      "2️⃣ Water & Light: Drink 300ml water and stand in bright sunlight or room light for 2 mins.",
      "3️⃣ No Guilt: Lower your immediate bar. Any single formula learned today is a major victory.",
    ],
    recommendedSubjects: [
      "GATE Concept Videos & Animated Walkthroughs",
      "Formula Sheet Review & Micro Flashcards",
      "Elementary Logic & Series Puzzles",
    ],
    studyStrategy: "Low-Friction Passive Learning & Micro-Wins",
    pomodoroConfig: { work: 15, break: 10 },
    quote: "You don't need motivation to start; action creates motivation. Just watch one short video.",
  },

  sad: {
    id: "sad",
    label: "Sad / Emotional",
    icon: "💧",
    color: "#3b82f6", // Blue
    bgGradient: "from-blue-950/80 to-sky-950/50",
    description: "Introspective and emotionally vulnerable. Abstract heavy math feels overwhelming.",
    moodShiftProtocol: [
      "1️⃣ Express & Release: Spend 2 minutes writing down your feelings on paper, then close the notebook.",
      "2️⃣ Environment Boost: Play soothing instrumentals or ambient rain audio.",
      "3️⃣ Gentle Start: Pick a narrative or verbal-heavy topic to ease your brain back into flow.",
    ],
    recommendedSubjects: [
      "Verbal Reasoning Reading Comprehension & Vocabulary",
      "GATE Historical Solved Question Analysis",
      "Aptitude Data Interpretation (Charts & Graphs)",
    ],
    studyStrategy: "Reflective & Verbal-Oriented Gentle Study",
    pomodoroConfig: { work: 25, break: 5 },
    quote: "Be kind to yourself today. Progress at a gentle pace is still powerful progress.",
  },

  stressed: {
    id: "stressed",
    label: "Stressed / Anxious",
    icon: "⚡",
    color: "#f59e0b", // Amber
    bgGradient: "from-amber-950/80 to-yellow-950/50",
    description: "Overwhelmed by syllabus or exam pressure. Attention is scattered.",
    moodShiftProtocol: [
      "1️⃣ Physiological Sigh: Take 2 deep inhales through nose, 1 long exhale through mouth (Repeat 3 times).",
      "2️⃣ Syllabus Deconstruction: Pick just ONE small sub-topic and hide everything else.",
      "3️⃣ Solved Examples First: Read step-by-step solved GATE answers instead of starting from scratch.",
    ],
    recommendedSubjects: [
      "GATE Step-by-Step Solved PYQs (Previous Year Questions)",
      "Quantitative Aptitude Formula Applications",
      "Verbal Critical Reasoning",
    ],
    studyStrategy: "Guided Step-by-Step Problem Deconstruction",
    pomodoroConfig: { work: 25, break: 5 },
    quote: "You don't have to conquer the whole exam today—just master this single topic.",
  },

  demotivated: {
    id: "demotivated",
    label: "Demotivated / Bored",
    icon: "🥱",
    color: "#8b5cf6", // Purple
    bgGradient: "from-purple-950/80 to-slate-900/50",
    description: "Boredom or lack of clear reward. Energy feels flat.",
    moodShiftProtocol: [
      "1️⃣ Cold Water Reset: Splash cold water on your face and stretch your shoulders.",
      "2️⃣ Gamify Study: Set a challenge — can you solve 5 questions in 15 minutes?",
      "3️⃣ Reward Contract: Plan a tasty high-protein snack (like peanut butter toast) right after this session.",
    ],
    recommendedSubjects: [
      "Interactive Aptitude Quiz Challenges",
      "GATE Rapid-Fire Multiple Choice Flashcards",
      "Verbal Analogy Puzzles",
    ],
    studyStrategy: "Gamified Quiz Challenges & Speed Tests",
    pomodoroConfig: { work: 20, break: 5 },
    quote: "Small actions destroy boredom. Turn study into a mini game and win the round!",
  },

  happy: {
    id: "happy",
    label: "Happy / Energetic",
    icon: "🌟",
    color: "#10b981", // Emerald
    bgGradient: "from-emerald-950/80 to-teal-950/50",
    description: "High dopamine, high cognitive capacity, peak neuroplasticity. Ideal for heavy concepts!",
    moodShiftProtocol: [
      "1️⃣ Immediate Flow Launch: Turn off notifications right away to protect your high-energy state.",
      "2️⃣ Tackle the Elephant: Open the hardest GATE topic you've been avoiding.",
      "3️⃣ Long Deep Work: Set a 50-minute deep focus block.",
    ],
    recommendedSubjects: [
      "Core GATE Engineering Concepts (Algorithms, Math, Signals, Core Branch)",
      "Complex GATE Multi-Step Numerical Questions",
      "Advanced Aptitude Logical Deduction",
    ],
    studyStrategy: "Deep-Work Core GATE Engineering Topics",
    pomodoroConfig: { work: 50, break: 10 },
    quote: "You're in prime condition! Strike while the iron is hot and conquer tough GATE subjects!",
  },

  neutral: {
    id: "neutral",
    label: "Neutral / Calm",
    icon: "🧘",
    color: "#06b6d4", // Cyan
    bgGradient: "from-cyan-950/80 to-slate-900/50",
    description: "Balanced, steady baseline energy. Ready for structured daily tasks.",
    moodShiftProtocol: [
      "1️⃣ Review Daily Schedule: Check your morning/afternoon study blocks.",
      "2️⃣ Warm Up: Do 2 warm-up Aptitude questions.",
      "3️⃣ Standard Pomodoro: Maintain steady 25m work / 5m rest routine.",
    ],
    recommendedSubjects: [
      "Standard Daily GATE Syllabus Schedule",
      "Quantitative Aptitude Practice Sets",
      "Verbal Reasoning & Grammar Rules",
    ],
    studyStrategy: "Balanced Standard Study Routine",
    pomodoroConfig: { work: 25, break: 5 },
    quote: "Consistency is king. A calm mind builds relentless steady momentum.",
  },
};
