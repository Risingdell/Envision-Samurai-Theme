import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("envision_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("envision_cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("envision_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (event) => {
    // Check if event already exists in cart
    const exists = cart.find((item) => item.id === event.id);
    if (exists) {
      return false; // Event already in cart
    }

    setCart((prev) => [...prev, event]);
    return true; // Successfully added
  };

  const removeFromCart = (eventId) => {
    setCart((prev) => prev.filter((item) => item.id !== eventId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("envision_cart");
  };

  const isInCart = (eventId) => {
    return cart.some((item) => item.id === eventId);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.fee) || 0), 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
