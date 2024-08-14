
import { createContext, useState, useEffect } from 'react';

// create context obj, used to share state and functions b/w components
export const CartContext = createContext();

// wrap around other components, those components need to access cart state
export function CartProvider({ children }) {
  // checks if localStorage has a saved "cart"
  // if there is, load that using JSON.parse, 
  // if there isn't, create empty array []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // cart is part of dependancy array, useEffect triggers whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // adds shoe to cart
  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      // if shoe already in cart, increase amount
      // if shoe not in cart, add to cart with initial quantity of 1
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

  // remove shoe from cart
  const removeFromCart = (shoeId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoeId);
      
      // If the item is not in the cart, return the previous cart state unchanged
      if (!existingItem) {
        return prevCart;
      }
  
      // If the quantity is greater than 1, decrement the quantity
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === shoeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // If the quantity is 1, remove the item from the cart
        return prevCart.filter((item) => item.id !== shoeId);
      }
    });
  };
  return (
    // children denotes any components that'd access cart
    // value determines what state (cart) and functions (addToCart, removeFromCart) are shared
    // .Provider provides context's values to other components
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
