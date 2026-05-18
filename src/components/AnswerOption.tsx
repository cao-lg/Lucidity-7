import type { Answer } from '../types';

interface AnswerOptionProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: (answer: Answer) => void;
}

export default function AnswerOption({ answer, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <button
      onClick={() => onSelect(answer)}
      className={`btn-hover-effect w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md scale-[1.02]'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50 hover:scale-[1.01]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 md:w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'border-indigo-500 bg-indigo-500 animate-scale-in'
              : 'border-gray-300'
          }`}
        >
          {isSelected && (
            <div className="w-2 h-2 md:w-2.5 h-2.5 rounded-full bg-white" />
          )}
        </div>
        <span className={`text-base md:text-lg ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
          {answer.text}
        </span>
      </div>
    </button>
  );
}
