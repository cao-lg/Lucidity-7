import { useState } from 'react';
import type { Stage, StageDetail } from '../types';
import { stages, stageDetails } from '../data/stages';

interface StageDetailProps {
  stageId?: number;
  stage?: Stage;
  stageDetail?: StageDetail;
  defaultExpanded?: boolean;
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

const sectionIcons = {
  definition: '📖',
  characteristics: '🎯',
  typicalBehaviors: '🌟',
  representativeGroups: '👥',
  developmentSigns: '🚀',
  commonPitfalls: '⚠️',
  growthSuggestions: '💡'
};

interface AccordionSection {
  id: string;
  title: string;
  icon: string;
  content: () => React.ReactNode;
}

export default function StageDetail({ stageId, stage, stageDetail, defaultExpanded = false }: StageDetailProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    defaultExpanded ? new Set(['definition', 'characteristics']) : new Set()
  );
  const [allExpanded, setAllExpanded] = useState(false);

  const currentStage = stage || (stageId ? stages.find(s => s.id === stageId) : null);
  const currentDetail = stageDetail || (currentStage ? stageDetails[currentStage.id] : null);

  if (!currentStage || !currentDetail) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-gray-500">未找到阶段信息</p>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(sections.map(s => s.id)));
    }
    setAllExpanded(!allExpanded);
  };

  const sections: AccordionSection[] = [
    {
      id: 'definition',
      title: '心理学定义',
      icon: sectionIcons.definition,
      content: () => (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {currentDetail.definition}
          </p>
        </div>
      )
    },
    {
      id: 'characteristics',
      title: '核心特征',
      icon: sectionIcons.characteristics,
      content: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentDetail.characteristics.map((char, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stageColors[currentStage.id]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {idx + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{char}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'typicalBehaviors',
      title: '典型表现',
      icon: sectionIcons.typicalBehaviors,
      content: () => (
        <ul className="space-y-3">
          {currentDetail.typicalBehaviors.map((behavior, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">•</span>
              <span className="text-gray-700 text-sm leading-relaxed">{behavior}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      id: 'representativeGroups',
      title: '代表人群',
      icon: sectionIcons.representativeGroups,
      content: () => (
        <div className="flex flex-wrap gap-2">
          {currentDetail.representativeGroups.map((group, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${stageColors[currentStage.id]} bg-opacity-10 text-gray-700 rounded-full text-sm border border-gray-200 hover:border-opacity-50 transition-colors`}
            >
              {group}
            </span>
          ))}
        </div>
      )
    },
    {
      id: 'developmentSigns',
      title: '发展标志',
      icon: sectionIcons.developmentSigns,
      content: () => (
        <div className="space-y-3">
          {currentDetail.developmentSigns.map((sign, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100">
              <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-gray-700 text-sm leading-relaxed">{sign}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'commonPitfalls',
      title: '常见误区',
      icon: sectionIcons.commonPitfalls,
      content: () => (
        <div className="space-y-3">
          {currentDetail.commonPitfalls.map((pitfall, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-white rounded-lg border border-amber-200">
              <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
              <p className="text-gray-700 text-sm leading-relaxed">{pitfall}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'growthSuggestions',
      title: '成长建议',
      icon: sectionIcons.growthSuggestions,
      content: () => (
        <div className="space-y-3">
          {currentDetail.growthSuggestions.map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-white rounded-lg border border-indigo-100">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stageColors[currentStage.id]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {idx + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className={`bg-gradient-to-r ${stageColors[currentStage.id]} p-6 md:p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl md:text-4xl shadow-lg">
            {stageIcons[currentStage.id]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                阶段 {currentStage.id}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentStage.name}
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              {currentStage.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
        <button
          onClick={toggleAllSections}
          className={`w-full py-3 px-4 bg-gradient-to-r ${stageColors[currentStage.id]} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg`}
        >
          {allExpanded ? '收起所有内容' : '展开所有内容'}
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} className="animate-fadeIn">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 md:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <span className="font-semibold text-gray-800">{section.title}</span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-6">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    {section.content()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
