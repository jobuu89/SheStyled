import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext.jsx';
import { outfitTypes } from '../constants/outfitTypes.js';
import { OCCASIONS, AESTHETICS, MOODS, COLORS } from '../constants/outfitTypes.js';

const OutfitRecommendation = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [formData, setFormData] = useState({
    bodyType: '',
    mood: '',
    occasion: '',
    colors: [],
    budget: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const generateOutfit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // AI-like recommendation logic (content-based filtering)
      const filteredProducts = products.filter(product => {
        const categoryMatch = formData.mood && product.category.toLowerCase().includes(formData.mood.toLowerCase());
        const priceMatch = parseInt(formData.budget) > 0 ? product.price <= parseInt(formData.budget) : true;
        return categoryMatch || priceMatch;
      });

      // Create cohesive ensemble
      const tops = filteredProducts.filter(p => ['top', 'blazer', 'shirt'].some(word => p.name.toLowerCase().includes(word)));
      const bottoms = filteredProducts.filter(p => ['skirt', 'pants', 'shorts', 'dress'].some(word => p.name.toLowerCase().includes(word)));
      const shoes = filteredProducts.filter(p => p.name.toLowerCase().includes('shoe') || p.name.toLowerCase().includes('sneaker'));
      const accessories = filteredProducts.filter(p => ['bag', 'belt', 'jewelry'].some(word => p.name.toLowerCase().includes(word)));

      const outfit = {
        top: tops[0] || filteredProducts[Math.floor(Math.random() * filteredProducts.length)],
        bottom: bottoms[0] || filteredProducts[Math.floor(Math.random() * filteredProducts.length)],
        shoes: shoes[0] || filteredProducts[Math.floor(Math.random() * filteredProducts.length)],
        accessories: accessories[0] || filteredProducts[Math.floor(Math.random() * filteredProducts.length)]
      };

      setRecommendation(outfit);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-12 bg-white shadow-lg hover:shadow-xl text-gray-700 px-6 py-3 rounded-2xl font-semibold flex items-center mx-auto"
        >
          ← Back
        </button>

        {recommendation ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              Your Perfect Outfit! ✨
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {Object.entries(recommendation).map(([type, item]) => (
                <div key={type} className="group">
                  <div className="w-48 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1 capitalize">{type}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="font-bold text-shestyled-pink text-xl">KSh {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="text-left max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-shestyled-chocolate mb-4">Why this outfit works for you:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Perfect for {formData.occasion || 'your occasion'}</li>
                <li>• Matches your {formData.mood || 'mood'}</li>
                <li>• Suited for {formData.bodyType || 'your body type'}</li>
                <li>• Colors in your palette</li>
                <li>• Total: KSh {(Object.values(recommendation).reduce((sum, item) => sum + item.price, 0)).toLocaleString()}</li>
              </ul>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="flex-1 bg-gradient-to-r from-shestyled-pink to-shestyled-terracotta text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                🛒 Shop This Outfit
              </button>
              <button
                onClick={() => setRecommendation(null)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-2xl font-bold hover:bg-gray-50 shadow-lg transition-all"
              >
                🔄 New Recommendation
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
              AI Outfit Generator ✨
            </h2>
            <p className="text-xl text-gray-700 mb-12 text-center max-w-lg mx-auto">
              Tell us about yourself and get a complete outfit recommendation!
            </p>
            <form onSubmit={generateOutfit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Body Type</label>
                <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 shadow-lg text-lg" required>
                  <option value="">Select your body type...</option>
                  {outfitTypes.bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Mood/Aesthetic</label>
                <select name="mood" value={formData.mood} onChange={handleChange} className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 shadow-lg text-lg" required>
                  <option value="">Choose your vibe...</option>
                  {outfitTypes.moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Occasion</label>
                <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 shadow-lg text-lg" required>
                  <option value="">What are you dressing for...</option>
                  {outfitTypes.occasions.map(occasion => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Budget (KSh)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="Max budget" className="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 shadow-lg text-lg" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-6 px-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>AI Magic Loading...</span>
                  </>
                ) : (
                  <>
                    <span>✨ Generate My Outfit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitRecommendation;

