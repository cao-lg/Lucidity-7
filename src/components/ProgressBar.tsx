interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs md:text-sm font-medium text-gray-600">
          第 {current} 题 / 共 {total} 题
        </span>
        <span className="text-xs md:text-sm font-semibold text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 md:h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
