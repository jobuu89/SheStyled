import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/UseAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useOutfit } from '../contexts/OutfitContext';
import { useOutfitImages } from '../hooks/useOutfitImages';
import { useTrustedContacts } from '../contexts/TrustedContactsContext.jsx';
import { TRUSTED_CONTACTS_LIMIT } from '../constants/safety';
import Button from '../Components/Button.jsx';

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
    }
  ]);
  const { images: outfitImages } = useOutfitImages();
  const { contacts: trustedContacts, addContact, removeContact } = useTrustedContacts();

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
    alert('Profile saved!');
    setEditMode(false);
  };

  const handleSafetyToggle = () => {
    const newSafetyMode = !filters.safetyMode;
    setFilters(prev => ({ ...prev, safetyMode: newSafetyMode }));
  };

  const handleAddContact = () => {
    const input = document.getElementById('newContact');
    const value = input?.value;
    if (value) {
      if (addContact(value)) {
        input.value = '';
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Log in required</h2>
          <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <Button
            onClick={() => navigate(-1)}
            className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all mr-6 border"
          >
            ← Back
          </Button>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            My Profile
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Account Info */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Account Details</h2>
              <Button
                onClick={() => setEditMode(!editMode)}
                className={`px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all ${editMode ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} text-white`}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            <div className="space-y-6">
              <div className="text-center mb-10">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white text-4xl font-bold">
                  {formData.displayName.charAt(0) || '👤'}
                </div>
                <p className="text-sm text-gray-500 mt-2">{formData.email}</p>
              </div>
              <input 
                name="displayName" 
                value={formData.displayName} 
                onChange={handleInputChange} 
                disabled={!editMode} 
                placeholder="Name" 
                className={`w-full p-5 rounded-2xl border-2 transition-all text-lg font-semibold ${editMode ? 'border-purple-400 bg-white ring-2 ring-purple-200 shadow-lg' : 'border-gray-200 bg-gray-50'}`} 
              />
              <input 
                name="email" 
                type="email" 
                value={formData.email} 
                disabled 
                className="w-full p-5 rounded-2xl border border-gray-200 bg-gray-50 text-lg" 
              />
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                disabled={!editMode} 
                placeholder="Phone (optional)" 
                className={`w-full p-5 rounded-2xl border-2 transition-all text-lg ${editMode ? 'border-purple-400 bg-white ring-2 ring-purple-200 shadow-lg' : 'border-gray-200 bg-gray-50'}`} 
              />
              {editMode && (
                <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all">
                  💾 Save Changes
                </Button>
              )}
            </div>
          </div>

          {/* Trusted Emergency Contacts */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <span className="text-4xl mr-4">🆘</span>
                Emergency Contacts
              </h2>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                {trustedContacts.length}/{TRUSTED_CONTACTS_LIMIT}
              </div>
            </div>

            {/* Add Form - Always Visible */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 shadow-inner mb-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                📱 Add New Contact
              </h3>
              <div className="flex space-x-3">
                <input
                  id="newContact"
                  type="text"
                  placeholder="Email or phone (john@example.com or +1-555-1234)"
                  className="flex-1 px-6 py-4 text-lg border-2 border-blue-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-white shadow-lg transition-all placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddContact()}
                />
                <Button
                  onClick={handleAddContact}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all whitespace-nowrap flex items-center"
                >
                  ➕ Add Contact
                </Button>
              </div>
            </div>

            {/* Contacts List */}
            <div className="grid gap-4">
              {trustedContacts.length === 0 ? (
                <div className="col-span-full text-center py-16 border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-b from-gray-50 to-white">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    👥
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No Emergency Contacts</h3>
                  <p className="text-lg text-gray-600 max-w-md mx-auto">Add your first trusted contact above to enable location sharing</p>
                </div>
              ) : trustedContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 rounded-2xl border-2 border-emerald-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-2xl flex-shrink-0">
                      {contact.value.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xl text-gray-900 truncate">{contact.label}</p>
                      <p className="text-lg text-gray-700 truncate max-w-md">{contact.value}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeContact(contact.id)}
                    className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group-hover:scale-105"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Mode Toggle */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🛡️ Safety Mode
            </h3>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Safety-First Outfits</h4>
                  <p className="text-gray-600">Practical recommendations for safety</p>
                </div>
                <button 
                  onClick={handleSafetyToggle}
                  className={`relative p-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${filters.safetyMode ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-400 hover:shadow-gray-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-400 hover:shadow-blue-500 hover:-translate-y-1'} transform hover:scale-105`}
                >
                  {filters.safetyMode ? 'OFF' : 'ON'}
                </button>
              </div>
            </div>
          </div>

          {/* Saved Outfits */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">⭐ Saved Outfits ({savedOutfits.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden">
                  <div className="relative">
                    <img src={outfit.image} alt={outfit.name} className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg group-hover:bg-white">
                      ❤️
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mt-4 truncate">{outfit.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{outfit.category}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {outfit.items.map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{outfit.savedDate}</p>
                </div>
              ))}
              {savedOutfits.length === 0 && (
                <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-300 rounded-2xl bg-gradient-to-b from-gray-50 to-white">
                  <div className="text-5xl mb-4">⭐</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">No saved outfits</h3>
                  <p className="text-gray-500">Save outfits from recommendations to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

