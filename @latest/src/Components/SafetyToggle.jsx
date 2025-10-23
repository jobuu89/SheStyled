import React from 'react';

const SafetyToggle = ({ isActive, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Safety Outfit Mode</h3>
        <span className="text-2xl">🛡️</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggle}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              isActive ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-lg font-semibold ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
            {isActive ? 'Safety Mode Active' : 'Safety Mode Inactive'}
          </span>
        </div>
      </div>

      {isActive && (
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Safety Features Activated:</h4>
          <ul className="space-y-1 text-sm text-purple-700">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Darker color tones
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Better coverage
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Functional pockets
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Comfortable footwear
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Practical accessories
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SafetyToggle;
