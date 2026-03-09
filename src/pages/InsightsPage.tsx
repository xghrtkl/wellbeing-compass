import { motion } from "framer-motion";
import { Sparkles, Shield, Brain, Dumbbell, Wind } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";
import { mockHealthData } from "@/lib/mockData";
import ScoreRing from "@/components/ScoreRing";
import RecommendationCard from "@/components/RecommendationCard";

const data = mockHealthData.today;
const weeklyHRV = mockHealthData.weeklyHRV;

const coachingPrograms = [
  { icon: Dumbbell, title: "Weight Loss Walking Plan", subtitle: "8-week guided program", color: "hsl(var(--primary))" },
  { icon: Wind, title: "5-min Breathing Exercise", subtitle: "Reduce stress now", color: "hsl(var(--sleep))" },
  { icon: Brain, title: "Sleep Meditation", subtitle: "10-min before bed", color: "hsl(var(--recovery))" },
];

const InsightsPage = () => {
  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-primary" />
          <h1 className="text-xl font-bold font-display text-foreground">Insights</h1>
        </div>
        <p className="text-xs text-muted-foreground">AI-powered wellness recommendations</p>
      </motion.div>

      {/* Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-recovery" />
          <h2 className="text-sm font-semibold text-foreground">Daily Readiness</h2>
        </div>
        <div className="flex items-center justify-around">
          <ScoreRing score={data.readinessScore} color="hsl(var(--primary))" label="Readiness" />
          <ScoreRing score={data.recoveryScore} color="hsl(var(--recovery))" label="Recovery" />
          <ScoreRing score={100 - data.fatigueScore} color="hsl(var(--warning))" label="Energy" />
        </div>
      </motion.div>

      {/* HRV Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-1">HRV Trend</h2>
        <p className="text-[10px] text-muted-foreground mb-3">Higher is better · 7-day avg: {data.hrvAvg7Day}ms</p>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={weeklyHRV}>
            <defs>
              <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} />
            <Area type="monotone" dataKey="hrv" stroke="hsl(270, 70%, 60%)" fill="url(#hrvGrad)" strokeWidth={2} dot={{ fill: "hsl(270, 70%, 60%)", r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Key Insights</h2>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-recovery pl-3">
            Your HRV dropped 12% compared to weekly average. Recovery is reduced. Consider low-intensity activities.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-sleep pl-3">
            Sleep deficit detected: 2.4h this week. Focus on consistent bedtime to improve recovery.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary pl-3">
            Weight trend is positive: down 0.6kg this week. Maintain current activity and nutrition balance.
          </p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Recommendations</h2>
        <div className="flex flex-col gap-3">
          {mockHealthData.recommendations.map((rec, i) => (
            <RecommendationCard key={rec.id} recommendation={rec} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Coaching */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3">Coaching</h2>
        <div className="flex flex-col gap-3">
          {coachingPrograms.map((program, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${program.color}15` }}>
                <program.icon size={20} style={{ color: program.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{program.title}</p>
                <p className="text-[10px] text-muted-foreground">{program.subtitle}</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-primary/10">
                <span className="text-xs font-medium text-primary">Start</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InsightsPage;
