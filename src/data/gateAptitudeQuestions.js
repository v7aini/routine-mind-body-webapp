// Interactive Practice Flashcards & Questions for GATE, Aptitude, Verbal Reasoning & Algorithms
export const PRACTICE_QUESTIONS = [
  // --- QUANTITATIVE APTITUDE ---
  {
    id: "q1",
    category: "Quantitative Aptitude",
    topic: "Work and Time",
    difficulty: "Medium",
    question: "If A can finish a job in 12 days working alone, and B can finish the same job in 24 days, how long will it take for A and B to finish the job together?",
    options: ["6 days", "8 days", "10 days", "16 days"],
    correctIndex: 1, // 8 days
    explanation: "Step 1: Calculate A's 1-day work rate = 1/12.\nStep 2: Calculate B's 1-day work rate = 1/24.\nStep 3: Combined 1-day work rate = 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8.\nStep 4: Total days required together = 1 / (1/8) = 8 days.",
    tags: ["Aptitude", "Fast Practice"],
  },
  {
    id: "q2",
    category: "Quantitative Aptitude",
    topic: "Ratio and Proportion",
    difficulty: "Easy",
    question: "The ratio of two numbers is 3:5. If 9 is subtracted from each, the ratio becomes 12:23. What is the smaller number?",
    options: ["27", "33", "36", "55"],
    correctIndex: 1, // 33
    explanation: "Step 1: Let the two numbers be 3x and 5x.\nStep 2: According to problem, (3x - 9)/(5x - 9) = 12/23.\nStep 3: Cross multiply: 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108.\nStep 4: Simplify: 9x = 99 => x = 11.\nStep 5: Smaller number = 3x = 3 * 11 = 33.",
    tags: ["Aptitude", "Algebra"],
  },
  {
    id: "q3",
    category: "Quantitative Aptitude",
    topic: "Permutations & Combinations",
    difficulty: "Medium",
    question: "In how many different ways can the letters of the word 'LEADING' be arranged such that the vowels always come together?",
    options: ["360", "480", "720", "5040"],
    correctIndex: 2, // 720
    explanation: "Step 1: Identify vowels in 'LEADING': E, A, I (3 vowels).\nStep 2: Treat the group (EAI) as 1 single block + 4 remaining consonants (L, D, N, G) = 5 items total.\nStep 3: 5 items can be arranged in 5! = 120 ways.\nStep 4: The 3 vowels (E, A, I) can arrange among themselves in 3! = 6 ways.\nStep 5: Total arrangements = 120 * 6 = 720 ways.",
    tags: ["Aptitude", "P&C"],
  },

  // --- VERBAL REASONING ---
  {
    id: "v1",
    category: "Verbal Reasoning",
    topic: "Sentence Completion & Vocabulary",
    difficulty: "Easy",
    question: "Select the word that is most nearly OPPOSITE in meaning to 'METICULOUS':",
    options: ["Careless", "Precise", "Painstaking", "Scrupulous"],
    correctIndex: 0, // Careless
    explanation: "Explanation:\n'Meticulous' means taking extreme care and showing great attention to precise details.\n'Careless' means showing lack of attention or thought.\nTherefore, 'Careless' is the exact antonym.",
    tags: ["Verbal", "Antonyms"],
  },
  {
    id: "v2",
    category: "Verbal Reasoning",
    topic: "Syllogism",
    difficulty: "Medium",
    question: "Statements: All cats are animals. All animals are mammals.\nConclusions:\nI. All cats are mammals.\nII. Some mammals are cats.",
    options: ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
    correctIndex: 2, // Both I and II follow
    explanation: "Step 1: Set representation: Cats ⊆ Animals and Animals ⊆ Mammals.\nStep 2: By transitivity of subsets, Cats ⊆ Mammals. Thus, 'All cats are mammals' is TRUE (Conclusion I follows).\nStep 3: Since Cats exist inside Mammals, there exist some elements in Mammals that are Cats. Thus, 'Some mammals are cats' is TRUE (Conclusion II follows).",
    tags: ["Verbal", "Logic"],
  },
  
  // --- LOGICAL REASONING ---
  {
    id: "r1",
    category: "Verbal Reasoning",
    topic: "Logical Reasoning",
    difficulty: "Medium",
    question: "If A is the brother of B; B is the sister of C; and C is the father of D, how is D related to A?",
    options: ["Nephew", "Niece", "Nephew or Niece", "Cannot be determined"],
    correctIndex: 2, // Nephew or Niece
    explanation: "Step 1: A is male (brother of B).\nStep 2: B is female (sister of C).\nStep 3: C is male (father of D).\nStep 4: A is the uncle of D because C is A's brother.\nStep 5: The gender of D is not specified, so D can be either a nephew or a niece to A.",
    tags: ["Reasoning", "Blood Relations"],
  },
  {
    id: "r2",
    category: "Verbal Reasoning",
    topic: "Logical Reasoning",
    difficulty: "Hard",
    question: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
    options: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "MFEDJJOE"],
    correctIndex: 0, // EOJDJEFM
    explanation: "Step 1: Reverse the word: 'COMPUTER' -> 'RETUPMOC'.\nStep 2: Shift each letter by +1, except the first and last remain unchanged? Wait, actually: C->R, O->F... No, the logic is: Reverse the letters first. Then for each letter except first and last, shift by +1? Let's trace it properly: 'COMPUTER' -> 'C' to 'C', 'R' to 'R' at ends? No, the code is 'RFUVQNPC'.\nFirst letter R is last letter of COMPUTER. Last letter C is first letter of COMPUTER. The middle letters OMPUTE are reversed to ETUPMO, and then each shifted +1 -> FUVQNP.\nSo 'MEDICINE' -> E (last letter), EDICIN reversed is NICIDE. Shift NICIDE +1 -> OJD JEF. Last letter is M (first letter). Result: E + OJDJEF + M = EOJDJEFM.",
    tags: ["Reasoning", "Coding Decoding"],
  },

  // --- GATE CORE ALGORITHMS & UI DATA STRUCTURES ---
  {
    id: "alg1",
    category: "GATE Algorithms",
    topic: "Dynamic Programming (0/1 Knapsack)",
    difficulty: "Hard",
    question: "What is the time complexity of solving the 0/1 Knapsack problem using Dynamic Programming with N items and maximum capacity W?",
    options: ["O(N log N)", "O(2^N)", "O(N * W)", "O(N + W)"],
    correctIndex: 2, // O(N * W)
    explanation: "Step 1: Dynamic Programming uses a 2D table dp[N+1][W+1].\nStep 2: There are (N+1) * (W+1) states in the DP matrix.\nStep 3: Each state transition takes O(1) time using dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]]).\nStep 4: Total time complexity = O(N * W). Note: This is pseudo-polynomial because W depends on numeric value.",
    tags: ["GATE", "Algorithms", "DP"],
  },
  {
    id: "alg2",
    category: "GATE Algorithms",
    topic: "Binary Search Tree Traversal",
    difficulty: "Medium",
    question: "Which tree traversal order on a Binary Search Tree (BST) produces elements in strictly ascending sorted order?",
    options: ["Pre-order Traversal", "In-order Traversal", "Post-order Traversal", "Level-order Traversal"],
    correctIndex: 1, // In-order Traversal
    explanation: "Step 1: In-order traversal follows the sequence: Left Subtree -> Root -> Right Subtree.\nStep 2: By definition of BST, all nodes in Left Subtree < Root < all nodes in Right Subtree.\nStep 3: Visiting Left -> Root -> Right recursively guarantees elements are visited in sorted ascending order.",
    tags: ["GATE", "Data Structures", "BST"],
  },
  {
    id: "alg3",
    category: "GATE Algorithms",
    topic: "Sorting Algorithms Complexity",
    difficulty: "Hard",
    question: "What is the worst-case time complexity of QuickSort when the pivot element is always chosen as the smallest element in an already sorted array?",
    options: ["O(N log N)", "O(N)", "O(N^2)", "O(log N)"],
    correctIndex: 2, // O(N^2)
    explanation: "Step 1: When array is already sorted and smallest element is pivot, partition splits array into 0 items and N-1 items.\nStep 2: Recurrence relation becomes: T(N) = T(N-1) + O(N).\nStep 3: Expanding recurrence: N + (N-1) + (N-2) + ... + 1 = N(N+1)/2 = O(N^2).\nStep 4: Mitigation: Use Randomized QuickSort or Median-of-Three pivot strategy.",
    tags: ["GATE", "Algorithms", "Sorting"],
  },
  {
    id: "alg4",
    category: "GATE Preparation",
    topic: "Linear Algebra Eigenvalues",
    difficulty: "Medium",
    question: "If a 3x3 matrix A has eigenvalues 1, 2, and -3, what is the trace and determinant of matrix A?",
    options: [
      "Trace = 0, Determinant = -6",
      "Trace = 6, Determinant = 0",
      "Trace = -6, Determinant = 6",
      "Trace = 3, Determinant = 6",
    ],
    correctIndex: 0, // Trace = 0, Det = -6
    explanation: "Step 1: Trace of a matrix = sum of its eigenvalues = 1 + 2 + (-3) = 0.\nStep 2: Determinant of a matrix = product of its eigenvalues = 1 * 2 * (-3) = -6.\nStep 3: Result: Trace = 0, Determinant = -6.",
    tags: ["GATE", "Linear Algebra"],
  },
];
