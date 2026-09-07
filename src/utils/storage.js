// LocalStorage persistence utility for Mind & Body Routine App

const KEYS = {
  USER_PROFILE: "mbr_user_profile",
  WATER_LOG: "mbr_water_log",
  WORKOUT_LOG: "mbr_workout_log",
  DIET_LOG: "mbr_diet_log",
  MOOD_LOG: "mbr_mood_log",
  STUDY_LOG: "mbr_study_log",
  ROUTINE_CHECKLIST: "mbr_routine_checklist",
};

export function getTodayKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

export function loadStorage(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
    return fallback;
  }
}

export { KEYS };
