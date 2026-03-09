import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  progress?: number;
  color: string;
  delay?: number;
}

const MetricCard = ({ icon: Icon, label, value, unit, subtitle, progress, color, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card rounded-lg p-4 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md" style={{ backgroundColor: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-display text-foreground">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {progress !== undefined && (
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>
      )}
      {subtitle && <span className="text-[10px] text-muted-foreground/70">{subtitle}</span>}
    </motion.div>
  );
};

export default MetricCard;
