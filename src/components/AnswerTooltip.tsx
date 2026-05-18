import { useEffect, useState } from 'react';
import type { StageId } from '../types';
import { stages } from '../data/stages';

interface AnswerTooltipProps {
  stageId: StageId;
  autoHideDelay?: number;
  onClose?: () => void;
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

export default function AnswerTooltip({ stageId, autoHideDelay = 5000, onClose }: AnswerTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const stage = stages.find((s) => s.id === stageId)!;

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, autoHideDelay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [autoHideDelay, onClose]);

  const getShortExplanation = (id: StageId): string => {
    const explanations: Record<StageId, string> = {
      1: '这个答案反映了你对安全感和稳定的基本需求。',
      2: '这个选择体现了你正在积极探索自我身份。',
      3: '你的回答显示出对社会角色和人际关系的重视。',
      4: '这个答案表明你正在追求个人成就和目标实现。',
      5: '你的选择暗示你在寻求更深层的人生意义。',
      6: '这个答案反映了你对服务他人和贡献社会的关注。',
      7: '你的回答体现了对万物合一和内在觉醒的追求。'
    };
    return explanations[id];
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              {stageIcons[stageId]}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">阶段 {stageId}</h4>
              <p className="text-gray-600 text-sm">{stage.name}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {getShortExplanation(stageId)}
        </p>

        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">关键特征</p>
          <ul className="space-y-1.5">
            {stage.characteristics.slice(0, 3).map((char, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {char}
              </li>
            ))}
          </ul>
        </div>

        {isExpanded && (
          <div className="space-y-2 mb-4 animate-fade-in">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">完整特征</p>
            <ul className="space-y-1.5">
              {stage.characteristics.slice(3).map((char, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {char}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          {isExpanded ? '收起详情' : '了解更多'}
        </button>
      </div>

      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
    </div>
  );
}
