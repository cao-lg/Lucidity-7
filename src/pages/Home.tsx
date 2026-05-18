import { stages } from '../data/stages';
import StageCard from '../components/StageCard';

interface HomeProps {
  onStartTest: () => void;
  onNavigateToScience: () => void;
  onNavigateToLearning: () => void;
}

export default function Home({ onStartTest, onNavigateToScience, onNavigateToLearning }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-12 md:py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 md:w-72 h-48 md:h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-yellow-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              探索你的<br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                意识层次
              </span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-indigo-100 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              通过这个科学的测试，了解你当前所处的意识发展阶段，
              发现个人成长的方向与可能性
            </p>
            <button
              onClick={onStartTest}
              className="btn-hover-effect bg-white text-indigo-600 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:bg-yellow-50 shadow-xl hover:shadow-2xl transform animate-bounce-in animate-pulse-glow"
            >
              开始测试 →
            </button>
            <button
              onClick={onNavigateToScience}
              className="btn-hover-effect bg-indigo-700 text-white font-semibold py-3 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:bg-indigo-800 shadow-xl hover:shadow-2xl transform animate-bounce-in"
            >
              科学性验证 📊
            </button>
            <button
              onClick={onNavigateToLearning}
              className="btn-hover-effect bg-purple-700 text-white font-semibold py-3 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:bg-purple-800 shadow-xl hover:shadow-2xl transform animate-bounce-in"
            >
              互动学习 🎯
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              7个意识发展阶段
            </h2>
            <p className="text-gray-600 text-base md:text-lg px-4">
              从生存本能到觉醒合一，每个人都在自己的道路上前进
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {stages.map((stage, index) => (
              <div 
                key={stage.id} 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <StageCard stage={stage} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
