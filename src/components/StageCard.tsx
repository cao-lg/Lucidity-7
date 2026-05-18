import type { Stage } from '../types';

interface StageCardProps {
  stage: Stage;
  index?: number;
}

const stageIcons: Record<number, string> = {
  1: '🏠',
  2: '🔍',
  3: '👥',
  4: '⭐',
  5: '💫',
  6: '🤝',
  7: '✨'
};

const stageColors: Record<number, string> = {
  1: 'from-rose-500 to-pink-500',
  2: 'from-orange-500 to-amber-500',
  3: 'from-yellow-500 to-lime-500',
  4: 'from-emerald-500 to-teal-500',
  5: 'from-cyan-500 to-sky-500',
  6: 'from-blue-500 to-indigo-500',
  7: 'from-violet-500 to-purple-500'
};

export default function StageCard({ stage }: StageCardProps) {
  return (
    <div 
      className="card-hover group relative bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stageColors[stage.id]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
      <div className={`w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-gradient-to-br ${stageColors[stage.id]} flex items-center justify-center text-2xl md:text-3xl mb-4 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300`}>
        {stageIcons[stage.id]}
      </div>
      <div className="absolute top-4 right-4 w-7 md:w-8 h-7 md:h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs md:text-sm group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300">
        {stage.id}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
        {stage.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {stage.description}
      </p>
    </div>
  );
}
