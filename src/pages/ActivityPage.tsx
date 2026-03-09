import { motion } from "framer-motion";
import { Activity, Footprints, Flame, Timer, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";
import { mockHealthData } from "@/lib/mockData";
import MetricCard from "@/components/MetricCard";

const data = mockHealthData.today;
const weeklySteps = mockHealthData.weeklySteps;

const heartRateData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  hr: i < 6 ? 58 + Math.random() * 8 : i < 9 ? 65 + Math.random() * 15 : i < 17 ? 70 + Math.random() * 20 : i < 21 ? 75 + Math.random() * 25 : 62 + Math.random() * 10,
}));

const ActivityPage = () => {
  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={20} className="text-primary" />
          <h1 className="text-xl font-bold font-display text-foreground">Activity</h1>
        </div>
        <p className="text-xs text-muted-foreground">Today's activity summary</p>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard icon={Footprints} label="Steps" value={data.steps.toLocaleString()} progress={(data.steps / data.stepsGoal) * 100} color="hsl(var(--primary))" subtitle={`${data.distance} km`} delay={0.1} />
        <MetricCard icon={Flame} label="Calories" value={data.caloriesBurned.toLocaleString()} unit="kcal" progress={(data.caloriesBurned / data.caloriesGoal) * 100} color="hsl(var(--destructive))" delay={0.15} />
        <MetricCard icon={Timer} label="Active Min" value={data.activeMinutes} unit="min" progress={(data.activeMinutes / data.activeMinutesGoal) * 100} color="hsl(var(--accent))" delay={0.2} />
        <MetricCard icon={TrendingUp} label="Floors" value={data.floors} color="hsl(var(--warning))" delay={0.25} />
      </div>

      {/* Heart Rate Zones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Heart Rate Zones</h2>
        <div className="flex flex-col gap-2">
          {data.heartRate.zones.map((zone) => (
            <div key={zone.name} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-16">{zone.name}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: zone.name === "Peak" ? "hsl(var(--destructive))" : zone.name === "Cardio" ? "hsl(var(--warning))" : "hsl(var(--primary))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(zone.minutes / 60) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground w-12 text-right">{zone.minutes}m</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Heart Rate Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Heart Rate Today</h2>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={heartRateData}>
            <defs>
              <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(350, 80%, 58%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(350, 80%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="hr" stroke="hsl(350, 80%, 58%)" fill="url(#hrGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Weekly Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Weekly Steps</h2>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weeklySteps} barSize={24}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} />
            <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
              {weeklySteps.map((_, index) => (
                <Cell key={index} fill={index === weeklySteps.length - 1 ? "hsl(160, 84%, 44%)" : "hsl(220, 16%, 20%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ActivityPage;
