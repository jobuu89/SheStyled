import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/UseAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useOutfit } from '../contexts/OutfitContext';
import { useOutfitImages } from '../hooks/useOutfitImages';

const Profile = () => {
  const { user } = useAuth();
  const { filters, setFilters } = useOutfit();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: ''
  });
  const [savedOutfits, setSavedOutfits] = useState([
    {
      id: 1,
      name: 'Casual Chic Outfit',
      image: 'https://images.unsplash.com/photo-1618354691551-389fdb0974c8?w=400&h=500&fit=crop',
      category: 'Casual',
      items: ['Jeans', 'Blouse', 'Sneakers'],
      savedDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Evening Glam',
      image: 'https://images.unsplash.com/photo-1574257922357-6167795f1f6a?w=400&h=500&fit=crop',
      category: 'Evening',
      items: ['Dress', 'Heels', 'Clutch'],
      savedDate: '2024-03-12'
    },
    {
      id: 3,
      name: 'Work Ready',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop',
      category: 'Work',
      items: ['Blazer', 'Pants', 'Loafers'],
      savedDate: '2024-03-10'
    }
  ]);
  const { images: outfitImages } = useOutfitImages(); // Fallback hook

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    alert('Profile saved! (Demo)');
    setEditMode(false);
  };

  const toggleSavedOutfit = (outfitId) => {
    setSavedOutfits(prev => prev.map(outfit => 
      outfit.id === outfitId 
        ? { ...outfit, liked: !outfit.liked || false }
        : outfit
    ));
  };

  const handleSafetyToggle = () => {
    const newSafetyMode = !filters.safetyMode;
    setFilters(prev => ({ ...prev, safetyMode: newSafetyMode }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-shestyled-cream to-shestyled-beige">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-shestyled-chocolate mb-4">Please log in</h2>
          <button 
            onClick={() => navigate('/login')}
            className="bg-shestyled-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center mr-6"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-shestyled-chocolate">My Profile</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-shestyled-chocolate">Account Info</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-shestyled-terracotta hover:bg-shestyled-chocolate text-white px-6 py-2 rounded-xl font-semibold"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-shestyled-beige to-white rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white text-5xl">
                  {formData.displayName.charAt(0) || '👤'}
                </div>
              </div>
              <input name="displayName" value={formData.displayName} onChange={handleInputChange} disabled={!editMode} placeholder="Name" className={`w-full p-4 rounded-xl border transition-all ${editMode ? 'border-shestyled-pink bg-white' : 'border-gray-200 bg-gray-50'}`} />
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} disabled className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50" />
              <input name="phone" value={formData.phone} onChange={handleInputChange} disabled={!editMode} placeholder="Phone (optional)" className={`w-full p-4 rounded-xl border transition-all ${editMode ? 'border-shestyled-pink bg-white' : 'border-gray-200 bg-gray-50'}`} />
              {editMode && <button onClick={handleSaveProfile} className="w-full bg-shestyled-pink text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all">Save Changes</button>}
            </div>
          </div>

          {/* Preferences & Outfits */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-4">Safety Mode</h3>
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${filters.safetyMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {filters.safetyMode ? '✓' : '○'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Safety-First Recommendations</h4>
                  <p className="text-sm text-gray-600">Practical outfits for evening/travel</p>
                </div>
                <button onClick={handleSafetyToggle} className={`px-6 py-2 rounded-xl font-semibold transition-all ${filters.safetyMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  {filters.safetyMode ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-shestyled-chocolate mb-6">Saved Outfits ({savedOutfits.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {savedOutfits.map(outfit => (
                  <div key={outfit.id} className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-md hover:shadow-xl border hover:border-pink-200 transition-all">
                    <img src={outfit.image} alt={outfit.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-semibold text-shestyled-chocolate text-sm truncate">{outfit.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{outfit.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{outfit.savedDate}</span>
                      <button onClick={() => toggleSavedOutfit(outfit.id)} className="p-2 rounded-lg hover:bg-pink-100 transition-colors">
                        ❤️
                      </button>
                    </div>
                  </div>
                ))}
                {savedOutfits.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No saved outfits yet. Start saving from recommendations!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
