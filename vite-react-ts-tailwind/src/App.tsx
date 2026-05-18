import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6 space-x-4">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="h-20" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="h-20 animate-spin" alt="React logo" />
          </a>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Vite + React + TypeScript
        </h1>
        <p className="text-center text-gray-600 mb-8">
          with Tailwind CSS
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Count is {count}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Edit <code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
