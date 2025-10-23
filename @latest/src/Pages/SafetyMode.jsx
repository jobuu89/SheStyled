import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSharing from '../Components/LocationSharing.jsx';
import { useLocation } from '../hooks/useLocation';
import { SAFETY_TIPS } from '../constants/safety';
import Button from '../Components/Button.jsx';

const SafetyMode = () => {
  const navigate = useNavigate();
  const [trustedContacts, setTrustedContacts] = useState([]);
  const { shareLocation, stopSharing, sharing } = useLocation();

  const handleShareLocation = async (duration) => {
    try {
      const result = await shareLocation(trustedContacts, duration);
      alert(`Location shared successfully with ${trustedContacts.length} contact(s) for ${duration} minutes!`);
    } catch (error) {
      alert('Failed to share location: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Button
              onClick={() => navigate('/')}
              className="mr-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              ← Back to Home
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety & Preparedness</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tools and tips to help you stay safe while looking great
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* Safety Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LocationSharing 
              onShareLocation={handleShareLocation}
              onStopSharing={stopSharing}
              sharing={sharing}
              contacts={trustedContacts}
              onContactsChange={setTrustedContacts}
            />

            {/* Safety Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Safety Tips</h2>
              <div className="grid gap-4">
                {SAFETY_TIPS.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-blue-800 font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outfit Safety Guide */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Safety-Focused Outfit Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌙</span>
                  Evening Outfits
                </h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Choose darker colors for low visibility
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Opt for comfortable, walkable shoes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Select outfits with secure pockets
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Consider layers for changing situations
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✈️</span>
                  Travel Attire
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Wear practical, comfortable clothing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Keep essentials in accessible pockets
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Choose wrinkle-resistant fabrics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Layer for changing temperatures
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMode;