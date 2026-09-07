import React, { useState, useEffect } from "react";
import { PRACTICE_QUESTIONS } from "../data/gateAptitudeQuestions";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Plus,
  ListFilter,
  Eye,
  EyeOff,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { deduplicateQuestions } from "../utils/deduplicateQuestions";
import confetti from "canvas-confetti";

export default function PracticeModule({ currentMood, setActiveTab, customQuestions = [], solvedQuestions = [], setSolvedQuestions }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [viewSolved, setViewSolved] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Combine default practice questions with custom workbook questions and enforce max 2 occurrences per template
  const allQuestions = deduplicateQuestions([...PRACTICE_QUESTIONS, ...customQuestions], 2);

  const defaultCategories = [
    "Quantitative Aptitude",
    "Verbal Reasoning",
    "GATE Algorithms",
    "GATE Preparation"
  ];
  const customCategories = [...new Set(customQuestions.map(q => q.category))].filter(c => c !== "Custom Workbook" && c !== "Aptitude Topic Sets");
  
  const categories = ["All", ...new Set([...defaultCategories, ...customCategories])];

  // 1. Filter by category
  const categoryFilteredQuestions =
    selectedCategory === "All"
      ? allQuestions
      : allQuestions.filter((q) => q.category === selectedCategory || (selectedCategory === "Workbook 1" && (q.category === "Custom Workbook" || q.category === "Aptitude Topic Sets"))); // Fallback for old custom questions

  // 2. Extract unique topics for the selected category
  const availableTopics = ["All Topics", ...new Set(categoryFilteredQuestions.map(q => q.topic).filter(Boolean))];

  // 3. Filter by topic
  const topicFilteredQuestions = 
    selectedTopic === "All Topics" 
      ? categoryFilteredQuestions 
      : categoryFilteredQuestions.filter(q => q.topic === selectedTopic);

  // 4. Split into solved and unsolved
  const solvedList = topicFilteredQuestions.filter(q => solvedQuestions.includes(q.id));
  const unsolvedList = topicFilteredQuestions.filter(q => !solvedQuestions.includes(q.id));

  // 5. Select active list based on view mode
  const activeQuestionList = viewSolved ? solvedList : unsolvedList;
  const activeQuestion = activeQuestionList[currentQuestionIndex] || activeQuestionList[0];

  // Reset index if out of bounds (e.g. when lists change)
  useEffect(() => {
    if (activeQuestionList.length > 0 && currentQuestionIndex >= activeQuestionList.length) {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  }, [activeQuestionList, currentQuestionIndex]);

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    
    if (selectedOption === activeQuestion.correctIndex) {
      setScore((prev) => prev + 10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      // Mark as solved if not already
      if (!solvedQuestions.includes(activeQuestion.id)) {
        setSolvedQuestions(prev => [...prev, activeQuestion.id]);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < activeQuestionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < activeQuestionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentQuestionIndex(Math.max(0, activeQuestionList.length - 1));
    }
  };

  const handleRevealSolution = () => {
    setIsAnswerSubmitted(true);
    if (selectedOption === null) {
      setSelectedOption(activeQuestion.correctIndex);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const resetStateOnChange = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-emerald-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Interactive GATE, Algorithms & Aptitude Practice Arena
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Aptitude, Verbal, GATE Algorithms & Workbook Arena
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Currently tuned for your <strong>{currentMood?.label || "Calm"}</strong> state. Step-by-step explanations provided after every question.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setActiveTab("workbook")}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md glow-purple"
            >
              <Plus className="w-4 h-4" />
              <span>Import Workbook Question</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Score: {score} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar flex-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTopic("All Topics");
                resetStateOnChange();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-lg glow-emerald"
                  : "bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Toggle Solved View */}
        <button
          onClick={() => {
            setViewSolved(!viewSolved);
            resetStateOnChange();
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
            viewSolved
              ? "bg-amber-600 text-white border-amber-500 shadow-lg glow-amber"
              : "bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {viewSolved ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{viewSolved ? "Back to Unsolved" : "View Solved"}</span>
        </button>
      </div>

      {/* Topics Dropdown (only show if category has specific topics) */}
      {availableTopics.length > 2 && (
        <div className="flex items-center gap-3">
          <ListFilter className="w-4 h-4 text-slate-400" />
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {availableTopics.map(topic => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  resetStateOnChange();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedTopic === topic
                    ? "bg-slate-700 text-white border-slate-500"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-slate-400 font-medium">
          {viewSolved ? "Viewing Solved Questions" : "Viewing Unsolved Questions"}
        </span>
        <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          {activeQuestionList.length} {activeQuestionList.length === 1 ? "Question" : "Questions"} Available
        </span>
      </div>

      {/* Main Question Flashcard Box */}
      {activeQuestion ? (
        <div className="glass-panel p-6 space-y-6 border border-emerald-500/30 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-emerald-400 border border-slate-700">
                {activeQuestion.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/50">
                Topic: {activeQuestion.topic}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-800/50">
                {activeQuestion.difficulty}
              </span>
              {viewSolved && (
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-amber-600/20 text-amber-400 border border-amber-600/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Solved
                </span>
              )}
            </div>

            {/* Top Navigation & Skip Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevQuestion}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-300 font-mono font-bold whitespace-nowrap px-2">
                {currentQuestionIndex + 1} / {activeQuestionList.length}
              </span>

              <button
                onClick={handleSkipQuestion}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1"
                title="Skip to Next Question"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug whitespace-pre-line">
              {activeQuestion.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = activeQuestion.correctIndex === idx;

              let btnStyle = "bg-slate-800/40 border-slate-700/50 text-slate-200 hover:border-slate-500";
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold glow-emerald";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 font-bold";
                }
              } else if (isSelected) {
                btnStyle = "bg-indigo-950/80 border-indigo-500 text-white font-bold glow-indigo";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Bar with Skip Button, Check Answer & Solutions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {!isAnswerSubmitted ? (
                <>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                      selectedOption !== null
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white glow-emerald"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    }`}
                  >
                    <span>Check Answer</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  {/* Dedicated Skip Button */}
                  <button
                    type="button"
                    onClick={handleSkipQuestion}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Skip Question</span>
                  </button>

                  {/* Reveal Solution Button */}
                  <button
                    type="button"
                    onClick={handleRevealSolution}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Show Solution</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg glow-indigo"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleRetryQuestion}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </>
              )}
            </div>

            {/* Quick Prev Navigation in bottom bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevQuestion}
                className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleSkipQuestion}
                className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Explanation Box (Visible after submission or reveal) */}
          {isAnswerSubmitted && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/40 space-y-2 animate-fade-in">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Step-by-Step Solution & Detailed Concept Explanation:</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-mono bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                {activeQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel p-8 text-center text-slate-400 text-sm flex flex-col items-center justify-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-600" />
          <div>
            <p className="font-bold text-white text-lg">
              {viewSolved 
                ? "No solved questions here yet!" 
                : "You've solved all questions in this section!"}
            </p>
            <p className="text-slate-400 mt-1">
              {viewSolved
                ? "Answer questions in the unsolved tab to see them here."
                : "Great job! Try exploring other topics or import new workbook questions."}
            </p>
          </div>
          {viewSolved && (
            <button 
              onClick={() => {
                setViewSolved(false);
                resetStateOnChange();
              }}
              className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              Go to Unsolved
            </button>
          )}
        </div>
      )}
    </div>
  );
}

