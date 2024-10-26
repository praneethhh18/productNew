import React, { useState } from 'react';
import { Brain, BarChart, Settings, Play } from 'lucide-react';

const Training: React.FC = () => {
  const [modelStatus, setModelStatus] = useState('idle');
  const [epochs, setEpochs] = useState(10);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const startTraining = () => {
    setModelStatus('training');
    // Simulated training progress
    setTimeout(() => {
      setModelStatus('complete');
      setAccuracy(0.956);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Model Training</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold">Training Parameters</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Epochs</label>
              <input
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(parseInt(e.target.value))}
                min="1"
                max="100"
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center mb-4">
            <BarChart className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold">Model Performance</h2>
          </div>
          
          <div className="text-center py-4">
            {accuracy ? (
              <div>
                <p className="text-3xl font-bold text-blue-400">{(accuracy * 100).toFixed(1)}%</p>
                <p className="text-gray-400 mt-2">Accuracy</p>
              </div>
            ) : (
              <p className="text-gray-400">No training data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={startTraining}
          disabled={modelStatus === 'training'}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 mx-auto transition-all duration-300 disabled:opacity-50"
        >
          {modelStatus === 'training' ? (
            <>
              <Brain className="animate-pulse" />
              <span>Training in Progress...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Start Training</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Training;