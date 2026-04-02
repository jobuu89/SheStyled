import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../Components/Firebase';
import LocationMap from '../Components/LocationMap';

const ShareViewer = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unsub, setUnsub] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const locationRef = doc(db, 'sharedLocations', sessionId);

    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      locationRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setLocationData(docSnap.data());
          setError(null);
        } else {
          setError('Location session not found or expired');
        }
        setLoading(false);
      },
      (err) => {
        setError('Error loading location: ' + err.message);
        setLoading(false);
      }
    );

    setUnsub(() => unsubscribe);

    // Cleanup
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [sessionId]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Visual feedback handled by UI
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading live location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Live Location Sharing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time location updates. Shared securely for safety.
          </p>
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800 font-medium">✅ Active Session</p>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">{error}</h2>
            <p className="text-red-600 mb-6">The sharing session may have ended or been invalid.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Go Home
            </button>
          </div>
        ) : locationData ? (
          <div className="space-y-8">
            {/* Map */}
            <LocationMap 
              latitude={locationData.location?.latitude} 
              longitude={locationData.location?.longitude}
              accuracy={locationData.location?.accuracy || 50}
            />

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Session Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Status</div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {locationData.status === 'active' ? '🟢 Live' : '🔴 Stopped'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Expires</div>
                  <span className="text-lg font-bold text-gray-900">
                    {locationData.expiresAt ? new Date(locationData.expiresAt).toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Last Update</div>
                  <span className="text-lg font-bold text-gray-900">
                    {locationData.lastUpdate ? new Date(locationData.lastUpdate).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-gray-500 mb-2">Share Link</div>
                  <div className="flex space-x-2">
                    <input
                      readOnly
                      value={window.location.href}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={copyLink}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-refresh note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-blue-800 font-medium">
                🔄 Location updates automatically every few seconds. Refresh page if needed.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShareViewer;
