import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Sample editable products - ADD YOUR OWN HERE
  const defaultProducts = [
    {
      id: 1,
      name: 'Casual Blue Cotton Dress',
      category: 'Casual',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1618354691551-389fdb0974c8?w=400&h=500&fit=crop',
      description: 'Comfortable cotton dress perfect for day outings',
      stock: 12
    },
    {
      id: 2,
      name: 'Black Evening Gown',
      category: 'Evening',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1574257922357-6167795f1f6a?w=400&h=500&fit=crop',
      description: 'Elegant gown for special occasions',
      stock: 8
    },
    {
      id: 3,
      name: 'Work Tailored Blazer',
      category: 'Work',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop',
      description: 'Professional blazer for office wear',
      stock: 15
    },
    {
      id: 4,
      name: 'Athleisure Leggings Set',
      category: 'Athleisure',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1616168166584-fd35c9f5eecb?w=400&h=500&fit=crop',
      description: 'High-waist leggings and sports bra set',
      stock: 20
    },
    {
      id: 5,
      name: 'Boho Maxi Skirt',
      category: 'Boho',
      price: 1600,
      image: 'https://images.unsplash.com/photo-1529139578438-652882d0af9a?w=400&h=500&fit=crop',
      description: 'Flowy maxi skirt with ethnic print',
      stock: 10
    },
    {
      id: 6,
      name: 'Classic White Sneakers',
      category: 'Classic',
      price: 850,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      description: 'Timeless sneakers for everyday wear',
      stock: 25
    }
  ];

  useEffect(() => {
    // Load from localStorage or use default
    const savedProducts = localStorage.getItem('shestyled-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('shestyled-products', JSON.stringify(defaultProducts));
    }
    setLoading(false);
  }, []);

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() };
    const updated = [...products, productWithId];
    setProducts(updated);
    localStorage.setItem('shestyled-products', JSON.stringify(updated));
  };

  const updateProduct = (updatedProduct) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
    localStorage.setItem('shestyled-products', JSON.stringify(updated));
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('shestyled-products', JSON.stringify(updated));
  };

  const addToCart = (productId, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const product = products.find(p => p.id === productId);
      return [...prev, { ...product, quantity }];
    });
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    addToCart,
    cartTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

