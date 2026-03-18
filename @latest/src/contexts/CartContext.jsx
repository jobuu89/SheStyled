import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('shestyled-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shestyled-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = (paymentMethod) => {
    if (cart.length === 0) return false;

    const order = {
      id: 'ORD' + Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      paymentMethod
    };

    // Save to orders (could be localStorage or API)
    const orders = JSON.parse(localStorage.getItem('shestyled-orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('shestyled-orders', JSON.stringify(orders));

    clearCart();
    return order;
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    cartTotalItems,
    cartTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

