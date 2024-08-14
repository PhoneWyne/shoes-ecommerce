import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Navbar() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();
    setSearchParams({ search: searchTerm });
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Insert Logo Later</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/marketplace" className="text-white hover:text-gray-300">
            Marketplace
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About Us
          </Link>
        </div>

        {/* search bar */}
        <form
          onSubmit={handleSearch}
          className="search-bar flex items-center"
        >
          <input
            type="text"
            name="search"
            placeholder="Search for shoes..."
            className="px-2 py-1 rounded-l"
          />
          <button type="submit" className="bg-blue-500 px-4 py-1 rounded-r">
            Search
          </button>
        </form>
        {/* cart preview icon */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white"
          >
            Cart ({totalItems})
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              {cart.length === 0 ? (
                <p className="text-center">Cart is Empty</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12"
                      />
                      <div>
                        <p>{item.name}</p>
                        <div className="flex items-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-2"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p>${item.price * item.quantity}</p>
                    </div>
                  ))}
                  <p className="text-right font-bold">Total: ${totalPrice}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
