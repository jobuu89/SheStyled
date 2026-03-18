import { useState, useEffect, useCallback } from 'react';

const UNSPLASH_ACCESS_KEY = 'DEMO_1234567890abcdef'; // Replace with real key for production
const BASE_URL = `https://api.unsplash.com/search/photos`;

const useOutfitImages = (category = '') => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryQueries = {
    'Casual': 'women casual outfit street style',
    'Work': 'women work office attire professional',
    'Evening': 'women evening dress party outfit',
    'Fitness': 'women fitness athleisure gym wear',
    'Boho': 'women boho chic outfit festival',
    'Athleisure': 'women athleisure sportswear comfortable',
    'Classic': 'women classic timeless fashion chic',
    'default': 'women fashion outfit'
  };

  const fetchImages = useCallback(async (cat = category) => {
    if (!cat) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const query = categoryQueries[cat] || categoryQueries.default;
      const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=20&orientation=portrait&client_id=${UNSPLASH_ACCESS_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const imageUrls = data.results.map(result => ({
          id: result.id,
          url: result.urls.regular,
          small: result.urls.thumb,
          alt: result.alt_description || `Outfit ${cat}`,
          photographer: result.user.name
        }));
        setImages(imageUrls.slice(0, 10)); // Limit to 10
      }
    } catch (err) {
      console.error('Unsplash API error:', err);
      setError('Failed to load images. Using fallback.');
      // Fallback to static images
      setImages([
        { id: 'fallback1', url: 'https://images.unsplash.com/photo-1574257922357-6167795f1f6a?w=400', small: 'https://images.unsplash.com/photo-1574257922357-6167795f1f6a?w=200', alt: 'Fallback outfit' }
      ]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetchImages(category);
    }
  }, [category, fetchImages]);

  return { images, loading, error, refetch: () => fetchImages(category) };
};

export { useOutfitImages };
