import { useState } from 'react'
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'
import Science from './pages/Science'
import Learning from './pages/Learning'
import { questions } from './data/questions'
import { calculateResult } from './utils/calculateResult'
import type { Answer } from './types'

function App() {
  const [view, setView] = useState<'home' | 'test' | 'result' | 'science' | 'learning'>('home')
  const [userAnswers, setUserAnswers] = useState<Record<string, Answer>>({})

  const handleStartTest = () => {
    setView('test')
  }

  const handleTestComplete = (answers: Record<string, Answer>) => {
    setUserAnswers(answers)
    setView('result')
  }

  const handleBackToHome = () => {
    setUserAnswers({})
    setView('home')
  }

  const handleRetakeTest = () => {
    setUserAnswers({})
    setView('test')
  }

  const handleNavigateToScience = () => {
    setView('science')
  }

  const handleNavigateToLearning = () => {
    setView('learning')
  }

  if (view === 'learning') {
    return (
      <div className="page-transition">
        <Learning onBackToHome={handleBackToHome} />
      </div>
    )
  }

  if (view === 'science') {
    return (
      <div className="page-transition">
        <Science onBackToHome={handleBackToHome} />
      </div>
    )
  }

  if (view === 'test') {
    return (
      <div className="page-transition">
        <Test
          questions={questions}
          onComplete={handleTestComplete}
          onBack={handleBackToHome}
        />
      </div>
    )
  }

  if (view === 'result') {
    const answersArray = Object.values(userAnswers)
    const result = calculateResult(answersArray, questions.length)
    return (
      <div className="page-transition">
        <Result
          result={result}
          onBackToHome={handleBackToHome}
          onRetakeTest={handleRetakeTest}
        />
      </div>
    )
  }

  return (
    <div className="page-transition">
      <Home onStartTest={handleStartTest} onNavigateToScience={handleNavigateToScience} onNavigateToLearning={handleNavigateToLearning} />
    </div>
  )
}

export default App
