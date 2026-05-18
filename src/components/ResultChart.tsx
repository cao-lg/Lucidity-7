import type { TestResult } from '../types';
import { stages } from '../data/stages';

interface ResultChartProps {
  result: TestResult;
}

const stageColors: Record<number, string> = {
  1: 'bg-rose-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-emerald-500',
  5: 'bg-cyan-500',
  6: 'bg-blue-500',
  7: 'bg-violet-500'
};

export default function ResultChart({ result }: ResultChartProps) {
  const maxScore = Math.max(...Object.values(result.stageScores));

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg card-hover">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-5 md:mb-6 text-center">
        各阶段得分分布
      </h3>
      <div className="space-y-3 md:space-y-4">
        {stages.map((stage, index) => {
          const score = result.stageScores[stage.id];
          const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
          const isDominant = stage.id === result.dominantStage;

          return (
            <div 
              key={stage.id} 
              className="flex items-center gap-3 md:gap-4 opacity-0 animate-fade-in-right"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 md:w-20 text-right flex-shrink-0">
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  {stage.name}
                </span>
              </div>
              <div className="flex-1 h-6 md:h-8 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${stageColors[stage.id]} ${isDominant ? 'ring-2 ring-offset-2 ring-gray-800' : ''} relative overflow-hidden`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shimmer"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-end pr-2 md:pr-3">
                  <span className="text-xs md:text-sm font-bold text-gray-800">
                    {score}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
