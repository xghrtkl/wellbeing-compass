import { motion } from "framer-motion";
import { Footprints, Moon, Utensils, HeartPulse, Waves, AlertTriangle, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  footprints: Footprints,
  moon: Moon,
  utensils: Utensils,
  "heart-pulse": HeartPulse,
  waves: Waves,
};

const priorityColors: Record<string, string> = {
  high: "hsl(var(--destructive))",
  medium: "hsl(var(--warning))",
  low: "hsl(var(--primary))",
};

const priorityIcons: Record<string, React.ElementType> = {
  high: AlertTriangle,
  medium: AlertTriangle,
  low: CheckCircle,
};

interface Recommendation {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  icon: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const RecommendationCard = ({ recommendation, index }: RecommendationCardProps) => {
  const Icon = iconMap[recommendation.icon] || Footprints;
  const PriorityIcon = priorityIcons[recommendation.priority] || CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-card rounded-lg p-4 flex gap-3"
    >
      <div
        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${priorityColors[recommendation.priority]}15` }}
      >
        <Icon size={20} style={{ color: priorityColors[recommendation.priority] }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <PriorityIcon size={12} style={{ color: priorityColors[recommendation.priority] }} />
          <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: priorityColors[recommendation.priority] }}>
            {recommendation.priority}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-0.5">{recommendation.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{recommendation.description}</p>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
