import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OutfitFilters from '../Components/OutFilters.jsx';
import SafetyToggle from '../Components/SafetyToggle.jsx';
import { useOutfit } from '../contexts/OutfitContext';
import { useAuth } from '../hooks/UseAuth.jsx';

const Home = () => {
  const { filters, setFilters } = useOutfit();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSafetyToggle = (safetyMode) => {
    setFilters(prev => ({ ...prev, safetyMode }));
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
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
            <div className="mt-6">
              {user ? (
                <button
                  onClick={handleDashboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Grid - Removed static feature cards per user request */}
        <div className="h-32 mb-12" />

        {/* Recommendation Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3" />

          {/* Main Filters */}
          <div className="lg:w-2/3">
null
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;