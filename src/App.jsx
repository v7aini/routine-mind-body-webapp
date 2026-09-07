import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MoodLearningEngine from "./components/MoodLearningEngine";
import WorkoutPlanner from "./components/WorkoutPlanner";
import DietTracker from "./components/DietTracker";
import HydrationIdleTracker from "./components/HydrationIdleTracker";
import DailySchedule from "./components/DailySchedule";
import PracticeModule from "./components/PracticeModule";
import WorkbookManager from "./components/WorkbookManager";

import { INITIAL_USER_PROFILE } from "./data/userProfileData";
import { DUMBBELL_WORKOUT_PLAN } from "./data/workoutData";
import { VEGETARIAN_DIET_PLAN } from "./data/dietData";
import { MOOD_MODEL } from "./data/moodStrategies";
import { DEFAULT_MASTER_ROUTINE } from "./data/masterScheduleData";
import { loadStorage, saveStorage, KEYS } from "./utils/storage";
import { deduplicateQuestions } from "./utils/deduplicateQuestions";
import { MADE_EASY_WORKBOOK_DATA } from "./data/madeEasyWorkbookData";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    return loadStorage(KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
  });

  // Water Log (ml)
  const [waterMl, setWaterMl] = useState(() => {
    return loadStorage(KEYS.WATER_LOG, 1250);
  });

  // Todays Logged Meals
  const [todaysMealsCompleted, setTodaysMealsCompleted] = useState(() => {
    return loadStorage(KEYS.DIET_LOG, [VEGETARIAN_DIET_PLAN.mealSchedule[0]]);
  });

  // Workout Progress
  const [workoutProgress, setWorkoutProgress] = useState(() => {
    return loadStorage(KEYS.WORKOUT_LOG, {});
  });

  // Current Mood State
  const [currentMood, setCurrentMood] = useState(() => {
    return loadStorage(KEYS.MOOD_LOG, MOOD_MODEL.neutral);
  });

  // Custom Workbook Questions (Pre-stocked with Made Easy Workbook from wbrapti.pdf)
  const [customQuestions, setCustomQuestions] = useState(() => {
    const saved = loadStorage("mbr_custom_questions", null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return deduplicateQuestions(saved, 2);
    }
    return deduplicateQuestions(MADE_EASY_WORKBOOK_DATA, 2);
  });

  // Telegram DRM Video Notes
  const [telegramNotes, setTelegramNotes] = useState(() => {
    return loadStorage("mbr_telegram_notes", [
      {
        id: "tg_1",
        channel: "GATE CS Private Group",
        title: "Dynamic Programming: 0/1 Knapsack State Equations",
        topic: "Algorithms",
        timestamp: "18:40",
        notes: "Key formula: dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]). Remember base case dp[0][w] = 0.",
        date: "Today",
      },
    ]);
  });

  // Solved Practice Questions
  const [solvedQuestions, setSolvedQuestions] = useState(() => {
    return loadStorage(KEYS.SOLVED_QUESTIONS || "mbr_solved_questions", []);
  });

  // Dumbbell Plate Inventory (4 x 2.5kg, 2 x 5kg, 2 x 10kg)
  const [plateInventory, setPlateInventory] = useState(() => {
    return loadStorage("mbr_plate_inventory", { p2_5: 4, p5: 2, p10: 2 });
  });

  // Daily Routine Checklist
  const [routineChecklist, setRoutineChecklist] = useState(() => {
    return loadStorage(KEYS.ROUTINE_CHECKLIST, DEFAULT_MASTER_ROUTINE);
  });

  // Save changes to localStorage
  useEffect(() => {
    saveStorage(KEYS.USER_PROFILE, userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveStorage(KEYS.WATER_LOG, waterMl);
  }, [waterMl]);

  useEffect(() => {
    saveStorage(KEYS.DIET_LOG, todaysMealsCompleted);
  }, [todaysMealsCompleted]);

  useEffect(() => {
    saveStorage(KEYS.WORKOUT_LOG, workoutProgress);
  }, [workoutProgress]);

  useEffect(() => {
    saveStorage(KEYS.MOOD_LOG, currentMood);
  }, [currentMood]);

  useEffect(() => {
    saveStorage(KEYS.ROUTINE_CHECKLIST, routineChecklist);
  }, [routineChecklist]);

  useEffect(() => {
    saveStorage("mbr_custom_questions", customQuestions);
  }, [customQuestions]);

  useEffect(() => {
    saveStorage("mbr_telegram_notes", telegramNotes);
  }, [telegramNotes]);

  useEffect(() => {
    saveStorage("mbr_solved_questions", solvedQuestions);
  }, [solvedQuestions]);

  useEffect(() => {
    saveStorage("mbr_plate_inventory", plateInventory);
  }, [plateInventory]);

  const toggleRoutineItem = (id) => {
    setRoutineChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const todayWorkout = DUMBBELL_WORKOUT_PLAN[0];
  const todayWorkoutDone = false;

  return (
    <div className="min-h-screen pb-12">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        waterMl={waterMl}
        currentMood={currentMood}
        todayWorkoutDone={todayWorkoutDone}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4">
        {activeTab === "dashboard" && (
          <Dashboard
            userProfile={userProfile}
            currentMood={currentMood}
            setActiveTab={setActiveTab}
            waterMl={waterMl}
            setWaterMl={setWaterMl}
            todaysMealsCompleted={todaysMealsCompleted}
            workoutProgress={workoutProgress}
            todayWorkout={todayWorkout}
            routineChecklist={routineChecklist}
            toggleRoutineItem={toggleRoutineItem}
          />
        )}

        {activeTab === "mood" && (
          <MoodLearningEngine
            currentMood={currentMood}
            setCurrentMood={setCurrentMood}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "workout" && (
          <WorkoutPlanner
            workoutProgress={workoutProgress}
            setWorkoutProgress={setWorkoutProgress}
            userProfile={userProfile}
            plateInventory={plateInventory}
            setPlateInventory={setPlateInventory}
          />
        )}

        {activeTab === "diet" && (
          <DietTracker
            todaysMealsCompleted={todaysMealsCompleted}
            setTodaysMealsCompleted={setTodaysMealsCompleted}
            userProfile={userProfile}
          />
        )}

        {activeTab === "hydration" && (
          <HydrationIdleTracker
            waterMl={waterMl}
            setWaterMl={setWaterMl}
            userProfile={userProfile}
          />
        )}

        {activeTab === "schedule" && (
          <DailySchedule
            routineChecklist={routineChecklist}
            setRoutineChecklist={setRoutineChecklist}
          />
        )}

        {activeTab === "practice" && (
          <PracticeModule
            currentMood={currentMood}
            setActiveTab={setActiveTab}
            customQuestions={customQuestions}
            solvedQuestions={solvedQuestions}
            setSolvedQuestions={setSolvedQuestions}
          />
        )}

        {activeTab === "workbook" && (
          <WorkbookManager
            customQuestions={customQuestions}
            setCustomQuestions={setCustomQuestions}
            telegramNotes={telegramNotes}
            setTelegramNotes={setTelegramNotes}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Mind-Body Routine Hub • Personalized for 42 kg, 5'5" Vegetarian Gainer & GATE Scholar</span>
          <span>Dumbbell Plates: 2.5kg | 5kg | 10kg • Telegram DRM Vault & VS Code Practice</span>
        </div>
      </footer>
    </div>
  );
}
