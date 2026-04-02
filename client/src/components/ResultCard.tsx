import { type PredictionResponse } from "@shared/routes";
import { type FieldAnalysis } from "@/lib/valueRanges";
import { CheckCircle, AlertTriangle, XCircle, RotateCcw, Loader2 } from "lucide-react";

interface ResultCardProps {
  result: PredictionResponse | null;
  loading: boolean;
  onReset: () => void;
  inputAnalysis?: FieldAnalysis[];
}

const statusColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  normal:   { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400" },
  medium:   { bg: "bg-yellow-500/10",  border: "border-yellow-500/30",  text: "text-yellow-400",  dot: "bg-yellow-400"  },
  high:     { bg: "bg-orange-500/10",  border: "border-orange-500/30",  text: "text-orange-400",  dot: "bg-orange-400"  },
  critical: { bg: "bg-red-500/10",     border: "border-red-500/30",     text: "text-red-400",     dot: "bg-red-400"     },
};

function riskLevelStyle(level: "Low" | "Medium" | "High") {
  if (level === "Low") return { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
  if (level === "Medium") return { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" };
  return { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" };
}

export function ResultCard({ result, loading, onReset, inputAnalysis }: ResultCardProps) {
  if (loading) {
    return (
      <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center min-h-[200px] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground text-sm">Running analysis…</p>
      </div>
    );
  }

  if (!result) return null;

  const { icon: RiskIcon, color, bg, border } = riskLevelStyle(result.riskLevel);

  return (
    <div className="space-y-4">
      {/* Main result card */}
      <div className={`glass-card p-6 rounded-2xl border ${border}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${bg}`}>
            <RiskIcon className={`w-7 h-7 ${color}`} />
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="space-y-1 mb-4">
          <h3 className={`text-2xl font-bold ${color}`}>{result.prediction}</h3>
          <p className="text-sm text-muted-foreground">Prediction Result</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <p className="text-lg font-semibold text-white">{result.confidence}</p>
          </div>
          <div className={`${bg} rounded-xl p-3 border ${border}`}>
            <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
            <p className={`text-lg font-semibold ${color}`}>{result.riskLevel}</p>
          </div>
        </div>

        {result.details && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{result.details}</p>
        )}
      </div>

      {/* Input analysis breakdown */}
      {inputAnalysis && inputAnalysis.length > 0 && (
        <div className="glass-card p-6 rounded-2xl">
          <h4 className="text-sm font-semibold text-white mb-4">Input Analysis</h4>
          <div className="space-y-2">
            {inputAnalysis.map((field) => {
              const s = statusColors[field.status] ?? statusColors.normal;
              return (
                <div key={field.label} className={`flex items-center justify-between p-3 rounded-xl border ${s.bg} ${s.border}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                    <span className="text-sm text-white/80 truncate">{field.label}</span>
                  </div>
                  <div className="flex flex-col items-end ml-2 flex-shrink-0">
                    <span className={`text-sm font-medium ${s.text}`}>{field.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
