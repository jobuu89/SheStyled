import React from 'react';

const LocationMap = ({ latitude, longitude, accuracy = 50, zoom = 15 }) => {
  // Simple SVG map representation (no external deps)
  const mapUrl = latitude 
    ? `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&ll=${latitude},${longitude}`
    : '#';

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-2xl border-4 border-white/20">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🗺️</span>
        <h3 className="text-xl font-bold text-white">Live Location</h3>
      </div>
      
      {latitude ? (
        <>
          {/* Simple SVG Map */}
          <div className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden mb-4 shadow-lg">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Background */}
              <rect width="400" height="300" fill="#e5e7eb" rx="10"/>
              {/* Grid */}
              <g stroke="#d1d5db" strokeWidth="1" opacity="0.5">
                <line x1="0" y1="75" x2="400" y2="75"/>
                <line x1="0" y1="150" x2="400" y2="150"/>
                <line x1="0" y1="225" x2="400" y2="225"/>
                <line x1="100" y1="0" x2="100" y2="300"/>
                <line x1="200" y1="0" x2="200" y2="300"/>
                <line x1="300" y1="0" x2="300" y2="300"/>
              </g>
              {/* Location Pin */}
              <g transform={`translate(200, 150)`}>
                <circle cx="0" cy="0" r={accuracy / 8} fill="#ef4444" opacity="0.3"/>
                <circle cx="0" cy="0" r={accuracy / 16} fill="#dc2626" stroke="white" strokeWidth="3"/>
                <path d="M 0 -30 L 10 -20 L 0 -10 L -10 -20 Z" fill="#dc2626" stroke="white" strokeWidth="2"/>
              </g>
              {/* Compass */}
              <g transform="translate(350, 30)">
                <circle cx="0" cy="0" r="15" fill="white" stroke="#059669" strokeWidth="2"/>
                <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#059669">N</text>
                <circle cx="0" cy="0" r="12" fill="#10b981"/>
              </g>
            </svg>
          </div>
          
          {/* Coords */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Latitude:</span>
              <span className="font-mono font-bold text-white">{latitude.toFixed(6)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Longitude:</span>
              <span className="font-mono font-bold text-white">{longitude.toFixed(6)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Accuracy:</span>
              <span className="font-mono font-bold text-emerald-300">{accuracy.toFixed(0)}m</span>
            </div>
          </div>
          
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl text-center backdrop-blur-sm transition-all"
          >
            📍 Open in Google Maps
          </a>
        </>
      ) : (
        <div className="h-64 bg-gradient-to-br from-gray-400/50 to-gray-500/50 rounded-xl flex items-center justify-center">
          <div className="text-center text-white/80">
            <div className="text-4xl mb-2">📍</div>
            <p>Location not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
