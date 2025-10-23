import React, { useState } from 'react';
import { useOutfit } from '../contexts/OutfitContext';
import { OCCASIONS, AESTHETICS, MOODS, COLORS } from '../constants/outfitTypes';
import Button from './Button.jsx';

const OutfitFilters = () => {
  const { filters, setFilters, getRecommendations } = useOutfit();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    getRecommendations(localFilters);
  };

  const handleSafetyToggle = () => {
    const newFilters = { 
      ...localFilters, 
      safetyMode: !localFilters.safetyMode 
    };
    setLocalFilters(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Outfit</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Occasion</label>
          <select 
            value={localFilters.occasion} 
            onChange={(e) => handleFilterChange('occasion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Any Occasion</option>
            {OCCASIONS.map(occasion => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Aesthetic</label>
          <select 
            value={localFilters.aesthetic} 
            onChange={(e) => handleFilterChange('aesthetic', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Any Style</option>
            {AESTHETICS.map(aesthetic => (
              <option key={aesthetic} value={aesthetic}>{aesthetic}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Mood</label>
          <select 
            value={localFilters.mood} 
            onChange={(e) => handleFilterChange('mood', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Any Mood</option>
            {MOODS.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Safety Mode</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSafetyToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localFilters.safetyMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localFilters.safetyMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {localFilters.safetyMode ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleApplyFilters}
        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
      >
        Get AI Recommendations
      </Button>

      {localFilters.safetyMode && (
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-purple-600 mr-2">🛡️</span>
            <p className="text-purple-800 text-sm font-medium">
              Safety Mode Active: Recommending practical outfits with coverage and functional features
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitFilters;