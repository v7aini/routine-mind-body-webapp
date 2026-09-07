// Default user profile personalized for 42 kg, 5'5" (165cm) Vegetarian Weight Gain & Muscle Hypertrophy
export const INITIAL_USER_PROFILE = {
  name: "Gainer Scholar",
  weightKg: 42,
  heightCm: 165, // 5'5"
  age: 21,
  gender: "Male/Female",
  activityLevel: "Moderate (Dumbbell 4x/week + GATE Prep)",
  targetWeightKg: 55,
  calorieTarget: 2500, // Caloric surplus for weight gain
  proteinTarget: 100, // grams
  carbTarget: 330, // grams
  fatTarget: 80, // grams
  waterTargetMl: 3500, // 3.5 Liters
  idleBreakIntervalMins: 45,
  dumbbellPlatesAvailable: [2.5, 5, 10], // in kg
  gateBranch: "Computer Science & Aptitude",
};

export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);
  let status = "Underweight";
  let color = "#ef4444";
  if (bmi >= 18.5 && bmi < 24.9) {
    status = "Normal Weight";
    color = "#10b981";
  } else if (bmi >= 25) {
    status = "Overweight";
    color = "#f59e0b";
  }
  return { bmi, status, color };
}
