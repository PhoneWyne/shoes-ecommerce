
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...shoe, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (shoeId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoeId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== shoeId);
      } else {
        return prevCart.map((item) =>
          item.id === shoeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
