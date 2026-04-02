import React, { useState, useRef, useEffect, useCallback } from 'react';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas && video.readyState === 4) {
      canvas.width = 640;
      canvas.height = 480;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => onCapture(URL.createObjectURL(blob)), 'image/jpeg', 0.8);
    }
  }, [onCapture]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Camera Error</h2>
          <p>{error}</p>
          <button onClick={onClose} className="mt-6 bg-gray-200 px-6 py-3 rounded-xl font-semibold">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold flex items-center justify-between">
          <span>📸 Camera</span>
          <button onClick={onClose} className="text-2xl hover:scale-110">✕</button>
        </div>
        <div className="p-6 flex flex-col items-center space-y-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full max-w-sm h-64 bg-black rounded-2xl object-cover shadow-lg transform scale-x-[-1]"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="space-y-3 w-full">
            <button
              onClick={handleCapture}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              📷 Capture Photo
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;

