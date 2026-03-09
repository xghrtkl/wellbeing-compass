import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { mockHealthData } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const nutrition = mockHealthData.today.nutrition;
const meals = mockHealthData.meals;

const macroData = [
  { name: "Protein", value: nutrition.protein * 4, color: "hsl(160, 84%, 44%)" },
  { name: "Carbs", value: nutrition.carbs * 4, color: "hsl(200, 80%, 55%)" },
  { name: "Fat", value: nutrition.fat * 9, color: "hsl(38, 92%, 55%)" },
];

const MealsPage = () => {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const calorieBalance = nutrition.caloriesGoal - nutrition.calories;

  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Utensils size={20} className="text-nutrition" />
              <h1 className="text-xl font-bold font-display text-foreground">Meals</h1>
            </div>
            <p className="text-xs text-muted-foreground">Today's nutrition</p>
          </div>
          <button className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Plus size={18} className="text-primary" />
          </button>
        </div>
      </motion.div>

      {/* Calorie Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={90} height={90}>
            <PieChart>
              <Pie data={macroData} innerRadius={28} outerRadius={40} dataKey="value" stroke="none">
                {macroData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold font-display text-foreground">{nutrition.calories}</span>
              <span className="text-xs text-muted-foreground">/ {nutrition.caloriesGoal} kcal</span>
            </div>
            <p className={`text-xs font-medium ${calorieBalance > 0 ? "text-primary" : "text-destructive"}`}>
              {calorieBalance > 0 ? `${calorieBalance} kcal remaining` : `${Math.abs(calorieBalance)} kcal over`}
            </p>
            <div className="flex gap-4 mt-2">
              {macroData.map((m) => (
                <div key={m.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[10px] text-muted-foreground">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Macro Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-4"
      >
        {[
          { label: "Protein", value: `${nutrition.protein}g`, color: "hsl(var(--primary))" },
          { label: "Carbs", value: `${nutrition.carbs}g`, color: "hsl(var(--accent))" },
          { label: "Fat", value: `${nutrition.fat}g`, color: "hsl(var(--warning))" },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-lg p-3 text-center">
            <p className="text-lg font-bold font-display text-foreground">{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Meals List */}
      <div className="flex flex-col gap-3">
        {meals.map((meal, i) => {
          const isExpanded = expandedMeal === meal.id;
          const totalCals = meal.items.reduce((s, item) => s + item.calories, 0);
          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedMeal(isExpanded ? null : meal.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nutrition/10 flex items-center justify-center">
                    <Utensils size={14} className="text-nutrition" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{meal.type}</p>
                    <p className="text-[10px] text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{totalCals} kcal</span>
                  {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </div>
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-4 flex flex-col gap-2">
                      {meal.items.map((item, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <span className="text-xs text-foreground">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-foreground">P:{item.protein}g</span>
                            <span className="text-[10px] text-muted-foreground">C:{item.carbs}g</span>
                            <span className="text-[10px] text-muted-foreground">F:{item.fat}g</span>
                            <span className="text-xs font-medium text-foreground">{item.calories}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
