import { motion } from "framer-motion";
import { Moon, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, PieChart, Pie, Cell as PieCell } from "recharts";
import { mockHealthData } from "@/lib/mockData";
import ScoreRing from "@/components/ScoreRing";

const sleep = mockHealthData.today.sleep;
const weeklySleep = mockHealthData.weeklySleep;

const stageColors = {
  deep: "hsl(230, 70%, 50%)",
  light: "hsl(230, 50%, 70%)",
  rem: "hsl(270, 70%, 60%)",
  awake: "hsl(0, 60%, 55%)",
};

const stageData = [
  { name: "Deep", value: sleep.stages.deep, color: stageColors.deep },
  { name: "Light", value: sleep.stages.light, color: stageColors.light },
  { name: "REM", value: sleep.stages.rem, color: stageColors.rem },
  { name: "Awake", value: sleep.stages.awake, color: stageColors.awake },
];

const SleepPage = () => {
  const avgSleep = (weeklySleep.reduce((s, d) => s + d.hours, 0) / weeklySleep.length).toFixed(1);
  const sleepDebt = Math.max(0, 7 * 8 - weeklySleep.reduce((s, d) => s + d.hours, 0)).toFixed(1);

  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Moon size={20} className="text-sleep" />
          <h1 className="text-xl font-bold font-display text-foreground">Sleep</h1>
        </div>
        <p className="text-xs text-muted-foreground">Last night · {sleep.startTime} – {sleep.endTime}</p>
      </motion.div>

      {/* Score + Duration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-5 mb-4 flex items-center justify-around"
      >
        <ScoreRing score={sleep.score} color="hsl(var(--sleep))" label="Sleep Score" />
        <div className="text-center">
          <p className="text-3xl font-bold font-display text-foreground">{sleep.duration}h</p>
          <p className="text-xs text-muted-foreground">Duration</p>
          <div className="flex items-center gap-1 mt-1 justify-center">
            {sleep.duration < 7 ? (
              <TrendingDown size={12} className="text-destructive" />
            ) : (
              <TrendingUp size={12} className="text-primary" />
            )}
            <span className="text-[10px] text-muted-foreground">
              {sleep.duration < 7 ? "Below 7h target" : "On target"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Sleep Stages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Sleep Stages</h2>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={100} height={100}>
            <PieChart>
              <Pie
                data={stageData}
                innerRadius={30}
                outerRadius={45}
                dataKey="value"
                stroke="none"
              >
                {stageData.map((entry, i) => (
                  <PieCell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {stageData.map((stage) => (
              <div key={stage.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <div>
                  <p className="text-xs font-medium text-foreground">{stage.name}</p>
                  <p className="text-[10px] text-muted-foreground">{stage.value}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weekly Sleep */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Weekly Sleep</h2>
          <span className="text-xs text-muted-foreground">Avg: {avgSleep}h</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weeklySleep} barSize={24}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} />
            <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
              {weeklySleep.map((entry, index) => (
                <Cell key={index} fill={entry.hours >= 7 ? "hsl(230, 70%, 60%)" : "hsl(230, 40%, 35%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Sleep Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Sleep Insights</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Sleep Debt</span>
            <span className="text-sm font-semibold text-destructive">{sleepDebt}h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Sleep Profile</span>
            <span className="text-sm font-semibold text-sleep">Late Sleeper</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Consistency</span>
            <span className="text-sm font-semibold text-warning">Moderate</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SleepPage;
