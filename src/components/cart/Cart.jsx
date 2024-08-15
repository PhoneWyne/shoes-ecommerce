import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { SignIn } from "../signIn/SignIn";
export function Cart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control login modal visibility
  const [orderPlaced, setOrderPlaced] = useState(false); // State to show order confirmation

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handlePlaceOrder = () => {
    if (!user) {
      // If no user is logged in, show the login modal
      setIsLoginModalOpen(true);
    } else {
      // If user is logged in, place the order
      setOrderPlaced(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 mr-4"
                />
                {/* prevent text from overflowing and breaking column widths */}
                <p className="text-lg w-40 sm:w-60 break-words whitespace-normal">
                  {item.name}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 text-gray-700"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2 text-gray-700"
                >
                  +
                </button>
              </div>
              <p>${item.price}</p>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Total: ${totalPrice}
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
          {orderPlaced && <p className="text-green-500 mt-4">Order placed successfully!</p>}
        </div>
      )}
      {isLoginModalOpen && <SignIn onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}
