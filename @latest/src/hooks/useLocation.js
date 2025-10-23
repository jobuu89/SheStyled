import { useState, useEffect, useRef } from 'react';

export function useLocation() {
  const [sharing, setSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const watchIdRef = useRef(null);
  const sharingSessionRef = useRef(null);

  useEffect(() => {
    // Get initial location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
          };
          setCurrentLocation(locationData);

          // Load location history from localStorage
          const savedHistory = JSON.parse(localStorage.getItem('locationHistory') || '[]');
          setLocationHistory(savedHistory);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }

    // Cleanup on unmount
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const shareLocation = async (contacts, duration) => {
    if (!currentLocation) {
      throw new Error('Location not available');
    }

    setSharing(true);
    setError(null);

    try {
      const sessionId = Date.now().toString();
      sharingSessionRef.current = sessionId;

      const locationData = {
        id: sessionId,
        contacts,
        duration,
        location: currentLocation,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + duration * 60 * 1000).toISOString(),
        status: 'active'
      };

      // Store shared location data persistently
      const existingShares = JSON.parse(localStorage.getItem('sharedLocations') || '[]');
      existingShares.push(locationData);
      localStorage.setItem('sharedLocations', JSON.stringify(existingShares));

      // Add to location history
      const newHistoryEntry = {
        ...locationData,
        action: 'shared',
        sessionId
      };
      const updatedHistory = [newHistoryEntry, ...locationHistory.slice(0, 49)]; // Keep last 50 entries
      setLocationHistory(updatedHistory);
      localStorage.setItem('locationHistory', JSON.stringify(updatedHistory));

      // Start location watching for continuous updates
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const updatedLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              speed: position.coords.speed,
              timestamp: position.timestamp
            };
            setCurrentLocation(updatedLocation);

            // Update active sharing session with new location
            if (sharingSessionRef.current === sessionId) {
              const activeShares = JSON.parse(localStorage.getItem('sharedLocations') || '[]');
              const sessionIndex = activeShares.findIndex(share => share.id === sessionId);
              if (sessionIndex !== -1) {
                activeShares[sessionIndex].location = updatedLocation;
                activeShares[sessionIndex].lastUpdate = new Date().toISOString();
                localStorage.setItem('sharedLocations', JSON.stringify(activeShares));
              }
            }
          },
          (err) => {
            console.warn('Location watch error:', err.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
          }
        );
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Location sharing started:', locationData);

      return { success: true, locationData, sessionId };
    } catch (err) {
      setError('Failed to share location');
      setSharing(false);
      throw err;
    }
  };

  const stopSharing = () => {
    setSharing(false);
    setError(null);

    // Stop location watching
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    // Update sharing sessions to inactive
    const activeShares = JSON.parse(localStorage.getItem('sharedLocations') || '[]');
    const updatedShares = activeShares.map(share => ({
      ...share,
      status: 'stopped',
      stoppedAt: new Date().toISOString()
    }));
    localStorage.setItem('sharedLocations', JSON.stringify(updatedShares));

    // Add to history
    const stopEntry = {
      id: Date.now().toString(),
      action: 'stopped',
      timestamp: new Date().toISOString(),
      sessionId: sharingSessionRef.current
    };
    const updatedHistory = [stopEntry, ...locationHistory.slice(0, 49)];
    setLocationHistory(updatedHistory);
    localStorage.setItem('locationHistory', JSON.stringify(updatedHistory));

    sharingSessionRef.current = null;
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setError(null);
        },
        (err) => {
          setError('Failed to update location: ' + err.message);
        }
      );
    }
  };

  const getActiveShares = () => {
    const shares = JSON.parse(localStorage.getItem('sharedLocations') || '[]');
    return shares.filter(share => share.status === 'active');
  };

  const getLocationHistory = () => {
    return locationHistory;
  };

  const clearHistory = () => {
    setLocationHistory([]);
    localStorage.removeItem('locationHistory');
    localStorage.removeItem('sharedLocations');
  };

  return {
    shareLocation,
    stopSharing,
    updateLocation,
    getActiveShares,
    getLocationHistory,
    clearHistory,
    sharing,
    currentLocation,
    error,
    locationHistory
  };
}
