import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../constants/endpoints";
// create context obj, used to share state and functions b/w components
export const CartContext = createContext();

// wrap around other components, those components need to access cart state
export function CartProvider({ children }) {
  // checks if localStorage has a saved "cart"
  // if there is, load that using JSON.parse,
  // if there isn't, create empty array []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  // cart is part of dependancy array, useEffect triggers whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchShoeById = async (shoeId) => {
    try {
      const response = await axios.get(`${API.SHOES_URL}/${shoeId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shoe details");
    }
  };
  const addToCart = async (shoe) => {
    try {
      // Fetch the shoe details, including the stock quantity
      const shoeDetails = await fetchShoeById(shoe.id);

      if (shoeDetails) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === shoe.id);
          const quantityToAdd = existingItem ? existingItem.quantity + 1 : 1;

          // If the quantity to add exceeds available stock, set an error
          if (quantityToAdd > shoeDetails.quantity) {
            console.log(`You don't have that many shoes in stock, try less.`);
            return prevCart;
          }

  
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
      } else {
        console.log("Failed to add shoe to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding shoe to cart:", error);
      console.log("An unexpected error occurred. Please try again.");
    }
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
          item.id === shoeId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // If the quantity is 1, remove the item from the cart
        return prevCart.filter((item) => item.id !== shoeId);
      }
    });
  };

  // Clear the cart by setting it to an empty array, called upon checkout
  const clearCart = () => {
    setCart([]); 
  };
  return (
    // children denotes any components that'd access cart
    // value determines what state (cart) and functions (addToCart, removeFromCart) are shared
    // .Provider provides context's values to other components
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
