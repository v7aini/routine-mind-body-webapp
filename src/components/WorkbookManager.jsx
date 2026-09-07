import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Video,
  Code,
  CheckCircle2,
  Lock,
  Sparkles,
  ExternalLink,
  Trash2,
  FileText,
  Terminal,
  ShieldAlert,
  Upload,
  Layers,
  FileCode,
  Folder,
  Filter,
  FileType,
  Loader2,
} from "lucide-react";
import { ALL_PARTNERSHIP_WORKBOOK, PARTNERSHIP_EASY, PARTNERSHIP_MEDIUM, PARTNERSHIP_HARD } from "../data/partnershipWorkbookData";
import { ALL_MULTI_TOPIC_WORKBOOK, PROFIT_LOSS_SET, SPEED_DISTANCE_SET, WORK_TIME_SET, RATIO_AVERAGES_SET, GATE_MATH_ALGO_SET } from "../data/multiTopicWorkbookData";
import { MADE_EASY_WORKBOOK_DATA } from "../data/madeEasyWorkbookData";
import { APTITUDE_TOPICS } from "../data/aptitudeTopics";
import { extractQuestionsFromPDF } from "../utils/pdfParser";
import { deduplicateQuestions } from "../utils/deduplicateQuestions";
import confetti from "canvas-confetti";

export default function WorkbookManager({
  customQuestions,
  setCustomQuestions,
  telegramNotes,
  setTelegramNotes,
  setActiveTab,
}) {
  const [activeSubTab, setActiveSubTab] = useState("bulk"); // bulk | builder | telegram | vscode

  // Single Question Form State
  const [qWorkbook, setQWorkbook] = useState("Workbook 1");
  const [qTopic, setQTopic] = useState(APTITUDE_TOPICS[0]);
  const [qDifficulty, setQDifficulty] = useState("Medium");
  const [qQuestion, setQQuestion] = useState("");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [correctIdx, setCorrectIdx] = useState(0);
  const [qExplanation, setQExplanation] = useState("");
  const [formSaved, setFormSaved] = useState(false);

  // Bulk Importer Raw Text State
  const [bulkText, setBulkText] = useState("");
  const [bulkImportStatus, setBulkImportStatus] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // Telegram Note Form State
  const [tgChannel, setTgChannel] = useState("");
  const [tgTitle, setTgTitle] = useState("");
  const [tgTopic, setTgTopic] = useState("");
  const [tgTimestamp, setTgTimestamp] = useState("");
  const [tgNotes, setTgNotes] = useState("");

  const handleAddSingleQuestion = (e) => {
    e.preventDefault();
    if (!qQuestion.trim() || !opt0.trim() || !opt1.trim()) return;

    const newQ = {
      id: "wb_" + Date.now(),
      category: qWorkbook, // Store the workbook name as category
      topic: qTopic,
      difficulty: qDifficulty,
      question: qQuestion,
      options: [opt0, opt1, opt2 || "Option C", opt3 || "Option D"],
      correctIndex: parseInt(correctIdx),
      explanation: qExplanation || "Step-by-step workbook explanation added by user.",
      tags: ["Custom Workbook"],
    };

    setCustomQuestions((prev) => [newQ, ...prev]);
    setFormSaved(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });

    // Reset Form
    setQQuestion("");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setQExplanation("");
    setTimeout(() => setFormSaved(false), 3000);
  };

  // Load Pre-Stocked Topic Sets (500+ Questions)
  const handleLoadTopicSet = (topicName) => {
    let toAdd = [];
    if (topicName === "partnership_all") toAdd = ALL_PARTNERSHIP_WORKBOOK;
    if (topicName === "partnership_easy") toAdd = PARTNERSHIP_EASY;
    if (topicName === "partnership_med") toAdd = PARTNERSHIP_MEDIUM;
    if (topicName === "partnership_hard") toAdd = PARTNERSHIP_HARD;

    if (topicName === "made_easy_all") toAdd = MADE_EASY_WORKBOOK_DATA;

    if (topicName === "profit_loss") toAdd = PROFIT_LOSS_SET;
    if (topicName === "speed_distance") toAdd = SPEED_DISTANCE_SET;
    if (topicName === "work_time") toAdd = WORK_TIME_SET;
    if (topicName === "ratios") toAdd = RATIO_AVERAGES_SET;
    if (topicName === "gate_math") toAdd = GATE_MATH_ALGO_SET;

    if (topicName === "master_pdf_all") {
      toAdd = [...MADE_EASY_WORKBOOK_DATA, ...ALL_PARTNERSHIP_WORKBOOK, ...ALL_MULTI_TOPIC_WORKBOOK];
    }

    setCustomQuestions((prev) => {
      const existingIds = new Set(prev.map((q) => q.id));
      const newItems = toAdd.filter((q) => !existingIds.has(q.id));
      return deduplicateQuestions([...newItems, ...prev], 2);
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setBulkImportStatus(`🚀 Loaded ${toAdd.length} questions into your Practice Arena!`);
    setTimeout(() => setBulkImportStatus(""), 4000);
  };

  // DIRECT PDF FILE UPLOAD HANDLER (.pdf)
  const handlePdfFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setBulkImportStatus("Please upload a valid .pdf file!");
      return;
    }

    setIsPdfLoading(true);
    setBulkImportStatus(`Reading PDF pages from "${file.name}"...`);

    try {
      const extractedQs = await extractQuestionsFromPDF(file);
      if (extractedQs.length > 0) {
        setCustomQuestions((prev) => deduplicateQuestions([...extractedQs, ...prev], 2));
        setBulkImportStatus(`🎉 Successfully extracted and categorized ${extractedQs.length} questions from "${file.name}"!`);
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      } else {
        setBulkImportStatus(`Extracted text from PDF, but no standard question blocks found. Try pasting raw text into the panel below!`);
      }
    } catch (err) {
      console.error(err);
      setBulkImportStatus("PDF Extraction error: " + err.message);
    } finally {
      setIsPdfLoading(false);
    }
  };

  // Single PDF Text Extractor & Auto-Categorizer
  const handleParseBulkText = () => {
    if (!bulkText.trim()) return;
    try {
      const blocks = bulkText.split(/---|\n\n\n+/).filter((b) => b.trim().length > 10);
      const parsedQuestions = [];

      blocks.forEach((block, idx) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        let qText = "";
        let opts = ["Option A", "Option B", "Option C", "Option D"];
        let answer = 0;
        let exp = "Step-by-step breakdown derived from PDF workbook.";
        let topic = "General Aptitude";
        let difficulty = "Medium";

        lines.forEach((line) => {
          // Auto-detect topic keywords from PDF
          if (line.toLowerCase().includes("partnership")) topic = "Partnership";
          else if (line.toLowerCase().includes("profit") || line.toLowerCase().includes("loss")) topic = "Profit & Loss";
          else if (line.toLowerCase().includes("speed") || line.toLowerCase().includes("train") || line.toLowerCase().includes("distance")) topic = "Speed & Distance";
          else if (line.toLowerCase().includes("work") || line.toLowerCase().includes("pipe") || line.toLowerCase().includes("cistern")) topic = "Work & Time";
          else if (line.toLowerCase().includes("ratio") || line.toLowerCase().includes("proportion")) topic = "Ratio & Proportion";
          else if (line.toLowerCase().includes("gate") || line.toLowerCase().includes("matrix") || line.toLowerCase().includes("algorithm")) topic = "GATE Engineering";

          // Auto-detect difficulty keywords
          if (line.toLowerCase().includes("easy") || line.toLowerCase().includes("level 1")) difficulty = "Easy";
          else if (line.toLowerCase().includes("hard") || line.toLowerCase().includes("level 3") || line.toLowerCase().includes("advanced")) difficulty = "Hard";
          else if (line.toLowerCase().includes("medium") || line.toLowerCase().includes("level 2")) difficulty = "Medium";

          if (line.toLowerCase().startsWith("q:") || line.toLowerCase().startsWith("question:")) {
            qText = line.replace(/^(q:|question:)/i, "").trim();
          } else if (line.toLowerCase().startsWith("topic:")) {
            topic = line.replace(/^topic:/i, "").trim();
          } else if (line.toLowerCase().startsWith("difficulty:")) {
            difficulty = line.replace(/^difficulty:/i, "").trim();
          } else if (line.match(/^[a-d]\)/i)) {
            const letter = line[0].toUpperCase();
            const val = line.substring(2).trim();
            if (letter === "A") opts[0] = val;
            if (letter === "B") opts[1] = val;
            if (letter === "C") opts[2] = val;
            if (letter === "D") opts[3] = val;
          } else if (line.toLowerCase().startsWith("answer:")) {
            const ansStr = line.replace(/^answer:/i, "").trim().toUpperCase();
            if (ansStr.includes("A")) answer = 0;
            if (ansStr.includes("B")) answer = 1;
            if (ansStr.includes("C")) answer = 2;
            if (ansStr.includes("D")) answer = 3;
          } else if (line.toLowerCase().startsWith("exp:") || line.toLowerCase().startsWith("explanation:")) {
            exp = line.replace(/^(exp:|explanation:)/i, "").trim();
          } else if (!qText) {
            qText = line;
          }
        });

        if (qText) {
          parsedQuestions.push({
            id: `bulk_pdf_${Date.now()}_${idx}`,
            category: "Workbook 1", // Default to Workbook 1 for bulk imports
            topic: topic,
            difficulty: difficulty,
            question: qText,
            options: opts,
            correctIndex: answer,
            explanation: exp,
            tags: ["PDF Auto-Categorized"],
          });
        }
      });

      if (parsedQuestions.length > 0) {
        setCustomQuestions((prev) => deduplicateQuestions([...parsedQuestions, ...prev], 2));
        setBulkImportStatus(`Auto-categorized & imported ${parsedQuestions.length} questions into your topics!`);
        setBulkText("");
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } else {
        setBulkImportStatus("Could not detect question format. Check guidelines!");
      }
    } catch (err) {
      setBulkImportStatus("Parsing error: " + err.message);
    }
  };

  const handleAddTelegramNote = (e) => {
    e.preventDefault();
    if (!tgTitle.trim() || !tgNotes.trim()) return;

    const newNote = {
      id: "tg_" + Date.now(),
      channel: tgChannel || "Private GATE Channel",
      title: tgTitle,
      topic: tgTopic || "GATE Lecture",
      timestamp: tgTimestamp || "14:20",
      notes: tgNotes,
      date: new Date().toLocaleDateString(),
    };

    setTelegramNotes((prev) => [newNote, ...prev]);
    setTgTitle("");
    setTgNotes("");
    setTgTimestamp("");
  };

  const handleDeleteTelegramNote = (id) => {
    setTelegramNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Remove all questions under a specific workbook or category
  const handleRemoveWorkbookCategory = (categoryName) => {
    if (window.confirm(`Are you sure you want to remove all imported questions under "${categoryName}"?`)) {
      setCustomQuestions((prev) => prev.filter((q) => q.category !== categoryName && q.topic !== categoryName));
      setBulkImportStatus(`🗑️ Successfully removed all questions under "${categoryName}".`);
      setTimeout(() => setBulkImportStatus(""), 4000);
    }
  };

  // Remove all questions under a specific topic
  const handleRemoveTopic = (topicName) => {
    if (window.confirm(`Are you sure you want to remove all questions under topic "${topicName}"?`)) {
      setCustomQuestions((prev) => prev.filter((q) => q.topic !== topicName));
      setBulkImportStatus(`🗑️ Successfully removed all questions under "${topicName}".`);
      setTimeout(() => setBulkImportStatus(""), 4000);
    }
  };

  // Remove ALL imported workbook questions
  const handleClearAllCustomQuestions = () => {
    if (window.confirm(`Are you sure you want to delete ALL ${customQuestions.length} imported workbook questions? This will reset your custom question bank.`)) {
      setCustomQuestions([]);
      setBulkImportStatus("🗑️ All imported workbook questions have been permanently removed.");
      setTimeout(() => setBulkImportStatus(""), 4000);
    }
  };

  // Unique list of categories and topics with counts
  const workbookCategoriesList = Array.from(
    new Set(customQuestions.map((q) => q.category || "Custom Workbook"))
  ).map((cat) => ({
    name: cat,
    count: customQuestions.filter((q) => (q.category || "Custom Workbook") === cat).length,
  }));

  const workbookTopicsList = Array.from(
    new Set(customQuestions.map((q) => q.topic || "General"))
  ).map((top) => ({
    name: top,
    count: customQuestions.filter((q) => (q.topic || "General") === top).length,
  }));

  // VS Code Practice Problem Presets
  const vscodeChallenges = [
    {
      id: "vsc1",
      title: "Binary Search in Array",
      category: "Algorithms",
      difficulty: "Easy",
      problem: "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return index if found, else -1.",
      inputExample: "nums = [-1,0,3,5,9,12], target = 9",
      outputExample: "4",
      explanation: "Step 1: Set low = 0, high = len-1.\nStep 2: Calculate mid = low + (high - low)/2.\nStep 3: If nums[mid] == target return mid. If nums[mid] < target, set low = mid + 1, else high = mid - 1.",
      vsCodePrompt: "Create binary_search.cpp / binary_search.py in your VS Code workspace.",
    },
    {
      id: "vsc2",
      title: "0/1 Knapsack Bottom-Up DP",
      category: "Dynamic Programming",
      difficulty: "Hard",
      problem: "Compute maximum value that can be put in a knapsack of capacity W with N items having weights wt[] and values val[].",
      inputExample: "W = 50, wt = [10, 20, 30], val = [60, 100, 120]",
      outputExample: "220",
      explanation: "Step 1: Initialize dp matrix dp[N+1][W+1] with 0s.\nStep 2: Loop i from 1..N and w from 1..W.\nStep 3: If wt[i-1] <= w, dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]). Else dp[i][w] = dp[i-1][w].\nStep 4: Return dp[N][W].",
      vsCodePrompt: "Create knapsack.cpp in VS Code to test execution.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-indigo-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <FileType className="w-3.5 h-3.5" />
                500+ Question PDF Reader & Topic Vault
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Direct PDF File Uploader & 500+ Question Bank
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Upload your <strong>500+ question .pdf workbook</strong> directly, load pre-stocked master topic sets, or remove imported workbooks with one click.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab("bulk")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            activeSubTab === "bulk"
              ? "bg-amber-600 text-white border-amber-400 shadow-md glow-amber"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-800"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload PDF & 500+ Sets</span>
        </button>

        <button
          onClick={() => setActiveSubTab("manage")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            activeSubTab === "manage"
              ? "bg-rose-600 text-white border-rose-400 shadow-md glow-rose"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-800 hover:text-rose-300"
          }`}
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Manage & Remove Workbooks ({customQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("builder")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            activeSubTab === "builder"
              ? "bg-indigo-600 text-white border-indigo-400 shadow-md glow-indigo"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-800"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Single Question Form</span>
        </button>

        <button
          onClick={() => setActiveSubTab("telegram")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            activeSubTab === "telegram"
              ? "bg-purple-600 text-white border-purple-400 shadow-md glow-purple"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-800"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Telegram DRM Video Vault ({telegramNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("vscode")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            activeSubTab === "vscode"
              ? "bg-emerald-600 text-white border-emerald-400 shadow-md glow-emerald"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-800"
          }`}
        >
          <Code className="w-4 h-4" />
          <span>VS Code Algorithm Arena</span>
        </button>
      </div>

      {/* SUB-TAB: DIRECT PDF UPLOADER & MULTI-TOPIC SETS */}
      {activeSubTab === "bulk" && (
        <div className="space-y-6">
          {/* DIRECT PDF FILE UPLOAD DROPZONE */}
          <div className="glass-panel p-6 border-2 border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-950/10 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40 glow-amber">
              {isPdfLoading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <FileType className="w-8 h-8" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">
                Upload Your 500+ Question PDF Workbook (.pdf File)
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto mt-1">
                Select or drag & drop your PDF workbook file. Our built-in PDF Reader will scan all pages and auto-extract questions into your Practice Arena!
              </p>
            </div>

            <div className="pt-2">
              <label className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg glow-amber cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>{isPdfLoading ? "Extracting PDF Pages..." : "Browse & Upload PDF File (.pdf)"}</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfFileUpload}
                  className="hidden"
                  disabled={isPdfLoading}
                />
              </label>
            </div>

            <p className="text-[11px] text-slate-400">
              Supports large 500+ question PDF files across all topics & difficulty levels.
            </p>
          </div>

          {/* Status Message */}
          {bulkImportStatus && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold animate-fade-in flex items-center justify-between">
              <span>{bulkImportStatus}</span>
              <button
                onClick={() => setActiveTab("practice")}
                className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded hover:bg-emerald-400"
              >
                Go to Practice Arena →
              </button>
            </div>
          )}

          {/* Load Pre-Stocked Master PDF Topic Library (500+ Questions) */}
          <div className="glass-panel p-6 border border-amber-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                  <Folder className="w-4 h-4" /> 500+ Question Master PDF Topic Bank
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Load Pre-Categorized 500+ Questions into Practice Arena
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  One-click loaders for all topics in your workbook (Partnership, Profit & Loss, Speed-Distance, Work & Time, Ratios, GATE Math) with Easy, Medium, and Hard derivations!
                </p>
              </div>

              <button
                onClick={() => handleLoadTopicSet("master_pdf_all")}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg glow-amber shrink-0"
              >
                Load All 500+ Master PDF Questions ✓
              </button>
            </div>

            {/* Individual Topic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/50 space-y-2 text-xs col-span-1 sm:col-span-2 lg:col-span-3 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-extrabold text-indigo-300 text-sm flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      📘 MADE EASY Workbook (540 Questions • 2025 CPQ Official)
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Extracted directly from <code>wbrapti.pdf</code> with Number System, Venn Diagrams, Work & Time, Profit & Loss, Speed & Distance, Clocks, Permutations, Blood Relations, Seating, Coding, ESE & GATE.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLoadTopicSet("made_easy_all")}
                    className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shrink-0 transition-all shadow glow-indigo"
                  >
                    Load Made Easy Workbook (540 Qs) ✓
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-amber-300 block">🤝 Partnership (100 Qs)</span>
                <p className="text-[11px] text-slate-400">35 Easy, 30 Medium, 35 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("partnership_all")}
                  className="w-full py-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold hover:bg-amber-500/30"
                >
                  Load 100 Partnership Qs
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-rose-300 block">📈 Profit & Loss (90 Qs)</span>
                <p className="text-[11px] text-slate-400">30 Easy, 30 Medium, 30 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("profit_loss")}
                  className="w-full py-1.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold hover:bg-rose-500/30"
                >
                  Load 90 Profit & Loss Qs
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-cyan-300 block">🚆 Speed & Distance (90 Qs)</span>
                <p className="text-[11px] text-slate-400">30 Easy, 30 Medium, 30 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("speed_distance")}
                  className="w-full py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold hover:bg-cyan-500/30"
                >
                  Load 90 Speed & Distance Qs
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-emerald-300 block">⏱ Work & Time (90 Qs)</span>
                <p className="text-[11px] text-slate-400">30 Easy, 30 Medium, 30 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("work_time")}
                  className="w-full py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold hover:bg-emerald-500/30"
                >
                  Load 90 Work & Time Qs
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-purple-300 block">📊 Ratio & Averages (60 Qs)</span>
                <p className="text-[11px] text-slate-400">20 Easy, 20 Medium, 20 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("ratios")}
                  className="w-full py-1.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-semibold hover:bg-purple-500/30"
                >
                  Load 60 Ratio Qs
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                <span className="font-bold text-indigo-300 block">⚙️ GATE Math & Algorithms (70 Qs)</span>
                <p className="text-[11px] text-slate-400">20 Easy, 25 Medium, 25 Hard</p>
                <button
                  onClick={() => handleLoadTopicSet("gate_math")}
                  className="w-full py-1.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold hover:bg-indigo-500/30"
                >
                  Load 70 GATE Math Qs
                </button>
              </div>
            </div>
          </div>

          {/* Text Copied from PDF Fallback */}
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Or Paste Copied PDF Text Directly:</span>
            </h4>

            <p className="text-xs text-slate-300">
              Alternatively, copy text from your PDF and paste it below to auto-categorize questions into topics:
            </p>

            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Paste raw text copied from your PDF..."
              className="w-full h-36 glass-input text-xs font-mono p-3 resize-none"
            />

            <button
              onClick={handleParseBulkText}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md"
            >
              Auto-Categorize & Import Pasted PDF Text ✓
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB: MANAGE & REMOVE IMPORTED WORKBOOKS */}
      {activeSubTab === "manage" && (
        <div className="space-y-6">
          {/* Status Message */}
          {bulkImportStatus && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold animate-fade-in flex items-center justify-between">
              <span>{bulkImportStatus}</span>
              <button
                onClick={() => setActiveTab("practice")}
                className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded hover:bg-emerald-400"
              >
                Go to Practice Arena →
              </button>
            </div>
          )}

          {/* Overview & Global Clear Header */}
          <div className="glass-panel p-6 border border-rose-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4" />
                  Imported Workbooks Management Vault
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  Manage & Remove Imported Workbooks
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  You currently have <strong>{customQuestions.length} custom/imported questions</strong> across <strong>{workbookCategoriesList.length} workbooks</strong> and <strong>{workbookTopicsList.length} topics</strong> in your Practice Arena.
                </p>
              </div>

              {customQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllCustomQuestions}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg glow-rose flex items-center gap-2 shrink-0 transition-all active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete ALL {customQuestions.length} Questions</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-center">
                <span className="text-xl font-mono font-extrabold text-white block">
                  {customQuestions.length}
                </span>
                <span className="text-xs text-slate-400">Total Custom Questions</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-center">
                <span className="text-xl font-mono font-extrabold text-amber-400 block">
                  {workbookCategoriesList.length}
                </span>
                <span className="text-xs text-slate-400">Active Workbooks / Categories</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-center">
                <span className="text-xl font-mono font-extrabold text-purple-400 block">
                  {workbookTopicsList.length}
                </span>
                <span className="text-xs text-slate-400">Categorized Topics</span>
              </div>
            </div>
          </div>

          {customQuestions.length === 0 ? (
            <div className="glass-panel p-8 text-center text-slate-400 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-slate-600" />
              <h4 className="text-base font-bold text-white">No Imported Workbooks Found</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your practice arena currently has no custom or imported workbook questions. You can upload a PDF or load pre-stocked sets anytime!
              </p>
              <button
                onClick={() => setActiveSubTab("bulk")}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow"
              >
                Go to PDF Uploader & Topic Sets →
              </button>
            </div>
          ) : (
            <>
              {/* Section 1: Remove By Workbook / Category */}
              <div className="glass-panel p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-amber-400" />
                    <span>Remove by Workbook / Category:</span>
                  </h4>
                  <span className="text-xs text-slate-400">
                    Click "Remove" to delete all questions under that specific workbook.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {workbookCategoriesList.map((wb) => (
                    <div
                      key={wb.name}
                      className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-white text-xs block truncate max-w-[180px]">
                          {wb.name}
                        </span>
                        <span className="text-[11px] text-amber-400 font-mono">
                          {wb.count} {wb.count === 1 ? "question" : "questions"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveWorkbookCategory(wb.name)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                        title={`Remove all questions in ${wb.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Remove By Topic */}
              <div className="glass-panel p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Filter className="w-4 h-4 text-purple-400" />
                    <span>Remove by Topic Set:</span>
                  </h4>
                  <span className="text-xs text-slate-400">
                    Delete questions belonging to a specific topic.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {workbookTopicsList.map((top) => (
                    <div
                      key={top.name}
                      className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-white text-xs block truncate max-w-[180px]">
                          {top.name}
                        </span>
                        <span className="text-[11px] text-purple-400 font-mono">
                          {top.count} {top.count === 1 ? "question" : "questions"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(top.name)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                        title={`Remove all ${top.name} questions`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Inspect Individual Questions */}
              <div className="glass-panel p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>All Imported Questions ({customQuestions.length})</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab("practice")}
                    className="text-xs text-indigo-400 hover:underline font-semibold"
                  >
                    Go to Practice Arena →
                  </button>
                </div>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {customQuestions.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700 transition-all text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                            {q.category || "Workbook"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 font-mono text-[10px] border border-purple-800/40">
                            {q.topic || "General"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-mono text-[10px]">
                            {q.difficulty || "Medium"}
                          </span>
                        </div>
                        <p className="font-semibold text-white line-clamp-2 mt-1">
                          {q.question}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCustomQ(q.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all shrink-0"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* SUB-TAB 1: SINGLE QUESTION FORM */}
      {activeSubTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form to add custom workbook questions (2 Spans) */}
          <div className="lg:col-span-2 glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Add Question from your Physical/PDF Workbook:</span>
              </h3>
              {formSaved && (
                <span className="text-xs px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Question Saved & Added to Practice Arena ✓
                </span>
              )}
            </div>

            <form onSubmit={handleAddSingleQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Workbook</label>
                  <select
                    value={qWorkbook}
                    onChange={(e) => setQWorkbook(e.target.value)}
                    className="w-full glass-input bg-slate-900"
                  >
                    <option value="Workbook 1">Workbook 1</option>
                    <option value="Workbook 2">Workbook 2</option>
                    <option value="Workbook 3">Workbook 3</option>
                    <option value="Workbook 4">Workbook 4</option>
                    <option value="Workbook 5">Workbook 5</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Topic</label>
                  <select
                    value={qTopic}
                    onChange={(e) => setQTopic(e.target.value)}
                    className="w-full glass-input bg-slate-900"
                  >
                    {APTITUDE_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Difficulty</label>
                  <select
                    value={qDifficulty}
                    onChange={(e) => setQDifficulty(e.target.value)}
                    className="w-full glass-input bg-slate-900"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Question Text</label>
                <textarea
                  value={qQuestion}
                  onChange={(e) => setQQuestion(e.target.value)}
                  placeholder="Paste question text from your workbook..."
                  className="w-full h-24 glass-input p-3 resize-none"
                  required
                />
              </div>

              {/* 4 Choices */}
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold block">4 Options (Select radio for correct answer):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: opt0, setVal: setOpt0, idx: 0, label: "Option A" },
                    { val: opt1, setVal: setOpt1, idx: 1, label: "Option B" },
                    { val: opt2, setVal: setOpt2, idx: 2, label: "Option C" },
                    { val: opt3, setVal: setOpt3, idx: 3, label: "Option D" },
                  ].map((o) => (
                    <div key={o.idx} className="flex items-center gap-2 glass-input p-1.5">
                      <input
                        type="radio"
                        name="correctIndexRadio"
                        checked={correctIdx === o.idx}
                        onChange={() => setCorrectIdx(o.idx)}
                        className="accent-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder={o.label}
                        value={o.val}
                        onChange={(e) => o.setVal(e.target.value)}
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-full"
                        required={o.idx < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Step-by-Step Explanation Breakdown</label>
                <textarea
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Write step-by-step logic, formula derivation, or solution explanation..."
                  className="w-full h-24 glass-input p-3 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg glow-indigo"
              >
                Save Workbook Question to Practice Arena ✓
              </button>
            </form>
          </div>

          {/* List of Custom Added Questions */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Your Added Workbook Questions ({customQuestions.length})</span>
              <button
                onClick={() => setActiveTab("practice")}
                className="text-indigo-400 hover:underline text-[11px]"
              >
                Go to Practice Arena →
              </button>
            </h3>

            {customQuestions.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 text-center">
                No custom workbook questions added yet. Use the PDF Uploader or Form!
              </p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto no-scrollbar">
                {customQuestions.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white line-clamp-1">{q.question}</span>
                      <button
                        onClick={() => handleDeleteCustomQ(q.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">{q.topic} • {q.difficulty}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB: TELEGRAM PRIVATE CHANNEL VIDEO NOTES VAULT */}
      {activeSubTab === "telegram" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Note Form */}
          <div className="lg:col-span-1 glass-panel p-5 space-y-4">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 text-xs text-purple-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-300">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>Telegram DRM Screen-Share Protection Notice:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Telegram private channels restrict video screen recording/sharing by blacking out the screen. Use this vault to record timestamps, formulas, and key summaries during your video lectures!
              </p>
            </div>

            <form onSubmit={handleAddTelegramNote} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Telegram Channel / Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. GATE Core CS Private Channel"
                  value={tgChannel}
                  onChange={(e) => setTgChannel(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Video Title / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Operating System Deadlocks & Banker's Algorithm"
                  value={tgTitle}
                  onChange={(e) => setTgTitle(e.target.value)}
                  className="w-full glass-input"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Video Timestamp (e.g. 24:15)</label>
                <input
                  type="text"
                  placeholder="e.g. 24:15"
                  value={tgTimestamp}
                  onChange={(e) => setTgTimestamp(e.target.value)}
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Lecture Key Points & Formulas</label>
                <textarea
                  placeholder="Record step-by-step formulas, concepts, and teacher remarks..."
                  value={tgNotes}
                  onChange={(e) => setTgNotes(e.target.value)}
                  className="w-full h-32 glass-input p-3 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md glow-purple"
              >
                Save Video Note to Vault ✓
              </button>
            </form>
          </div>

          {/* List of Saved Telegram Video Notes (2 Spans) */}
          <div className="lg:col-span-2 glass-panel p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-400" />
              <span>Saved Telegram Video Lecture Vault ({telegramNotes.length}):</span>
            </h3>

            {telegramNotes.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <Lock className="w-8 h-8 mx-auto text-purple-400/50" />
                <p>No Telegram video notes saved yet. Add your first note using the panel on the left!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {telegramNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 font-mono text-[10px] border border-purple-800/50">
                          {note.channel}
                        </span>
                        <span className="font-bold text-white">{note.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded">
                          ⏱ {note.timestamp}
                        </span>
                        <button
                          onClick={() => handleDeleteTelegramNote(note.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/40 p-3 rounded border border-slate-800">
                      {note.notes}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB: VS CODE ALGORITHM PRACTICE ARENA */}
      {activeSubTab === "vscode" && (
        <div className="space-y-6">
          <div className="glass-panel p-5 border border-emerald-500/30 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>VS Code Code Practice Arena</span>
            </h3>
            <p className="text-xs text-slate-300">
              Practice algorithms directly in your VS Code IDE. Use the problem definitions, input/output test cases, and solution logic below to code and verify in C++, Python, or Java.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vscodeChallenges.map((c) => (
              <div key={c.id} className="glass-panel p-5 space-y-4 border border-slate-700/50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      {c.category} • {c.difficulty}
                    </span>
                    <h4 className="text-lg font-bold text-white">{c.title}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800">
                    VS Code
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-200"><strong>Problem Statement:</strong> {c.problem}</p>
                  
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="text-emerald-400">Input: {c.inputExample}</div>
                    <div className="text-amber-400">Expected Output: {c.outputExample}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 space-y-1 text-xs">
                  <span className="font-bold text-emerald-300 block">Solution Algorithm Breakdown:</span>
                  <p className="text-slate-300 text-[11px] whitespace-pre-line leading-relaxed">
                    {c.explanation}
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-400 italic">
                  💡 {c.vsCodePrompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
