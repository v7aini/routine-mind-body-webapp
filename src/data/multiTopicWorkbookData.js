// High-Variety Multi-Topic Workbook Data Bank
// Each distinct question pattern has at most 2 variations (strictly <= 2 repetitions per template)

// 1. PROFIT AND LOSS
export const PROFIT_LOSS_SET = [
  // Pattern 1: Direct Profit/Cost Price (Var 1 & 2)
  {
    id: "pl_easy_1",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Easy",
    question: "An article is purchased for ₹450 and sold at a profit of 20%. What is the selling price of the article?",
    options: ["₹540", "₹520", "₹560", "₹490"],
    correctIndex: 0,
    explanation: "Step 1: Profit = 20% of ₹450 = 0.20 × 450 = ₹90.\nStep 2: Selling Price (SP) = Cost Price (CP) + Profit = ₹450 + ₹90 = ₹540.",
    tags: ["Profit & Loss", "Easy"],
  },
  {
    id: "pl_easy_2",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Easy",
    question: "An article is purchased for ₹600 and sold at a profit of 15%. What is the selling price of the article?",
    options: ["₹690", "₹660", "₹720", "₹650"],
    correctIndex: 0,
    explanation: "Step 1: Profit = 15% of ₹600 = 0.15 × 600 = ₹90.\nStep 2: SP = ₹600 + ₹90 = ₹690.",
    tags: ["Profit & Loss", "Easy"],
  },

  // Pattern 2: Loss Percentage to Cost Price (Var 1 & 2)
  {
    id: "pl_easy_3",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Easy",
    question: "A book is sold for ₹270 at a loss of 10%. What was the original cost price of the book?",
    options: ["₹300", "₹320", "₹290", "₹310"],
    correctIndex: 0,
    explanation: "Step 1: SP is 90% of CP.\nStep 2: 0.90 × CP = ₹270 => CP = 270 / 0.90 = ₹300.",
    tags: ["Profit & Loss", "Easy", "Loss"],
  },
  {
    id: "pl_easy_4",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Easy",
    question: "A watch is sold for ₹760 at a loss of 5%. What was the original cost price of the watch?",
    options: ["₹800", "₹820", "₹790", "₹850"],
    correctIndex: 0,
    explanation: "Step 1: SP is 95% of CP.\nStep 2: 0.95 × CP = ₹760 => CP = 760 / 0.95 = ₹800.",
    tags: ["Profit & Loss", "Easy", "Loss"],
  },

  // Pattern 3: Discount on Marked Price & Net Profit (Var 1 & 2)
  {
    id: "pl_med_1",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Medium",
    question: "A trader marks his goods at ₹2,000. He allows a discount of 10% and still makes a profit of 20%. Find the cost price of the goods.",
    options: ["₹1,500", "₹1,600", "₹1,400", "₹1,750"],
    correctIndex: 0,
    explanation: "Step 1: Selling Price after 10% discount = 0.90 × ₹2,000 = ₹1,800.\nStep 2: Profit is 20% => SP = 1.20 × CP.\nStep 3: CP = ₹1,800 / 1.20 = ₹1,500.",
    tags: ["Profit & Loss", "Medium", "Marked Price"],
  },
  {
    id: "pl_med_2",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Medium",
    question: "A shopkeeper marks an item at ₹3,200. He gives a discount of 15% and still makes a profit of 36%. Find the cost price of the item.",
    options: ["₹2,000", "₹2,200", "₹1,900", "₹2,400"],
    correctIndex: 0,
    explanation: "Step 1: SP = 85% of ₹3,200 = 0.85 × 3200 = ₹2,720.\nStep 2: CP = SP / (1 + 0.36) = ₹2,720 / 1.36 = ₹2,000.",
    tags: ["Profit & Loss", "Medium", "Marked Price"],
  },

  // Pattern 4: Successive Discounts (Var 1 & 2)
  {
    id: "pl_med_3",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Medium",
    question: "What is the single equivalent discount corresponding to two successive discounts of 20% and 10%?",
    options: ["28%", "30%", "26%", "25%"],
    correctIndex: 0,
    explanation: "Step 1: Formula for successive discounts d1 and d2 = d1 + d2 - (d1 × d2)/100.\nStep 2: Equivalent discount = 20 + 10 - (20 × 10)/100 = 30 - 2 = 28%.",
    tags: ["Profit & Loss", "Medium", "Successive Discounts"],
  },
  {
    id: "pl_med_4",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Medium",
    question: "What is the single equivalent discount corresponding to two successive discounts of 30% and 20%?",
    options: ["44%", "50%", "46%", "42%"],
    correctIndex: 0,
    explanation: "Step 1: Formula = d1 + d2 - (d1 × d2)/100.\nStep 2: Discount = 30 + 20 - (30 × 20)/100 = 50 - 6 = 44%.",
    tags: ["Profit & Loss", "Medium", "Successive Discounts"],
  },

  // Pattern 5: Converting Loss to Target Gain (Var 1 & 2)
  {
    id: "pl_hard_1",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Hard",
    question: "By selling an item for ₹1,320, a merchant loses 12%. At what selling price must he sell it to gain 25% profit?",
    options: ["₹1,875", "₹1,750", "₹1,920", "₹1,650"],
    correctIndex: 0,
    explanation: "Step 1: 88% of CP = ₹1,320 => CP = 1320 / 0.88 = ₹1,500.\nStep 2: Desired SP with 25% gain = 1.25 × ₹1,500 = ₹1,875.",
    tags: ["Profit & Loss", "Hard"],
  },
  {
    id: "pl_hard_2",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Hard",
    question: "By selling a machine for ₹1,700, a seller loses 15%. At what selling price must he sell it to gain 20% profit?",
    options: ["₹2,400", "₹2,250", "₹2,500", "₹2,100"],
    correctIndex: 0,
    explanation: "Step 1: 85% of CP = ₹1,700 => CP = 1700 / 0.85 = ₹2,000.\nStep 2: Desired SP with 20% profit = 1.20 × ₹2,000 = ₹2,400.",
    tags: ["Profit & Loss", "Hard"],
  },

  // Pattern 6: Dishonest Dealer & False Weights (Var 1 & 2)
  {
    id: "pl_hard_3",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Hard",
    question: "A dishonest dealer professes to sell his goods at cost price, but uses a false weight of 900 grams for a 1 kg weight. What is his gain percentage?",
    options: ["11.11%", "10%", "12.5%", "9.09%"],
    correctIndex: 0,
    explanation: "Step 1: Error in weight = 1000g - 900g = 100g.\nStep 2: True Value = 1000g; False Value = 900g.\nStep 3: Gain% = [Error / (True Value - Error)] × 100 = [100 / 900] × 100 = 11.11%.",
    tags: ["Profit & Loss", "Hard", "False Weights"],
  },
  {
    id: "pl_hard_4",
    category: "Aptitude Topic Sets",
    topic: "Profit & Loss",
    difficulty: "Hard",
    question: "A dishonest trader sells his goods at cost price, but uses a false weight of 800 grams instead of 1 kg. What is his gain percentage?",
    options: ["25%", "20%", "22.5%", "30%"],
    correctIndex: 0,
    explanation: "Step 1: Error = 200g; False Value = 800g.\nStep 2: Gain% = [200 / 800] × 100 = 25%.",
    tags: ["Profit & Loss", "Hard", "False Weights"],
  }
];

// 2. SPEED, TIME AND DISTANCE
export const SPEED_DISTANCE_SET = [
  // Pattern 1: Speed Conversion and Distance (Var 1 & 2)
  {
    id: "tsd_easy_1",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Easy",
    question: "A car travels at a speed of 72 km/h. How many meters does it cover in 25 seconds?",
    options: ["500 meters", "450 m", "600 m", "400 m"],
    correctIndex: 0,
    explanation: "Step 1: Speed in m/s = 72 × (5/18) = 20 m/s.\nStep 2: Distance = Speed × Time = 20 m/s × 25 s = 500 meters.",
    tags: ["Speed & Distance", "Easy"],
  },
  {
    id: "tsd_easy_2",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Easy",
    question: "A car travels at a speed of 54 km/h. How many meters does it cover in 30 seconds?",
    options: ["450 meters", "400 m", "500 m", "350 m"],
    correctIndex: 0,
    explanation: "Step 1: Speed in m/s = 54 × (5/18) = 15 m/s.\nStep 2: Distance = 15 m/s × 30 s = 450 meters.",
    tags: ["Speed & Distance", "Easy"],
  },

  // Pattern 2: Train Crossing a Stationary Object / Pole (Var 1 & 2)
  {
    id: "tsd_easy_3",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Easy",
    question: "A 180-meter long train is running at a speed of 90 km/h. How many seconds will it take to pass a telegraph pole?",
    options: ["7.2 seconds", "8.0 s", "6.5 s", "9.0 s"],
    correctIndex: 0,
    explanation: "Step 1: Speed = 90 × (5/18) = 25 m/s.\nStep 2: Time to cross a pole = Length of train / Speed = 180 / 25 = 7.2 seconds.",
    tags: ["Speed & Distance", "Easy", "Trains"],
  },
  {
    id: "tsd_easy_4",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Easy",
    question: "A 150-meter long train is running at a speed of 60 km/h. How many seconds will it take to pass a signal post?",
    options: ["9.0 seconds", "10.0 s", "8.5 s", "7.5 s"],
    correctIndex: 0,
    explanation: "Step 1: Speed = 60 × (5/18) = 50/3 m/s = 16.67 m/s.\nStep 2: Time = 150 / (50/3) = 150 × 3 / 50 = 9 seconds.",
    tags: ["Speed & Distance", "Easy", "Trains"],
  },

  // Pattern 3: Train Crossing a Platform (Var 1 & 2)
  {
    id: "tsd_med_1",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Medium",
    question: "A 200m long train running at 54 km/h crosses a platform of length 250m. How much time will it take to cross the platform completely?",
    options: ["30 seconds", "25 s", "35 s", "28 s"],
    correctIndex: 0,
    explanation: "Step 1: Total distance = Length of train + Length of platform = 200 + 250 = 450 meters.\nStep 2: Speed = 54 × (5/18) = 15 m/s.\nStep 3: Time = Total distance / Speed = 450 / 15 = 30 seconds.",
    tags: ["Speed & Distance", "Medium", "Platforms"],
  },
  {
    id: "tsd_med_2",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Medium",
    question: "A 180m long train running at 72 km/h crosses a platform of length 320m. How much time will it take to cross the platform completely?",
    options: ["25 seconds", "20 s", "30 s", "22 s"],
    correctIndex: 0,
    explanation: "Step 1: Total distance = 180 + 320 = 500 meters.\nStep 2: Speed = 72 × (5/18) = 20 m/s.\nStep 3: Time = 500 / 20 = 25 seconds.",
    tags: ["Speed & Distance", "Medium", "Platforms"],
  },

  // Pattern 4: Relative Speed (Two Trains Opposite Direction) (Var 1 & 2)
  {
    id: "tsd_med_3",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Medium",
    question: "Two trains of lengths 140m and 160m are running in opposite directions on parallel tracks at 40 km/h and 32 km/h respectively. In how many seconds will they cross each other completely?",
    options: ["15 seconds", "12 s", "18 s", "20 s"],
    correctIndex: 0,
    explanation: "Step 1: Total distance = 140 + 160 = 300 meters.\nStep 2: Relative speed in opposite directions = 40 + 32 = 72 km/h = 72 × (5/18) = 20 m/s.\nStep 3: Time = 300 / 20 = 15 seconds.",
    tags: ["Speed & Distance", "Medium", "Relative Speed"],
  },
  {
    id: "tsd_med_4",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Medium",
    question: "Two trains of lengths 120m and 180m are running in opposite directions at 50 km/h and 40 km/h respectively. In how many seconds will they cross each other?",
    options: ["12 seconds", "15 s", "10 s", "14 s"],
    correctIndex: 0,
    explanation: "Step 1: Total distance = 120 + 180 = 300m.\nStep 2: Relative speed = 50 + 40 = 90 km/h = 90 × (5/18) = 25 m/s.\nStep 3: Time = 300 / 25 = 12 seconds.",
    tags: ["Speed & Distance", "Medium", "Relative Speed"],
  },

  // Pattern 5: Boats and Streams (Round Trip / Speed of Stream) (Var 1 & 2)
  {
    id: "tsd_hard_1",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Hard",
    question: "A man can row at 9 km/h in still water. If the stream flows at 3 km/h, it takes him 3 hours to row to a place and return. How far away is the place?",
    options: ["12 km", "10 km", "15 km", "9 km"],
    correctIndex: 0,
    explanation: "Step 1: Downstream speed = 9 + 3 = 12 km/h; Upstream speed = 9 - 3 = 6 km/h.\nStep 2: Total time = D/12 + D/6 = 3 hours.\nStep 3: 3D/12 = 3 => D/4 = 3 => Distance D = 12 km.",
    tags: ["Speed & Distance", "Hard", "Boats & Streams"],
  },
  {
    id: "tsd_hard_2",
    category: "Aptitude Topic Sets",
    topic: "Speed & Distance",
    difficulty: "Hard",
    question: "A boat can travel at 15 km/h in still water. If the current flows at 5 km/h, it takes 4 hours for a round trip to a destination and back. How far away is the destination?",
    options: ["26.67 km", "30 km", "24 km", "20 km"],
    correctIndex: 0,
    explanation: "Step 1: Downstream = 15 + 5 = 20 km/h; Upstream = 15 - 5 = 10 km/h.\nStep 2: D/20 + D/10 = 4 => 3D/20 = 4 => D = 80/3 = 26.67 km.",
    tags: ["Speed & Distance", "Hard", "Boats & Streams"],
  }
];

// 3. WORK AND TIME
export const WORK_TIME_SET = [
  // Pattern 1: Basic Combined Work (Var 1 & 2)
  {
    id: "wt_easy_1",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Easy",
    question: "A can finish a job in 10 days and B can finish the same job in 15 days. Working together, in how many days will they complete the job?",
    options: ["6 days", "7.5 days", "5 days", "8 days"],
    correctIndex: 0,
    explanation: "Step 1: A's 1-day work = 1/10; B's 1-day work = 1/15.\nStep 2: Combined 1-day work = 1/10 + 1/15 = 5/30 = 1/6.\nStep 3: Total time required = 6 days.",
    tags: ["Work & Time", "Easy"],
  },
  {
    id: "wt_easy_2",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Easy",
    question: "A can finish a task in 12 days and B in 24 days. Working together, in how many days will they complete the task?",
    options: ["8 days", "9 days", "6 days", "10 days"],
    correctIndex: 0,
    explanation: "Step 1: A's 1-day work = 1/12; B's 1-day work = 1/24.\nStep 2: Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8.\nStep 3: Total days = 8 days.",
    tags: ["Work & Time", "Easy"],
  },

  // Pattern 2: Pipes and Cisterns (Filling and Emptying) (Var 1 & 2)
  {
    id: "wt_med_1",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Medium",
    question: "Pipe A can fill a tank in 12 hours and Pipe B can fill it in 15 hours. A drain Pipe C can empty the full tank in 20 hours. If all three pipes are opened simultaneously, in how many hours will the empty tank be filled?",
    options: ["10 hours", "12 hours", "8 hours", "15 hours"],
    correctIndex: 0,
    explanation: "Step 1: Net filling in 1 hour = 1/12 + 1/15 - 1/20.\nStep 2: LCM(12, 15, 20) = 60.\nStep 3: Net rate = (5 + 4 - 3)/60 = 6/60 = 1/10.\nStep 4: Time taken = 10 hours.",
    tags: ["Work & Time", "Medium", "Pipes"],
  },
  {
    id: "wt_med_2",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Medium",
    question: "Pipe A can fill a reservoir in 8 hours and Pipe B can fill it in 12 hours. Drain Pipe C can empty it in 24 hours. If all three pipes are opened together, how many hours will it take to fill the reservoir?",
    options: ["6 hours", "8 hours", "5 hours", "7 hours"],
    correctIndex: 0,
    explanation: "Step 1: Net rate = 1/8 + 1/12 - 1/24.\nStep 2: LCM = 24 => (3 + 2 - 1)/24 = 4/24 = 1/6.\nStep 3: Total time = 6 hours.",
    tags: ["Work & Time", "Medium", "Pipes"],
  },

  // Pattern 3: Men, Days, Hours Formula (M1×D1×H1 = M2×D2×H2) (Var 1 & 2)
  {
    id: "wt_hard_1",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Hard",
    question: "15 men working 8 hours a day can complete a project in 20 days. In how many days will 24 men working 5 hours a day complete the same work?",
    options: ["20 days", "18 days", "22 days", "15 days"],
    correctIndex: 0,
    explanation: "Step 1: Formula M1 × D1 × H1 = M2 × D2 × H2.\nStep 2: 15 × 20 × 8 = 24 × D2 × 5.\nStep 3: 2400 = 120 × D2 => D2 = 2400 / 120 = 20 days.",
    tags: ["Work & Time", "Hard", "Man-Hours"],
  },
  {
    id: "wt_hard_2",
    category: "Aptitude Topic Sets",
    topic: "Work & Time",
    difficulty: "Hard",
    question: "12 men working 9 hours a day can build a wall in 25 days. In how many days will 18 men working 6 hours a day build the same wall?",
    options: ["25 days", "20 days", "28 days", "22 days"],
    correctIndex: 0,
    explanation: "Step 1: 12 × 25 × 9 = 18 × D2 × 6.\nStep 2: 2700 = 108 × D2 => D2 = 2700 / 108 = 25 days.",
    tags: ["Work & Time", "Hard", "Man-Hours"],
  }
];

// 4. RATIO, PROPORTION AND AVERAGES
export const RATIO_AVERAGES_SET = [
  // Pattern 1: Mean / Average Calculation (Var 1 & 2)
  {
    id: "ratio_1",
    category: "Aptitude Topic Sets",
    topic: "Ratio & Averages",
    difficulty: "Easy",
    question: "Find the average of five consecutive even numbers: 22, 24, 26, 28, and 30.",
    options: ["26", "25", "27", "28"],
    correctIndex: 0,
    explanation: "Step 1: For evenly spaced numbers, the average is the middle number = 26.",
    tags: ["Ratio & Averages", "Easy"],
  },
  {
    id: "ratio_2",
    category: "Aptitude Topic Sets",
    topic: "Ratio & Averages",
    difficulty: "Easy",
    question: "Find the average of five consecutive odd numbers: 31, 33, 35, 37, and 39.",
    options: ["35", "34", "36", "37"],
    correctIndex: 0,
    explanation: "Step 1: For consecutive odd numbers, the average is the median middle value = 35.",
    tags: ["Ratio & Averages", "Easy"],
  },

  // Pattern 2: Weighted Average / Classroom Mix (Var 1 & 2)
  {
    id: "ratio_3",
    category: "Aptitude Topic Sets",
    topic: "Ratio & Averages",
    difficulty: "Medium",
    question: "In a class of 30 students, the average score is 80. In another section of 20 students, the average score is 90. What is the combined average score of both sections?",
    options: ["84", "85", "83", "86"],
    correctIndex: 0,
    explanation: "Step 1: Total score = (30 × 80) + (20 × 90) = 2400 + 1800 = 4200.\nStep 2: Total students = 30 + 20 = 50.\nStep 3: Combined Average = 4200 / 50 = 84.",
    tags: ["Ratio & Averages", "Medium"],
  },
  {
    id: "ratio_4",
    category: "Aptitude Topic Sets",
    topic: "Ratio & Averages",
    difficulty: "Medium",
    question: "Section A has 40 students with an average score of 70, and Section B has 60 students with an average score of 80. What is the overall average score?",
    options: ["76", "75", "78", "74"],
    correctIndex: 0,
    explanation: "Step 1: Total sum = (40 × 70) + (60 × 80) = 2800 + 4800 = 7600.\nStep 2: Total students = 100.\nStep 3: Combined Average = 7600 / 100 = 76.",
    tags: ["Ratio & Averages", "Medium"],
  }
];

// 5. GATE ENGINEERING MATHEMATICS & ALGORITHMS
export const GATE_MATH_ALGO_SET = [
  // Pattern 1: Trace and Determinant from Eigenvalues (Var 1 & 2)
  {
    id: "gate_1",
    category: "GATE Preparation",
    topic: "GATE Math & Algorithms",
    difficulty: "Easy",
    question: "A 2×2 matrix A has eigenvalues λ1 = 3 and λ2 = 7. What is the trace and determinant of matrix A?",
    options: ["Trace = 10, Determinant = 21", "Trace = 21, Determinant = 10", "Trace = 4, Determinant = 21", "Trace = 10, Determinant = 4"],
    correctIndex: 0,
    explanation: "Step 1: Trace of a matrix = Sum of eigenvalues = 3 + 7 = 10.\nStep 2: Determinant of a matrix = Product of eigenvalues = 3 × 7 = 21.",
    tags: ["GATE Math", "Linear Algebra"],
  },
  {
    id: "gate_2",
    category: "GATE Preparation",
    topic: "GATE Math & Algorithms",
    difficulty: "Easy",
    question: "A 2×2 matrix A has eigenvalues λ1 = -2 and λ2 = 5. What is the trace and determinant of matrix A?",
    options: ["Trace = 3, Determinant = -10", "Trace = -10, Determinant = 3", "Trace = 7, Determinant = -10", "Trace = 3, Determinant = 10"],
    correctIndex: 0,
    explanation: "Step 1: Trace = (-2) + 5 = 3.\nStep 2: Determinant = (-2) × 5 = -10.",
    tags: ["GATE Math", "Linear Algebra"],
  },

  // Pattern 2: Algorithm Time Complexity Derivations (Var 1 & 2)
  {
    id: "gate_3",
    category: "GATE Preparation",
    topic: "GATE Math & Algorithms",
    difficulty: "Medium",
    question: "What is the tight asymptotic time complexity of the recurrence relation T(n) = 2T(n/2) + O(n)?",
    options: ["Θ(n log n)", "Θ(n)", "Θ(n²)", "Θ(log n)"],
    correctIndex: 0,
    explanation: "Step 1: By Master Theorem: a = 2, b = 2, f(n) = n.\nStep 2: n^(log_b a) = n^(log_2 2) = n^1 = n.\nStep 3: Since f(n) = Θ(n^(log_b a)), this is Case 2: T(n) = Θ(n log n) (Merge Sort recurrence).",
    tags: ["GATE Algorithms", "Recurrence"],
  },
  {
    id: "gate_4",
    category: "GATE Preparation",
    topic: "GATE Math & Algorithms",
    difficulty: "Medium",
    question: "What is the tight asymptotic time complexity of the recurrence relation T(n) = 4T(n/2) + O(n)?",
    options: ["Θ(n²)", "Θ(n log n)", "Θ(n³)", "Θ(n)"],
    correctIndex: 0,
    explanation: "Step 1: Master Theorem: a = 4, b = 2, f(n) = n.\nStep 2: n^(log_b a) = n^(log_2 4) = n².\nStep 3: Since f(n) = O(n^(2 - ε)), this is Case 1: T(n) = Θ(n²).",
    tags: ["GATE Algorithms", "Recurrence"],
  }
];

export const ALL_MULTI_TOPIC_WORKBOOK = [
  ...PROFIT_LOSS_SET,
  ...SPEED_DISTANCE_SET,
  ...WORK_TIME_SET,
  ...RATIO_AVERAGES_SET,
  ...GATE_MATH_ALGO_SET,
];

