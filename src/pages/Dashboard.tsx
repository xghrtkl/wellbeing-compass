import { motion } from "framer-motion";
import { Footprints, Flame, Heart, Scale, Droplets, Timer } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { mockHealthData } from "@/lib/mockData";
import MetricCard from "@/components/MetricCard";
import ScoreRing from "@/components/ScoreRing";
import RecommendationCard from "@/components/RecommendationCard";

const data = mockHealthData.today;
const weeklySteps = mockHealthData.weeklySteps;

const Dashboard = () => {
  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">FeetBeat</h1>
          <p className="text-xs text-muted-foreground">Sunday, March 9</p>
        </div>
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">U</span>
        </div>
      </motion.div>

      {/* Score Rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Today's Scores</h2>
        <div className="flex justify-around">
          <ScoreRing
            score={data.recoveryScore}
            color="hsl(var(--recovery))"
            label="Recovery"
          />
          <ScoreRing
            score={data.sleep.score}
            color="hsl(var(--sleep))"
            label="Sleep"
          />
          <ScoreRing
            score={data.readinessScore}
            color="hsl(var(--primary))"
            label="Readiness"
          />
        </div>
      </motion.div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard
          icon={Footprints}
          label="Steps"
          value={data.steps.toLocaleString()}
          progress={(data.steps / data.stepsGoal) * 100}
          color="hsl(var(--primary))"
          subtitle={`Goal: ${data.stepsGoal.toLocaleString()}`}
          delay={0.15}
        />
        <MetricCard
          icon={Flame}
          label="Calories"
          value={data.caloriesBurned.toLocaleString()}
          unit="kcal"
          progress={(data.caloriesBurned / data.caloriesGoal) * 100}
          color="hsl(var(--destructive))"
          subtitle={`Goal: ${data.caloriesGoal}`}
          delay={0.2}
        />
        <MetricCard
          icon={Heart}
          label="Heart Rate"
          value={data.heartRate.current}
          unit="bpm"
          color="hsl(var(--heart))"
          subtitle={`Resting: ${data.heartRate.resting} bpm`}
          delay={0.25}
        />
        <MetricCard
          icon={Scale}
          label="Weight"
          value={data.weight}
          unit="kg"
          progress={((data.weight - data.weightGoal) / (100 - data.weightGoal)) * 100}
          color="hsl(var(--warning))"
          subtitle={`Goal: ${data.weightGoal} kg`}
          delay={0.3}
        />
        <MetricCard
          icon={Droplets}
          label="HRV"
          value={data.hrv}
          unit="ms"
          color="hsl(var(--recovery))"
          subtitle={`7-day avg: ${data.hrvAvg7Day} ms`}
          delay={0.35}
        />
        <MetricCard
          icon={Timer}
          label="Active Min"
          value={data.activeMinutes}
          unit="min"
          progress={(data.activeMinutes / data.activeMinutesGoal) * 100}
          color="hsl(var(--accent))"
          subtitle={`Goal: ${data.activeMinutesGoal} min`}
          delay={0.4}
        />
      </div>

      {/* Weekly Steps Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Weekly Steps</h2>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weeklySteps} barSize={24}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }}
            />
            <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
              {weeklySteps.map((entry, index) => (
                <Cell
                  key={index}
                  fill={index === weeklySteps.length - 1 ? "hsl(160, 84%, 44%)" : "hsl(220, 16%, 20%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">AI Recommendations</h2>
        <div className="flex flex-col gap-3">
          {mockHealthData.recommendations.slice(0, 3).map((rec, i) => (
            <RecommendationCard key={rec.id} recommendation={rec} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
