import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('coggen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('coggen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, quantity) => {
    setCart(prev => {
      const existingInfo = prev.find(
        item => item.product.id === product.id && item.variant.size === variant.size
      );
      if (existingInfo) {
        return prev.map(item => 
          item.product.id === product.id && item.variant.size === variant.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const removeFromCart = (productId, variantSize) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.variant.size === variantSize)
    ));
  };

  const updateQuantity = (productId, variantSize, quantity) => {
    if (quantity <= 0) return removeFromCart(productId, variantSize);
    setCart(prev => prev.map(item => 
      item.product.id === productId && item.variant.size === variantSize
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
