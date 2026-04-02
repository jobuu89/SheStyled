import { useState, useEffect, useRef, useCallback } from 'react';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Components/Firebase.js';

export function useLocation() {
  const [sharing, setSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  const watchIdRef = useRef(null);
  const sharingSessionRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    // Get initial location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude || null,
            altitudeAccuracy: position.coords.altitudeAccuracy || null,
            heading: position.coords.heading || null,
            speed: position.coords.speed || null,
            timestamp: position.timestamp
          };
          setCurrentLocation(locationData);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }

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
    if (!contacts || contacts.length === 0) {
      throw new Error('No trusted contacts available. Please add contacts in your profile first.');
    }

    setSharing(true);
    setError(null);

    try {
      const sessionId = Date.now().toString();
      sessionIdRef.current = sessionId;
      sharingSessionRef.current = sessionId;

      const shareUrl = `${window.location.origin}/share/${sessionId}`;
      setShareUrl(shareUrl);

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      const locationData = {
        sessionId,
        contacts: contacts || [],
        duration,
        location: currentLocation,
        lastUpdate: serverTimestamp(),
        expiresAt: new Date(Date.now() + duration * 60 * 1000).toISOString(),
        status: 'active',
        updatesCount: 0
      };

      // Save to Firestore
      await setDoc(doc(db, 'sharedLocations', sessionId), locationData);

      console.log('✅ Location sharing started - URL copied:', shareUrl);

      // Start continuous location watching and Firestore updates
      startLocationWatch(sessionId);

      return { success: true, locationData, sessionId, shareUrl };
    } catch (err) {
      setError('Failed to share location: ' + err.message);
      setSharing(false);
      throw err;
    }
  };

  const startLocationWatch = useCallback((sessionId) => {
    if (watchIdRef.current || !navigator.geolocation || !sessionId) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const updatedLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude || null,
          altitudeAccuracy: position.coords.altitudeAccuracy || null,
          heading: position.coords.heading || null,
          speed: position.coords.speed || null,
          timestamp: position.timestamp
        };
        setCurrentLocation(updatedLocation);

        if (sharingSessionRef.current === sessionId) {
          // Update Firestore
          try {
            await updateDoc(doc(db, 'sharedLocations', sessionId), {
              location: updatedLocation,
              lastUpdate: serverTimestamp(),
              updatesCount: (locationData.updatesCount || 0) + 1
            });
          } catch (err) {
            console.warn('Failed to update location in Firestore:', err);
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
  }, []);

  const stopSharing = async () => {
    setSharing(false);
    setError(null);

    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (sessionIdRef.current) {
      try {
        await updateDoc(doc(db, 'sharedLocations', sessionIdRef.current), {
          status: 'stopped',
          stoppedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Failed to stop sharing in Firestore:', err);
      }
    }

    sharingSessionRef.current = null;
    sessionIdRef.current = null;
    setShareUrl('');
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setCurrentLocation(loc);
          setError(null);
        },
        (err) => setError('Failed to update: ' + err.message)
      );
    }
  };

  return {
    shareLocation,
    stopSharing,
    updateLocation,
    sharing,
    currentLocation,
    error,
    shareUrl,
    locationHistory // Keep for compatibility
  };
}
