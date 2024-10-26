import React, { useEffect, useState } from 'react';
import { Database, Calendar, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

interface Sample {
  id: number;
  name: string;
  description: string;
  carbon_14_ratio: number;
  estimated_age: number;
  location: string;
  date_analyzed: string;
}

const DatabaseView: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await axios.get('/api/samples');
        setSamples(response.data);
      } catch (error) {
        console.error('Failed to fetch samples:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSamples();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Sample Database</h1>
        <div className="bg-gray-800 px-4 py-2 rounded-lg">
          <span className="text-gray-400">Total Samples: </span>
          <span className="font-bold text-blue-400">{samples.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Database className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-400" />
          <p>Loading samples...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {samples.map((sample) => (
            <div
              key={sample.id}
              className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-blue-400">{sample.name}</h2>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  ID: {sample.id}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4">{sample.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{sample.estimated_age.toLocaleString()} years old</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{sample.location}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{new Date(sample.date_analyzed).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatabaseView;