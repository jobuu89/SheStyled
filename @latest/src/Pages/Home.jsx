import React from 'react';
import { Link } from 'react-router-dom';
import OutfitFilters from '../Components/OutFilters.jsx';
import SafetyToggle from '../Components/SafetyToggle.jsx';
import { useOutfit } from '../contexts/OutfitContext';

const Home = () => {
  const { filters, setFilters } = useOutfit();

  const handleSafetyToggle = (safetyMode) => {
    setFilters(prev => ({ ...prev, safetyMode }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              SheStyled
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized outfit recommendations with your safety in mind
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Style Assistant</h3>
            <p className="text-gray-600 text-sm">
              Get personalized outfit recommendations based on your preferences
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety First</h3>
            <p className="text-gray-600 text-sm">
              Smart recommendations for night-time and travel occasions
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Sharing</h3>
            <p className="text-gray-600 text-sm">
              Share your location securely with trusted contacts
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with other women for style inspiration and tips
            </p>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <SafetyToggle 
              isActive={filters.safetyMode}
              onToggle={() => handleSafetyToggle(!filters.safetyMode)}
            />
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/safety-mode" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  🛡️ Safety Guide
                </Link>
                <Link 
                  to="/community" 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  💬 Join Community
                </Link>
              </div>
            </div>
          </div>

          {/* Main Filters */}
          <div className="lg:w-2/3">
            <OutfitFilters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;