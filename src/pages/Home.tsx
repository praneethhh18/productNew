import React from 'react';
import { Beaker, Brain, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: Beaker,
      title: 'Advanced Analysis',
      description: 'Precise carbon dating analysis using state-of-the-art technology',
      link: '/analysis'
    },
    {
      icon: Database,
      title: 'Sample Database',
      description: 'Comprehensive database of analyzed samples and results',
      link: '/database'
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Machine learning models for enhanced accuracy',
      link: '/training'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Carbon Dating AI Platform
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Revolutionizing archaeological dating through artificial intelligence and advanced carbon analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.link}
              className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <Icon className="w-12 h-12 text-blue-400 mb-4" />
              <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center text-blue-400">
                <span className="mr-2">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Carbon Dating Process</h3>
            <p className="text-gray-400">
              Our platform combines traditional carbon-14 dating methods with advanced AI algorithms to provide highly accurate age estimations for archaeological samples.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Enhancement</h3>
            <p className="text-gray-400">
              Machine learning models analyze multiple data points and historical patterns to improve dating accuracy and provide detailed insights into sample analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;