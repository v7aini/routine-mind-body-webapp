import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  CheckCheck,
  Filter,
  Edit3,
  Save,
  X,
  BookOpen,
  UtensilsCrossed,
  Dumbbell,
  Brain,
  Layers,
} from "lucide-react";
import {
  MASTER_TIME_BLOCKS,
  SCHEDULE_CATEGORIES,
  DEFAULT_MASTER_ROUTINE,
  determineBlockForTime,
  parseTimeToMinutes,
} from "../data/masterScheduleData";

export default function DailySchedule({ routineChecklist, setRoutineChecklist }) {
  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("09:00 AM");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("Study");
  const [newBlock, setNewBlock] = useState("morning");
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    time: "",
    category: "Study",
    block: "morning",
    description: "",
  });

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Toggle single item
  const toggleCheck = (id) => {
    setRoutineChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  // Add Item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const blockToUse = newBlock === "auto" ? determineBlockForTime(newTime) : newBlock;

    const newItem = {
      id: "cust_" + Date.now(),
      title: newTitle.trim(),
      time: newTime.trim() || "09:00 AM",
      category: newCategory,
      block: blockToUse,
      description: newDesc.trim() || "Custom scheduled routine task",
      done: false,
    };

    setRoutineChecklist((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(false);
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    setRoutineChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Start Edit
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      time: item.time,
      category: item.category || "Study",
      block: item.block || determineBlockForTime(item.time),
      description: item.description || "",
    });
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) return;

    setRoutineChecklist((prev) =>
      prev.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            title: editForm.title.trim(),
            time: editForm.time.trim(),
            category: editForm.category,
            block: editForm.block,
            description: editForm.description.trim(),
          };
        }
        return item;
      })
    );
    setEditingId(null);
  };

  // Global Actions
  const handleResetDay = () => {
    if (window.confirm("Reset all tasks for a fresh start today?")) {
      setRoutineChecklist((prev) => prev.map((item) => ({ ...item, done: false })));
    }
  };

  const handleMarkAllDone = () => {
    setRoutineChecklist((prev) => prev.map((item) => ({ ...item, done: true })));
  };

  const handleRestoreMaster = () => {
    if (
      window.confirm(
        "Restore default Master Schedule? This will reset your routine to the 12 standard GATE, Diet & Workout blocks."
      )
    ) {
      setRoutineChecklist(DEFAULT_MASTER_ROUTINE);
    }
  };

  // Category Icon & Badge
  const getCategoryBadge = (cat) => {
    switch (cat) {
      case "Study":
        return {
          icon: BookOpen,
          bg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
        };
      case "Diet":
        return {
          icon: UtensilsCrossed,
          bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        };
      case "Workout":
        return {
          icon: Dumbbell,
          bg: "bg-orange-500/15 text-orange-300 border-orange-500/30",
        };
      case "Mindset":
        return {
          icon: Brain,
          bg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
        };
      default:
        return {
          icon: Sparkles,
          bg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        };
    }
  };

  // Filter items
  const filteredRoutine = routineChecklist.filter((item) => {
    if (selectedCategory === "all") return true;
    return (item.category || "Study") === selectedCategory;
  });

  // Calculate overall stats
  const totalItems = routineChecklist.length;
  const totalCompleted = routineChecklist.filter((i) => i.done).length;
  const completionPct = totalItems ? Math.round((totalCompleted / totalItems) * 100) : 0;

  // Group items by time blocks dynamically & sort them chronologically
  const getBlockIcon = (iconName) => {
    switch (iconName) {
      case "Sun":
        return Sun;
      case "Sunset":
        return Sunset;
      case "Moon":
        return Moon;
      default:
        return Sun;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 border-l-4 border-indigo-500 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-sm">
                <CalendarCheck className="w-3.5 h-3.5 text-indigo-400" />
                Time-Blocked Master Schedule
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {totalCompleted}/{totalItems} Done ({completionPct}%)
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Daily Life, Diet & GATE Study Routine
            </h2>
            <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              Structured time blocks harmonizing high-calorie vegetarian meals, dumbbell hypertrophy, hydration checkpoints, and focused GATE & Aptitude practice sessions.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? "Close Form" : "Add Task"}</span>
            </button>
            <button
              onClick={handleResetDay}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95"
              title="Uncheck all items to start a fresh day"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Day</span>
            </button>
            <button
              onClick={handleMarkAllDone}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95"
              title="Mark all routine items as completed"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark All Done</span>
            </button>
            <button
              onClick={handleRestoreMaster}
              className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-medium text-xs flex items-center gap-1.5 transition-all"
              title="Restore standard 12-slot Master Routine"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Restore Default</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300 font-semibold">
            <span>Overall Routine Streak Progress</span>
            <span className="text-indigo-400 font-bold">{completionPct}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-850 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="glass-panel p-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold px-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {SCHEDULE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === "all"
              ? routineChecklist.length
              : routineChecklist.filter((i) => (i.category || "Study") === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-750"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-900 text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Add Custom Task Form Collapsible */}
      {showAddForm && (
        <form
          onSubmit={handleAddItem}
          className="glass-panel p-5 border border-indigo-500/40 bg-indigo-950/20 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Add Custom Routine Task to Master Schedule
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                Task Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Solve 10 Aptitude Questions / Evening Snack"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="glass-input text-xs w-full"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                Time (e.g. 04:00 PM)
              </label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="09:00 AM"
                className="glass-input text-xs w-full"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                Time Block
              </label>
              <select
                value={newBlock}
                onChange={(e) => setNewBlock(e.target.value)}
                className="glass-input text-xs w-full bg-slate-900 text-slate-200"
              >
                <option value="morning">🌅 Morning (06:00 AM - 12:00 PM)</option>
                <option value="afternoon">☀️ Afternoon (12:00 PM - 05:00 PM)</option>
                <option value="evening">🌆 Evening (05:00 PM - 09:00 PM)</option>
                <option value="night">🌙 Night (09:00 PM - 11:00 PM)</option>
                <option value="auto">⚡ Auto-detect by Time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="glass-input text-xs w-full bg-slate-900 text-slate-200"
              >
                <option value="Study">GATE & Aptitude Study</option>
                <option value="Diet">Gainer Diet & Nutrition</option>
                <option value="Workout">Dumbbell Workout</option>
                <option value="Mindset">Mindset & Hydration</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                Description / Action Notes
              </label>
              <input
                type="text"
                placeholder="Optional notes or instructions for this slot..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="glass-input text-xs w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Schedule</span>
            </button>
          </div>
        </form>
      )}

      {/* Time Block Sections */}
      <div className="space-y-6">
        {MASTER_TIME_BLOCKS.map((block) => {
          const Icon = getBlockIcon(block.iconName);

          // Get items belonging to this time block from the filtered list
          const blockItems = filteredRoutine
            .filter((item) => {
              const itemBlock = determineBlockForTime(item.time, item.block);
              return itemBlock === block.id;
            })
            .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

          const blockTotal = blockItems.length;
          const blockDone = blockItems.filter((i) => i.done).length;
          const blockPct = blockTotal ? Math.round((blockDone / blockTotal) * 100) : 0;

          if (blockTotal === 0 && selectedCategory !== "all") {
            return null; // Hide empty blocks if category filtering is active
          }

          return (
            <div key={block.id} className={`glass-panel p-5 space-y-4 border ${block.bg}`}>
              {/* Block Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-slate-900/80 border border-white/10 ${block.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white">{block.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold border ${block.badgeBg}`}>
                        {block.timeRange}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{block.description}</p>
                  </div>
                </div>

                {/* Block Stats */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-300">
                    {blockDone}/{blockTotal} Done
                  </span>
                  <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        blockPct === 100 ? "bg-emerald-400" : "bg-indigo-500"
                      }`}
                      style={{ width: `${blockPct}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      blockPct === 100
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-900 text-slate-300"
                    }`}
                  >
                    {blockPct}%
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {blockItems.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                    No items scheduled in this time block. Click "Add Task" to add one!
                  </div>
                ) : (
                  blockItems.map((item) => {
                    const isEditing = editingId === item.id;
                    const catBadge = getCategoryBadge(item.category || "Study");
                    const CatIcon = catBadge.icon;

                    if (isEditing) {
                      return (
                        <form
                          key={item.id}
                          onSubmit={handleSaveEdit}
                          className="p-4 rounded-xl border border-indigo-500/50 bg-indigo-950/30 space-y-3"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) =>
                                setEditForm({ ...editForm, title: e.target.value })
                              }
                              placeholder="Task title"
                              className="glass-input text-xs sm:col-span-2"
                              required
                            />
                            <input
                              type="text"
                              value={editForm.time}
                              onChange={(e) =>
                                setEditForm({ ...editForm, time: e.target.value })
                              }
                              placeholder="Time (e.g. 08:00 AM)"
                              className="glass-input text-xs"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm({ ...editForm, category: e.target.value })
                              }
                              className="glass-input text-xs bg-slate-900 text-slate-200"
                            >
                              <option value="Study">GATE & Aptitude Study</option>
                              <option value="Diet">Gainer Diet & Nutrition</option>
                              <option value="Workout">Dumbbell Workout</option>
                              <option value="Mindset">Mindset & Hydration</option>
                            </select>
                            <select
                              value={editForm.block}
                              onChange={(e) =>
                                setEditForm({ ...editForm, block: e.target.value })
                              }
                              className="glass-input text-xs bg-slate-900 text-slate-200"
                            >
                              <option value="morning">Morning Block</option>
                              <option value="afternoon">Afternoon Block</option>
                              <option value="evening">Evening Block</option>
                              <option value="night">Night Block</option>
                            </select>
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                              }
                              placeholder="Description / notes"
                              className="glass-input text-xs"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </form>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                          item.done
                            ? "bg-slate-900/60 border-indigo-500/30 text-slate-400"
                            : "bg-slate-800/40 border-slate-700/50 text-white hover:border-slate-600 hover:bg-slate-800/60"
                        }`}
                      >
                        {/* Checkbox and text */}
                        <div
                          onClick={() => toggleCheck(item.id)}
                          className="flex items-start gap-3 cursor-pointer flex-1"
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              item.done
                                ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/50"
                                : "border border-slate-500 bg-slate-900 hover:border-indigo-400"
                            }`}
                          >
                            {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-xs font-semibold ${
                                  item.done ? "line-through text-slate-400" : "text-slate-100"
                                }`}
                              >
                                {item.title}
                              </span>

                              {/* Time badge */}
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-800 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-400" />
                                {item.time}
                              </span>

                              {/* Category badge */}
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${catBadge.bg}`}
                              >
                                <CatIcon className="w-2.5 h-2.5" />
                                {item.category || "Study"}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="text-slate-500 hover:text-indigo-300 p-1.5 transition-colors rounded-lg hover:bg-slate-800"
                            title="Edit Task"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors rounded-lg hover:bg-slate-800"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
