import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Cart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        </div>
      )}
    </div>
  );
}
