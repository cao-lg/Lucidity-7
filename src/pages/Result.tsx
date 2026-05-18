import type { TestResult } from '../types';
import { stages } from '../data/stages';
import ResultChart from '../components/ResultChart';
import { getCombinationInterpretation, getConfidenceExplanation } from '../utils/calculateResult';

interface ResultProps {
  result: TestResult;
  onBackToHome: () => void;
  onRetakeTest: () => void;
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

const confidenceConfig = {
  high: { label: '高置信度', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', icon: '🎯' },
  medium: { label: '中等置信度', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: '⚖️' },
  low: { label: '低置信度', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: '🌊' }
};

export default function Result({ result, onBackToHome, onRetakeTest }: ResultProps) {
  const dominantStage = stages.find((s) => s.id === result.dominantStage)!;
  const combination = result.combinationStages ? getCombinationInterpretation(result.combinationStages) : null;
  const confidenceInfo = confidenceConfig[result.confidence];
  const confidenceExplanation = getConfidenceExplanation(result.confidence);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12 px-3 md:px-4">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center mb-6 md:mb-8 animate-fade-in-down">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            测试结果
          </h1>
          <p className="text-base md:text-xl text-gray-600 px-4">
            恭喜你完成测试，这是你的意识层次分析
          </p>
        </div>

        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className={`bg-gradient-to-br ${stageColors[dominantStage.id]} rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-white relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-white rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="w-16 md:w-24 h-16 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center text-4xl md:text-6xl animate-bounce-in">
                  {stageIcons[dominantStage.id]}
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm font-medium text-white/80 mb-1 md:mb-2">
                    你的主导阶段
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-1">
                    阶段 {dominantStage.id}
                  </div>
                  <div className="text-lg md:text-2xl font-semibold">
                    {dominantStage.name}
                  </div>
                </div>
              </div>
              <p className="text-base md:text-lg text-white/90 text-center max-w-2xl mx-auto leading-relaxed">
                {dominantStage.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg card-hover">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">✨</span>
                特点
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {dominantStage.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-3 animate-fade-in-left" style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                    <span className="mt-1.5 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-600 text-sm md:text-base">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg card-hover">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">🌱</span>
                成长建议
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {dominantStage.growthAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-3 animate-fade-in-left" style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'forwards' }}>
                    <span className="mt-1.5 w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-600 text-sm md:text-base">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <ResultChart result={result} />
        </div>

        {result.developmentTrend && (
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg card-hover">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">📈</span>
                发展趋势分析
              </h3>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  {result.developmentTrend.direction === 'ascending' ? '⬆️' : result.developmentTrend.direction === 'descending' ? '⬇️' : '➡️'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                    {result.developmentTrend.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">当前阶段:</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-medium">
                      阶段 {result.developmentTrend.current} - {stages.find(s => s.id === result.developmentTrend!.current)?.name}
                    </span>
                    {result.developmentTrend.direction !== 'stable' && (
                      <>
                        <span className="mx-1">→</span>
                        <span className="font-medium">相邻阶段:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium">
                          阶段 {result.developmentTrend.adjacentStage} - {stages.find(s => s.id === result.developmentTrend!.adjacentStage)?.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {combination && (
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 md:p-6 shadow-lg text-white">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">🔗</span>
                阶段组合解读
              </h3>
              <div className="mb-4">
                <p className="text-white/90 font-semibold text-base md:text-lg mb-2">
                  {combination.mainTheme}
                </p>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {combination.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {combination.stages.map((stageId) => {
                  const stage = stages.find(s => s.id === stageId)!;
                  return (
                    <div
                      key={stageId}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl"
                    >
                      <span className="text-lg">{stageIcons[stageId]}</span>
                      <div>
                        <div className="text-xs text-white/70">阶段 {stageId}</div>
                        <div className="text-sm font-medium">{stage.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <div className={`${confidenceInfo.bgColor} border ${confidenceInfo.borderColor} rounded-2xl p-5 md:p-6`}>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">{confidenceInfo.icon}</span>
              置信度评估
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div className={`${confidenceInfo.color} font-bold text-2xl md:text-3xl`}>
                {confidenceInfo.label}
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      result.confidence === 'high' ? 'bg-emerald-500' :
                      result.confidence === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: result.confidence === 'high' ? '90%' : result.confidence === 'medium' ? '60%' : '30%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {confidenceExplanation}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center opacity-0 animate-bounce-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <button
            onClick={onRetakeTest}
            className="btn-hover-effect bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg"
          >
            重新测试
          </button>
          <button
            onClick={onBackToHome}
            className="btn-hover-effect bg-white text-gray-700 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg border border-gray-200"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
