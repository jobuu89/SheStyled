import React, { useState } from 'react';
import Button from './Button.jsx';

const LocationSharing = ({ onShareLocation, onStopSharing, sharing, contacts, onContactsChange }) => {
  const [duration, setDuration] = useState(60); // minutes
  const [newContact, setNewContact] = useState('');

  const addContact = () => {
    if (newContact.trim() && !contacts.includes(newContact.trim())) {
      onContactsChange([...contacts, newContact.trim()]);
      setNewContact('');
    }
  };

  const removeContact = (contactToRemove) => {
    onContactsChange(contacts.filter(contact => contact !== contactToRemove));
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trusted Contacts
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="email"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button onClick={addContact} size="small">
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
              loading={false}
              disabled={contacts.length === 0}
              variant="safety"
              className="flex-1"
            >
              Share Location ({duration} min)
            </Button>
          ) : (
            <Button
              onClick={onStopSharing}
              variant="secondary"
              className="flex-1"
            >
              Stop Sharing
            </Button>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            🔒 Your location is encrypted end-to-end and only shared with your selected contacts for the specified duration.
          </p>
        </div>

        {sharing && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">
              ✅ Location is being shared with {contacts.length} contact{contacts.length !== 1 ? 's' : ''} for {duration} minutes
            </p>
            <p className="text-xs text-green-600 mt-1">
              Real-time location tracking active • Data persisted locally
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharing;