import { useState, useTransition } from 'react';
import type { Question, Answer } from '../types';
import ProgressBar from '../components/ProgressBar';
import AnswerOption from '../components/AnswerOption';
import AnswerTooltip from '../components/AnswerTooltip';

interface TestProps {
  questions: Question[];
  onComplete: (answers: Record<string, Answer>) => void;
  onBack: () => void;
}

export default function Test({ questions, onComplete, onBack }: TestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, Answer>>({});
  const [isPending, startTransition] = useTransition();
  const [showTooltip, setShowTooltip] = useState(false);
  const [lastSelectedStageId, setLastSelectedStageId] = useState<number | null>(null);
  
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQuestion.id];
  
  const handleSelectAnswer = (answer: Answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    setLastSelectedStageId(answer.stageId);
    setShowTooltip(true);
  };
  
  const handleNext = () => {
    startTransition(() => {
      setShowTooltip(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(userAnswers);
      }
    });
  };
  
  const handlePrev = () => {
    startTransition(() => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    });
  };
  
  const isLastQuestion = currentIndex === questions.length - 1;
  const canProceed = selectedAnswer !== undefined;
  
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 md:mb-8 animate-fade-in-down">
          <button
            onClick={onBack}
            className="btn-hover-effect text-gray-600 hover:text-indigo-600 flex items-center gap-2 mb-4 text-sm md:text-base"
          >
            ← 返回首页
          </button>
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
        
        <div 
          key={currentIndex}
          className="bg-white rounded-2xl shadow-xl p-5 md:p-8 animate-scale-in"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 md:mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>
          
          <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
            {currentQuestion.answers.map((answer, index) => (
              <div 
                key={answer.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
              >
                <AnswerOption
                  answer={answer}
                  isSelected={selectedAnswer?.id === answer.id}
                  onSelect={handleSelectAnswer}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0 || isPending}
              className={`btn-hover-effect flex-1 py-3 px-6 rounded-xl font-semibold ${
                currentIndex === 0 || isPending
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              上一题
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed || isPending}
              className={`btn-hover-effect flex-1 py-3 px-6 rounded-xl font-semibold ${
                canProceed && !isPending
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  处理中...
                </span>
              ) : (
                isLastQuestion ? '完成测试' : '下一题 →'
              )}
            </button>
          </div>
        </div>

        {showTooltip && lastSelectedStageId && (
          <AnswerTooltip
            stageId={lastSelectedStageId as 1 | 2 | 3 | 4 | 5 | 6 | 7}
            onClose={() => setShowTooltip(false)}
          />
        )}
      </div>
    </div>
  );
}
