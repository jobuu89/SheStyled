import React, { useState } from 'react';
import Button from './Button.jsx';

const LocationSharing = ({ onShareLocation, onStopSharing, sharing, contacts, readonly, shareUrl }) => {
  const [duration, setDuration] = useState(60); // minutes

  const validateContactArray = () => {
    if (!contacts || contacts.length === 0) {
      return 'Please add trusted contacts in your Profile first';
    }
    if (contacts.length > 5) {
      return 'Too many contacts';
    }
    return null;
  };

  const validationError = validateContactArray();

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">📍</span>
        <h3 className="text-xl font-bold text-gray-800">Location Sharing</h3>
      </div>

      <div className="space-y-4">
        {/* Trusted Contacts */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
            Trusted Contacts <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{contacts?.length || 0}/5</span>
          </label>
          {readonly ? (
            <>
              <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
                {contacts?.map((contact, index) => (
                  <div key={index} className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {contact.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900 flex-1 truncate">{contact}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Primary</span>
                  </div>
                )) || <p className="text-sm text-gray-500 italic py-8 text-center">Add contacts in Profile → Safety section</p>}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  📱 <strong>Manage contacts:</strong> Profile page → Emergency Contacts
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-500 italic py-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                Legacy editable mode - use Profile for persistent contacts
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{contact}</span>
                    <button
                      onClick={() => removeContact(contact)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              {contacts.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">Add at least one contact to enable sharing</p>
              )}
            </>
          )}
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Duration: {duration} minutes
          </label>
          <input
            type="range"
            min="15"
            max="240"
            step="15"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>15min</span>
            <span>1hr</span>
            <span>2hr</span>
            <span>4hr</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {!sharing ? (
              <Button
              onClick={() => onShareLocation(duration)}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all font-bold py-5 text-lg"
            >
              🚀 Share Live Location ({duration}min) - {contacts.length} contacts
            </Button>

          ) : (
            <Button
              onClick={onStopSharing}
              variant="secondary"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              ⏹️ Stop Sharing
            </Button>
          )}
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            🔒 Secure cloud sharing with real-time updates. Contacts can view live location via share link.
          </p>
        </div>

        {/* Share Link Display */}
{sharing && (
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 shadow-2xl animate-pulse">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center">
              ✅ LIVE LOCATION SHARED
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-100 font-semibold">Share this link:</span>
              <Button 
                onClick={copyShareUrl}
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl"
              >
                📋 Copy Link
              </Button>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 mb-3">
              <input
                readOnly
                value={shareUrl || 'Loading...'}
                className="w-full text-sm font-mono text-gray-900 bg-transparent focus:outline-none"
              />
            </div>
            <p className="text-emerald-100 text-xs text-center">
              👥 Shared with {contacts.length} trusted contacts • 🔄 Real-time GPS • ⏱️ {duration}min active
            </p>
          </div>
        )}


        {sharing && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700 flex items-center">
              ✅ Active with {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              ☁️ Cloud-synced • Real-time GPS tracking
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharing;
