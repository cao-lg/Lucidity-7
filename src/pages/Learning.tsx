import { useState } from 'react';
import { stages, stageDetails } from '../data/stages';
import StageDetail from '../components/StageDetail';

interface LearningProps {
  onBackToHome: () => void;
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

const stageKeywords: Record<number, string[]> = {
  1: ['安全', '生存', '稳定'],
  2: ['探索', '身份', '质疑'],
  3: ['归属', '认可', '角色'],
  4: ['成就', '目标', '卓越'],
  5: ['意义', '价值', '灵性'],
  6: ['服务', '慈悲', '贡献'],
  7: ['合一', '觉醒', '当下']
};

const selfCheckQuestions: Record<number, string[]> = {
  1: [
    '我主要关注如何保障基本的生活安全？',
    '面对变化时，我通常会感到焦虑和不安？',
    '我更倾向于选择熟悉和可预测的生活方式？',
    '我需要明确的规则和指引才能感到安心？'
  ],
  2: [
    '我经常质疑传统和权威的观点？',
    '我在思考"我到底是谁"这个问题？',
    '我愿意尝试不同的生活方式和价值观？',
    '我希望摆脱对他人的依赖，独立做出选择？',
    '我经常对人生的意义感到困惑和好奇？'
  ],
  3: [
    '我非常在意他人对我的看法和评价？',
    '我希望通过履行社会角色获得归属感？',
    '我积极参与社交活动并建立人际关系？',
    '我遵守社会规范，努力达到社会期待的标准？'
  ],
  4: [
    '我有明确的人生目标并为之努力奋斗？',
    '我相信只要努力就能实现自己的梦想？',
    '我愿意为了成功付出额外的努力？',
    '我经常思考如何提升自己的能力和效率？',
    '我追求卓越，不满足于平庸的表现？'
  ],
  5: [
    '我开始质疑物质成功是否能带来真正的幸福？',
    '我在思考什么才是人生真正重要的东西？',
    '我对哲学、灵性或宗教话题感兴趣？',
    '我愿意花时间进行冥想或内省？',
    '我希望找到自己的人生使命或calling？'
  ],
  6: [
    '我关心他人的福祉，希望帮助他人成长？',
    '我愿意为社区或更大的利益做贡献？',
    '我体验到自我与他人是相互连接的？',
    '我愿意分享自己的经验和智慧帮助他人？',
    '我在服务他人时感受到深层的满足感？'
  ],
  7: [
    '我能体验到与万物的深层连接感？',
    '我能够接纳生命的全部，包括光明与黑暗？',
    '我保持对当下的觉知，活在此时此刻？',
    '我内心平静，不受外部环境变化的太大影响？',
    '我体验到无条件的爱和慈悲？'
  ]
};

const practiceExercises: Record<number, { title: string; description: string; type: string }[]> = {
  1: [
    {
      title: '安全日记',
      description: '每天记录三件让你感到安全的事物。逐步扩展你对"安全"的理解，从物质安全延伸到心理安全感。',
      type: '反思'
    },
    {
      title: '小步冒险练习',
      description: '每周尝试一件略微超出舒适区的小事，比如走一条不同的回家路线、尝试新的食物。记录你的感受变化。',
      type: '行动'
    },
    {
      title: '身体扫描冥想',
      description: '每天进行10分钟的身体扫描冥想，关注身体各部位的感受，培养对内在体验的觉察。',
      type: '冥想'
    }
  ],
  2: [
    {
      title: '身份探索日记',
      description: '每周写下三个你认为重要的价值观，并反思这些价值观是如何形成的。它们真的代表真实的你吗？',
      type: '反思'
    },
    {
      title: '观点交换练习',
      description: '选择你强烈认同的一个观点，尝试从完全对立的角度思考并写下你的发现。培养多角度思考能力。',
      type: '思维'
    },
    {
      title: '新体验清单',
      description: '创建一个"我想尝试的事情"清单，每月至少完成一项。可以是爱好、技能、活动或任何新鲜体验。',
      type: '行动'
    }
  ],
  3: [
    {
      title: '人际关系审计',
      description: '列出你生活中最重要的10段关系，评估这些关系对你的意义，以及你是否在关系中保持真实的自己。',
      type: '反思'
    },
    {
      title: '社交媒体断舍离',
      description: '尝试一周不浏览社交媒体，记录这对你的自我感受和焦虑程度有什么影响。',
      type: '行动'
    },
    {
      title: '倾听练习',
      description: '在与他人对话时，刻意将80%的时间用于倾听而非表达。观察这如何改变你的关系质量。',
      type: '练习'
    }
  ],
  4: [
    {
      title: '目标清晰度检验',
      description: '写下你未来5年最想实现的3个目标，然后问自己：如果没有人知道你会成功，你还会追求这些目标吗？',
      type: '反思'
    },
    {
      title: '效率审计',
      description: '连续三天记录你每小时的活动，找出时间浪费的来源，并制定改进计划。',
      type: '行动'
    },
    {
      title: '失败学习日记',
      description: '每次遇到挫折时，详细记录发生了什么、你的感受、学到了什么。这如何帮助你成长？',
      type: '反思'
    }
  ],
  5: [
    {
      title: '存在性反思',
      description: '在一个安静的时刻，认真思考：如果这是生命的最后一年，你会做什么不同的事情？为什么？',
      type: '反思'
    },
    {
      title: '意义日志',
      description: '每天记录一件给你带来深层满足感的事情，无论多么渺小。寻找这些体验中的共同模式。',
      type: '日志'
    },
    {
      title: '价值观排序',
      description: '列出你认为最重要的10个价值观，然后逐一问：如果只能保留5个，你会保留哪些？为什么？',
      type: '反思'
    }
  ],
  6: [
    {
      title: '无条件的善举',
      description: '每天做一件不求回报的小善事：帮助陌生人、赞美他人、无偿服务。观察你内心的变化。',
      type: '行动'
    },
    {
      title: '慈悲冥想',
      description: '每天进行10分钟慈悲冥想：先对自己送出慈悲，然后对爱的人，最后对所有人，包括你不喜欢的人。',
      type: '冥想'
    },
    {
      title: '导师对话',
      description: '找一个你可以帮助的人（可以是一个年轻人或行业新人），分享你的经验和智慧。',
      type: '行动'
    }
  ],
  7: [
    {
      title: '正念日常',
      description: '选择一个日常活动（如洗碗、走路、吃饭），全身心投入其中，保持完全的觉知。做这件事时，不要想其他任何事情。',
      type: '冥想'
    },
    {
      title: '接纳日记',
      description: '记录你今天接纳的三件你无法改变的事情，以及你仍然在抗拒的一件事。反思抗拒如何影响了你。',
      type: '反思'
    },
    {
      title: '合一体验',
      description: '在大自然中静坐30分钟，尝试感受自己与万物的连接。你是自然的一部分，而不是分离的存在。',
      type: '冥想'
    }
  ]
};

export default function Learning({ onBackToHome }: LearningProps) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [compareStage1, setCompareStage1] = useState<number>(1);
  const [compareStage2, setCompareStage2] = useState<number>(7);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, Set<number>>>({});
  const [expandedExercises, setExpandedExercises] = useState<Record<number, Set<number>>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'compare' | 'path' | 'selfcheck' | 'practice'>('overview');

  const handleQuestionToggle = (stageId: number, questionIndex: number) => {
    setCheckedQuestions(prev => {
      const newState = { ...prev };
      if (!newState[stageId]) {
        newState[stageId] = new Set();
      }
      const stageQuestions = new Set(newState[stageId]);
      if (stageQuestions.has(questionIndex)) {
        stageQuestions.delete(questionIndex);
      } else {
        stageQuestions.add(questionIndex);
      }
      newState[stageId] = stageQuestions;
      return newState;
    });
  };

  const handleExerciseToggle = (stageId: number, exerciseIndex: number) => {
    setExpandedExercises(prev => {
      const newState = { ...prev };
      if (!newState[stageId]) {
        newState[stageId] = new Set();
      }
      const stageExercises = new Set(newState[stageId]);
      if (stageExercises.has(exerciseIndex)) {
        stageExercises.delete(exerciseIndex);
      } else {
        stageExercises.add(exerciseIndex);
      }
      newState[stageId] = stageExercises;
      return newState;
    });
  };

  const calculateSelfCheckResult = (stageId: number) => {
    const questions = selfCheckQuestions[stageId];
    const checked = checkedQuestions[stageId] || new Set();
    const ratio = checked.size / questions.length;
    
    if (ratio >= 0.7) {
      return { text: '你很可能处于这个阶段', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    } else if (ratio >= 0.4) {
      return { text: '你可能部分处于这个阶段，或正在向这个阶段过渡', color: 'text-amber-600', bg: 'bg-amber-50' };
    } else {
      return { text: '你目前可能不在这个阶段，但了解它有助于你的整体认知', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const tabs = [
    { id: 'overview', label: '阶段概览', icon: '📚' },
    { id: 'compare', label: '阶段对比', icon: '⚖️' },
    { id: 'path', label: '发展路径', icon: '🛤️' },
    { id: 'selfcheck', label: '自检清单', icon: '✅' },
    { id: 'practice', label: '实践练习', icon: '🎯' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 md:py-10 px-3 md:px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-6 md:mb-8 animate-fade-in-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            互动学习模式
          </h1>
          <p className="text-base md:text-xl text-gray-600 px-4 max-w-3xl mx-auto">
            深入探索7个意识发展阶段，开启你的觉醒之旅
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2 md:py-4 md:px-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg md:text-xl mb-1 block">{tab.icon}</span>
                <span className="text-xs md:text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="opacity-0 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  onClick={() => setSelectedStage(stage.id)}
                >
                  <div className={`bg-gradient-to-br ${stageColors[stage.id]} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-md">
                        {stageIcons[stage.id]}
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                        阶段 {stage.id}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {stage.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stageKeywords[stage.id].map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedStage && (
              <div className="mt-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    阶段 {selectedStage} 详情
                  </h3>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold transition-colors"
                  >
                    关闭
                  </button>
                </div>
                <StageDetail stageId={selectedStage} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">选择要对比的两个阶段</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    阶段 1
                  </label>
                  <select
                    value={compareStage1}
                    onChange={(e) => setCompareStage1(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        阶段 {stage.id}: {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    阶段 2
                  </label>
                  <select
                    value={compareStage2}
                    onChange={(e) => setCompareStage2(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        阶段 {stage.id}: {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {[compareStage1, compareStage2].map((stageId, idx) => {
                const stage = stages.find(s => s.id === stageId)!;
                const detail = stageDetails[stageId];
                return (
                  <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.2}s`, animationFillMode: 'forwards' }}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className={`bg-gradient-to-r ${stageColors[stageId]} p-4 md:p-6`}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl md:text-3xl">
                            {stageIcons[stageId]}
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
                              阶段 {stageId}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                              {stage.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 md:p-6 space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span>🎯</span> 核心特征
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {detail.characteristics.slice(0, 3).map((char, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{char.split('：')[1] || char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span>🌟</span> 典型表现
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {detail.typicalBehaviors.slice(0, 2).map((behavior, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{behavior}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span>👥</span> 代表人群
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {detail.representativeGroups.slice(0, 2).map((group, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{group}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span>💡</span> 成长重点
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {detail.growthSuggestions.slice(0, 2).map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'path' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                意识发展阶段路径图
              </h3>
              
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="relative flex items-center justify-between py-8">
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-rose-200 via-yellow-200 via-emerald-200 via-cyan-200 via-blue-200 to-violet-300 rounded-full transform -translate-y-1/2"></div>
                    
                    <div className="absolute top-1/2 left-0 right-0 flex items-center justify-between px-4 transform -translate-y-1/2">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="relative group">
                          {index < stages.length - 1 && (
                            <div className="absolute w-full h-1 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-full left-1/2 top-1/2 -translate-y-1/2">
                              <div className="absolute right-0 top-1/2 transform translate-y-1/2 translate-x-1/2">
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {stages.map((stage, index) => (
                      <div
                        key={stage.id}
                        className="relative z-10 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                      >
                        <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br ${stageColors[stage.id]} flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group`}>
                          <span className="text-2xl md:text-3xl lg:text-4xl mb-1">{stageIcons[stage.id]}</span>
                          <span className="text-white font-bold text-xs md:text-sm lg:text-base">{stage.id}</span>
                          
                          <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className={`bg-gradient-to-br ${stageColors[stage.id]} text-white p-3 rounded-xl shadow-xl whitespace-nowrap`}>
                              <h4 className="font-bold text-sm md:text-base mb-1">{stage.name}</h4>
                              <p className="text-xs text-white/90 max-w-xs hidden md:block">{stage.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1 justify-center">
                                {stageKeywords[stage.id].map((kw, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-white/20 rounded text-xs">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white/20"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center">
                          <h4 className="font-bold text-gray-800 text-xs md:text-sm lg:text-base">{stage.name}</h4>
                          <div className="mt-1 flex flex-wrap gap-1 justify-center">
                            {stageKeywords[stage.id].map((kw, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3">发展路径说明</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  意识的成长是一个螺旋上升的过程。从基本的生存本能（阶段1）逐步发展到觉醒合一（阶段7），
                  每个阶段都为更高阶段的发展奠定基础。在这个旅程中，你可能会发现自己同时处于多个阶段，
                  或者在某些阶段之间来回移动——这是完全正常的。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selfcheck' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {stages.map((stage, index) => {
                const result = calculateSelfCheckResult(stage.id);
                const questions = selfCheckQuestions[stage.id];
                const checked = checkedQuestions[stage.id] || new Set();
                
                return (
                  <div
                    key={stage.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <div className={`bg-gradient-to-r ${stageColors[stage.id]} p-4 md:p-6`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {stageIcons[stage.id]}
                        </div>
                        <div>
                          <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
                            阶段 {stage.id}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {stage.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6 space-y-3">
                      {questions.map((question, qIndex) => (
                        <label
                          key={qIndex}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={checked.has(qIndex)}
                            onChange={() => handleQuestionToggle(stage.id, qIndex)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {question}
                          </span>
                        </label>
                      ))}
                      
                      <div className={`mt-4 p-4 rounded-xl ${result.bg} border-l-4 ${stageColors[stage.id].split(' ')[0].replace('from-', 'border-')}`}>
                        <p className={`text-sm font-semibold ${result.color}`}>
                          {result.text}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          已回答 {checked.size}/{questions.length} 个问题
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {stages.map((stage, index) => {
                const exercises = practiceExercises[stage.id];
                
                return (
                  <div
                    key={stage.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <div className={`bg-gradient-to-r ${stageColors[stage.id]} p-4 md:p-6`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {stageIcons[stage.id]}
                        </div>
                        <div>
                          <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
                            阶段 {stage.id}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {stage.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      {exercises.map((exercise, eIndex) => {
                        const isExpanded = (expandedExercises[stage.id] || new Set()).has(eIndex);
                        
                        return (
                          <div
                            key={eIndex}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                          >
                            <button
                              onClick={() => handleExerciseToggle(stage.id, eIndex)}
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                  exercise.type === '反思' ? 'bg-blue-100 text-blue-700' :
                                  exercise.type === '行动' ? 'bg-emerald-100 text-emerald-700' :
                                  exercise.type === '冥想' ? 'bg-purple-100 text-purple-700' :
                                  exercise.type === '思维' ? 'bg-amber-100 text-amber-700' :
                                  exercise.type === '日志' ? 'bg-cyan-100 text-cyan-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {exercise.type}
                                </span>
                                <span className="font-semibold text-gray-800 text-sm">
                                  {exercise.title}
                                </span>
                              </div>
                              <svg
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            
                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="px-4 pb-4">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {exercise.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center mt-8 animate-bounce-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <button
            onClick={onBackToHome}
            className="btn-hover-effect inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg text-sm md:text-base"
          >
            ← 返回首页
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
