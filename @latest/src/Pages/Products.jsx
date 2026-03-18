import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext.jsx';
import { useOutfitImages } from '../hooks/useOutfitImages';

const Products = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center mr-6"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-shestyled-chocolate">Shop Products</h1>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="w-24 h-24 bg-shestyled-beige rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-bold text-shestyled-chocolate mb-4">No products yet</h3>
            <p className="text-gray-600 mb-8">
              Add products in Profile → Edit section or ProductsContext.jsx
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1574257922357-6167795f1f6a?w=400'; // Fallback
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-shestyled-chocolate text-lg mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 capitalize">{product.category}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-shestyled-pink">KSh {product.price.toLocaleString()}</span>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                      {product.stock} in stock
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2">{product.description}</p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-gradient-to-r from-shestyled-pink to-shestyled-terracotta text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:from-pink-600 hover:to-terracotta-600 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-shestyled-chocolate mb-4">Add Your Own Products</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Edit <code className="bg-shestyled-beige px-3 py-1 rounded-lg font-mono">ProductsContext.jsx</code> → defaultProducts array
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;

