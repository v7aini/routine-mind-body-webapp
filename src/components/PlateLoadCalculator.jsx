import React, { useState } from "react";
import {
  Dumbbell,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
  Info,
  Flame,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export const DEFAULT_PLATE_INVENTORY = {
  p2_5: 4, // 4 x 2.5 kg plates (10 kg total)
  p5: 2,   // 2 x 5 kg plates (10 kg total)
  p10: 2,  // 2 x 10 kg plates (20 kg total)
};

export default function PlateLoadCalculator({
  inventory = DEFAULT_PLATE_INVENTORY,
  setInventory,
}) {
  // equipmentMode: 'barbell' (Barbell Max 30kg) | 'pair' (Dumbbell Pair) | 'single' (Single DB)
  const [equipmentMode, setEquipmentMode] = useState("barbell");
  const [selectedWeight, setSelectedWeight] = useState(15);
  const [isCustomizingInventory, setIsCustomizingInventory] = useState(false);

  const currentInventory = inventory || DEFAULT_PLATE_INVENTORY;

  const totalPlateWeight =
    (currentInventory.p2_5 || 0) * 2.5 +
    (currentInventory.p5 || 0) * 5 +
    (currentInventory.p10 || 0) * 10;

  // Compute best plate breakdown for a given target weight & equipment mode
  const getPlateBreakdown = (targetKg, mode) => {
    const avail = {
      10: currentInventory.p10 || 0,
      5: currentInventory.p5 || 0,
      2.5: currentInventory.p2_5 || 0,
    };

    if (mode === "barbell") {
      // Barbell has a max rated capacity of 30kg
      if (targetKg > 30) {
        return {
          achievable: false,
          perSleeve: [],
          description: "Exceeds your barbell's 30kg maximum safe weight capacity limit!",
        };
      }

      // Barbell requires symmetrical loading (per side = targetKg / 2)
      const perSide = targetKg / 2;

      // 1. Check exact symmetrical combinations with available plates:
      if (perSide === 2.5) {
        if (avail[2.5] >= 2) {
          return {
            achievable: true,
            perSleeve: [2.5],
            totalWeight: 5,
            description: "Left: 1 × 2.5kg | Right: 1 × 2.5kg (5kg Total on Barbell)",
          };
        }
      } else if (perSide === 5) {
        if (avail[5] >= 2) {
          return {
            achievable: true,
            perSleeve: [5],
            totalWeight: 10,
            description: "Left: 1 × 5kg | Right: 1 × 5kg (10kg Total on Barbell)",
          };
        } else if (avail[2.5] >= 4) {
          return {
            achievable: true,
            perSleeve: [2.5, 2.5],
            totalWeight: 10,
            description: "Left: 2 × 2.5kg | Right: 2 × 2.5kg (10kg Total on Barbell)",
          };
        }
      } else if (perSide === 7.5) {
        if (avail[5] >= 2 && avail[2.5] >= 2) {
          return {
            achievable: true,
            perSleeve: [5, 2.5],
            totalWeight: 15,
            description: "Left: 1 × 5kg + 1 × 2.5kg | Right: 1 × 5kg + 1 × 2.5kg (15kg Total)",
          };
        }
      } else if (perSide === 10) {
        if (avail[10] >= 2) {
          return {
            achievable: true,
            perSleeve: [10],
            totalWeight: 20,
            description: "Left: 1 × 10kg | Right: 1 × 10kg (20kg Total on Barbell)",
          };
        } else if (avail[5] >= 2 && avail[2.5] >= 4) {
          return {
            achievable: true,
            perSleeve: [5, 2.5, 2.5],
            totalWeight: 20,
            description: "Left: 1 × 5kg + 2 × 2.5kg | Right: 1 × 5kg + 2 × 2.5kg (20kg Total)",
          };
        }
      } else if (perSide === 12.5) {
        if (avail[10] >= 2 && avail[2.5] >= 2) {
          return {
            achievable: true,
            perSleeve: [10, 2.5],
            totalWeight: 25,
            description: "Left: 1 × 10kg + 1 × 2.5kg | Right: 1 × 10kg + 1 × 2.5kg (25kg Total)",
          };
        }
      } else if (perSide === 15) {
        if (avail[10] >= 2 && avail[5] >= 2) {
          return {
            achievable: true,
            perSleeve: [10, 5],
            totalWeight: 30,
            isMaxCapacity: true,
            description: "Left: 1 × 10kg + 1 × 5kg | Right: 1 × 10kg + 1 × 5kg (30kg MAXIMUM CAPACITY ★)",
          };
        }
      }

      return {
        achievable: false,
        perSleeve: [],
        description: `Cannot load ${targetKg}kg symmetrically with available plates. Choose another preset!`,
      };
    } else if (mode === "single") {
      // For 1 single heavy dumbbell
      let remaining = targetKg;
      const platesUsed = [];

      while (remaining >= 10 && avail[10] > 0) {
        platesUsed.push(10);
        avail[10]--;
        remaining -= 10;
      }
      while (remaining >= 5 && avail[5] > 0) {
        platesUsed.push(5);
        avail[5]--;
        remaining -= 5;
      }
      while (remaining >= 2.5 && avail[2.5] > 0) {
        platesUsed.push(2.5);
        avail[2.5]--;
        remaining -= 2.5;
      }

      return {
        achievable: remaining === 0,
        unmet: remaining,
        perDumbbell: platesUsed,
        totalWeight: targetKg - remaining,
        description: platesUsed.length
          ? platesUsed.map((p) => `${p}kg`).join(" + ")
          : "Bodyweight / Empty Bar",
      };
    } else {
      // For 2 dumbbells (Pair per hand)
      if (targetKg === 2.5) {
        if (avail[2.5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [2.5],
            description: "1 × 2.5kg plate per dumbbell (uses 2 of your 4 × 2.5kg plates)",
          };
        }
      } else if (targetKg === 5) {
        if (avail[5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [5],
            description: "1 × 5kg plate per dumbbell (uses 2 × 5kg plates)",
          };
        } else if (avail[2.5] >= 4) {
          return {
            achievable: true,
            perDumbbell: [2.5, 2.5],
            description: "2 × 2.5kg plates per dumbbell (uses all 4 × 2.5kg plates)",
          };
        }
      } else if (targetKg === 7.5) {
        if (avail[5] >= 2 && avail[2.5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [5, 2.5],
            description: "1 × 5kg + 1 × 2.5kg plate per dumbbell (uses 2 × 5kg + 2 × 2.5kg plates)",
          };
        }
      } else if (targetKg === 10) {
        if (avail[10] >= 2) {
          return {
            achievable: true,
            perDumbbell: [10],
            description: "1 × 10kg plate per dumbbell (uses 2 × 10kg plates)",
          };
        } else if (avail[5] >= 2 && avail[2.5] >= 4) {
          return {
            achievable: true,
            perDumbbell: [5, 2.5, 2.5],
            description: "1 × 5kg + 2 × 2.5kg plates per dumbbell (uses 2 × 5kg + 4 × 2.5kg plates)",
          };
        }
      } else if (targetKg === 12.5) {
        if (avail[10] >= 2 && avail[2.5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [10, 2.5],
            description: "1 × 10kg + 1 × 2.5kg plate per dumbbell (uses 2 × 10kg + 2 × 2.5kg plates)",
          };
        }
      } else if (targetKg === 15) {
        if (avail[10] >= 2 && avail[5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [10, 5],
            description: "1 × 10kg + 1 × 5kg plate per dumbbell (uses 2 × 10kg + 2 × 5kg plates)",
          };
        }
      } else if (targetKg === 17.5) {
        if (avail[10] >= 2 && avail[5] >= 2 && avail[2.5] >= 2) {
          return {
            achievable: true,
            perDumbbell: [10, 5, 2.5],
            description: "1 × 10kg + 1 × 5kg + 1 × 2.5kg plate per dumbbell (uses 2x10kg + 2x5kg + 2x2.5kg)",
          };
        }
      } else if (targetKg === 20) {
        if (avail[10] >= 2 && avail[5] >= 2 && avail[2.5] >= 4) {
          return {
            achievable: true,
            perDumbbell: [10, 5, 2.5, 2.5],
            description: "1 × 10kg + 1 × 5kg + 2 × 2.5kg plates per dumbbell (uses all 40kg plates!)",
          };
        }
      }

      return {
        achievable: false,
        perDumbbell: [],
        description: `Requires more plates than currently in your inventory. Try adjusting weight!`,
      };
    }
  };

  const currentSetup = getPlateBreakdown(selectedWeight, equipmentMode);

  // Common quick presets
  const barbellPresets = [5, 10, 15, 20, 25, 30];
  const pairPresets = [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];
  const singlePresets = [5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 30, 35, 40];

  const presetsToUse =
    equipmentMode === "barbell"
      ? barbellPresets
      : equipmentMode === "single"
      ? singlePresets
      : pairPresets;

  const handleUpdateInventory = (key, delta) => {
    if (!setInventory) return;
    setInventory((prev) => {
      const oldVal = prev[key] || 0;
      const newVal = Math.max(0, oldVal + delta);
      return { ...prev, [key]: newVal };
    });
  };

  return (
    <div className="glass-panel p-5 space-y-4 border border-emerald-500/30">
      {/* Header & Total Weight */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Barbell & Dumbbell Plate Loading Matrix
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                {totalPlateWeight} kg Total Plates
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                30kg Max Barbell Cap
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Configured for your <strong>4 × 2.5kg</strong>, <strong>2 × 5kg</strong>, <strong>2 × 10kg</strong> plates & <strong>30kg Barbell</strong>.
            </p>
          </div>
        </div>

        {/* Toggle inventory customizer */}
        <button
          onClick={() => setIsCustomizingInventory(!isCustomizingInventory)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isCustomizingInventory ? "Hide Inventory" : "Edit Plate Count"}</span>
        </button>
      </div>

      {/* Plate Inventory Count & Editor */}
      {isCustomizingInventory ? (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/40 space-y-3 animate-fadeIn">
          <span className="text-xs font-bold text-white block">
            Your Plate Inventory (40 kg Total):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* 2.5kg */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-cyan-300 block">2.5 kg Plates</span>
                <span className="text-[10px] text-slate-400">
                  Total: {(currentInventory.p2_5 || 0) * 2.5} kg
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateInventory("p2_5", -1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white font-mono">
                  {currentInventory.p2_5 || 0}
                </span>
                <button
                  onClick={() => handleUpdateInventory("p2_5", 1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* 5kg */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-300 block">5.0 kg Plates</span>
                <span className="text-[10px] text-slate-400">
                  Total: {(currentInventory.p5 || 0) * 5} kg
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateInventory("p5", -1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white font-mono">
                  {currentInventory.p5 || 0}
                </span>
                <button
                  onClick={() => handleUpdateInventory("p5", 1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* 10kg */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-300 block">10.0 kg Plates</span>
                <span className="text-[10px] text-slate-400">
                  Total: {(currentInventory.p10 || 0) * 10} kg
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateInventory("p10", -1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white font-mono">
                  {currentInventory.p10 || 0}
                </span>
                <button
                  onClick={() => handleUpdateInventory("p10", 1)}
                  className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Static Quick Inventory Badges */
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center">
            <span className="text-cyan-400 font-extrabold text-sm block">
              {currentInventory.p2_5 || 4} × 2.5 kg
            </span>
            <span className="text-[10px] text-slate-400">
              4 Plates = 10 kg
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center">
            <span className="text-emerald-400 font-extrabold text-sm block">
              {currentInventory.p5 || 2} × 5.0 kg
            </span>
            <span className="text-[10px] text-slate-400">
              2 Plates = 10 kg
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-center">
            <span className="text-amber-400 font-extrabold text-sm block">
              {currentInventory.p10 || 2} × 10.0 kg
            </span>
            <span className="text-[10px] text-slate-400">
              2 Plates = 20 kg
            </span>
          </div>
        </div>
      )}

      {/* Target Calculator Controls */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-emerald-400" />
            <span>Select Equipment & Weight to Load:</span>
          </span>

          {/* Mode Switch: Barbell (30kg) vs Pair vs Single */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => {
                setEquipmentMode("barbell");
                if (selectedWeight > 30) setSelectedWeight(30);
                if (selectedWeight < 5) setSelectedWeight(15);
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                equipmentMode === "barbell"
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🏋️‍♂️ Barbell (Max 30kg)</span>
            </button>
            <button
              onClick={() => {
                setEquipmentMode("pair");
                if (selectedWeight > 20) setSelectedWeight(7.5);
              }}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                equipmentMode === "pair"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Dumbbell Pair
            </button>
            <button
              onClick={() => setEquipmentMode("single")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                equipmentMode === "single"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Single DB
            </button>
          </div>
        </div>

        {/* Quick Weight Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {presetsToUse.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                selectedWeight === w
                  ? equipmentMode === "barbell"
                    ? "bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-md"
                    : "bg-emerald-500 text-white border-emerald-400 shadow-md glow-emerald"
                  : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {w} kg {equipmentMode === "barbell" ? "Barbell" : equipmentMode === "pair" ? "/ hand" : "Total"}
              {w === 30 && equipmentMode === "barbell" && " ★ (MAX)"}
            </button>
          ))}
        </div>

        {/* Visual Barbell / Dumbbell Loaded Result Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs text-slate-400">
                Setup for <strong>{selectedWeight} kg {equipmentMode === "barbell" ? "Barbell (Symmetrical Loading)" : equipmentMode === "single" ? "Single DB (Squats/Pullovers/Rows)" : "Per Hand (Dumbbell Pair)"}</strong>:
              </span>
              <p className="text-sm font-bold text-white mt-0.5">
                {currentSetup.description}
              </p>
            </div>

            {currentSetup.achievable ? (
              <span className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 self-start sm:self-auto shrink-0 border ${
                currentSetup.isMaxCapacity
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentSetup.isMaxCapacity ? "30kg Max Barbell Load ★" : "Ready to Lift ✓"}</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1 self-start sm:self-auto shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Cannot Load Symmetrically</span>
              </span>
            )}
          </div>

          {/* Graphical Barbell Diagram (When in Barbell Mode) */}
          {equipmentMode === "barbell" && currentSetup.achievable && currentSetup.perSleeve?.length > 0 && (
            <div className="py-3 px-4 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center gap-2 overflow-x-auto shadow-inner">
              <div className="flex items-center">
                {/* Left Collar Plates (Outer to Inner) */}
                <div className="flex items-center gap-1 mr-1">
                  {currentSetup.perSleeve.map((p, idx) => (
                    <div
                      key={`l-${idx}`}
                      className={`h-16 rounded flex items-center justify-center font-mono font-bold text-[11px] text-white shadow-lg px-2 ${
                        p === 10
                          ? "w-9 bg-amber-600 border border-amber-400"
                          : p === 5
                          ? "w-8 bg-emerald-600 border border-emerald-400"
                          : "w-7 bg-cyan-600 border border-cyan-400"
                      }`}
                      title={`Left Sleeve: ${p}kg Plate`}
                    >
                      {p}kg
                    </div>
                  ))}
                </div>

                {/* Left Collar Ring */}
                <div className="w-2 h-10 bg-slate-500 rounded-sm" />

                {/* Barbell Long Shaft */}
                <div className="w-48 sm:w-64 h-5 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-sm border border-slate-300 flex items-center justify-between text-[9px] text-slate-900 font-extrabold px-3 shadow-md">
                  <span>LEFT</span>
                  <span className="text-[10px] tracking-wider text-slate-950 font-black">
                    BARBELL ({selectedWeight} KG)
                  </span>
                  <span>RIGHT</span>
                </div>

                {/* Right Collar Ring */}
                <div className="w-2 h-10 bg-slate-500 rounded-sm" />

                {/* Right Collar Plates (Inner to Outer) */}
                <div className="flex items-center gap-1 ml-1">
                  {currentSetup.perSleeve.map((p, idx) => (
                    <div
                      key={`r-${idx}`}
                      className={`h-16 rounded flex items-center justify-center font-mono font-bold text-[11px] text-white shadow-lg px-2 ${
                        p === 10
                          ? "w-9 bg-amber-600 border border-amber-400"
                          : p === 5
                          ? "w-8 bg-emerald-600 border border-emerald-400"
                          : "w-7 bg-cyan-600 border border-cyan-400"
                      }`}
                      title={`Right Sleeve: ${p}kg Plate`}
                    >
                      {p}kg
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Graphical Dumbbell Diagram (When in Dumbbell Mode) */}
          {equipmentMode !== "barbell" && currentSetup.achievable && currentSetup.perDumbbell?.length > 0 && (
            <div className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center gap-3 overflow-x-auto">
              <div className="flex items-center gap-1">
                {/* Left Collar Plates */}
                {currentSetup.perDumbbell.map((p, idx) => (
                  <div
                    key={`l-${idx}`}
                    className={`h-12 rounded flex items-center justify-center font-mono font-bold text-[10px] text-white shadow px-1.5 ${
                      p === 10
                        ? "w-8 bg-amber-600 border border-amber-400"
                        : p === 5
                        ? "w-7 bg-emerald-600 border border-emerald-400"
                        : "w-6 bg-cyan-600 border border-cyan-400"
                    }`}
                    title={`${p}kg Plate`}
                  >
                    {p}k
                  </div>
                ))}

                {/* Dumbbell Handle */}
                <div className="w-16 h-4 bg-slate-600 rounded-sm border border-slate-400 flex items-center justify-center text-[9px] text-slate-200 font-bold px-1">
                  GRIP
                </div>

                {/* Right Collar Plates (Symmetrical) */}
                {currentSetup.perDumbbell.map((p, idx) => (
                  <div
                    key={`r-${idx}`}
                    className={`h-12 rounded flex items-center justify-center font-mono font-bold text-[10px] text-white shadow px-1.5 ${
                      p === 10
                        ? "w-8 bg-amber-600 border border-amber-400"
                        : p === 5
                        ? "w-7 bg-emerald-600 border border-emerald-400"
                        : "w-6 bg-cyan-600 border border-cyan-400"
                    }`}
                    title={`${p}kg Plate`}
                  >
                    {p}k
                  </div>
                ))}
              </div>

              {equipmentMode === "pair" && (
                <span className="text-[11px] text-indigo-300 font-semibold ml-2">
                  × 2 Dumbbells
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
