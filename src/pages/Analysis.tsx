import React, { useState } from 'react';
import { Upload, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface AnalysisResult {
  id: number;
  estimated_age: number;
}

const Analysis: React.FC = () => {
  const [sample, setSample] = useState({
    name: '',
    description: '',
    carbon_14_ratio: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/analyze', {
        ...sample,
        carbon_14_ratio: parseFloat(sample.carbon_14_ratio)
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze sample. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Sample Analysis</h1>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Sample Name</label>
            <input
              type="text"
              value={sample.name}
              onChange={(e) => setSample({ ...sample, name: e.target.value })}
              className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location Found</label>
            <input
              type="text"
              value={sample.location}
              onChange={(e) => setSample({ ...sample, location: e.target.value })}
              className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={sample.description}
              onChange={(e) => setSample({ ...sample, description: e.target.value })}
              className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Carbon-14 Ratio</label>
            <input
              type="number"
              step="0.000001"
              value={sample.carbon_14_ratio}
              onChange={(e) => setSample({ ...sample, carbon_14_ratio: e.target.value })}
              className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Upload className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Analyze Sample</span>
              </>
            )}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <p className="text-4xl font-bold text-blue-400">
            {result.estimated_age.toLocaleString()} years old
          </p>
          <p className="mt-2 text-gray-400">Sample ID: {result.id}</p>
        </div>
      )}
    </div>
  );
};

export default Analysis;