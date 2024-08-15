import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";

import { browserRoutes } from "../../constants/routes";
import { SignIn } from "../../components/signIn/SignIn";

export function Navbar() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const {user, logout} = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // dont need this after switching to using Auth Context
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
      // navigate to marketplace page, with search terms in URL
      navigate(`${browserRoutes.MARKETPLACE}?search=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAccountDropdownOpen(false);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Insert Logo Later</div>
        <div className="space-x-4">
          <Link
            to={browserRoutes.HOME}
            className="text-white hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to={browserRoutes.MARKETPLACE}
            className="text-white hover:text-gray-300"
          >
            Marketplace
          </Link>
          <Link
            to={browserRoutes.PROFILE}
            className="text-white hover:text-gray-300"
          >
            Profile
          </Link>
        </div>

        {/* search bar */}
        <form onSubmit={handleSearch} className="search-bar flex items-center">
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
            {/* use image of cart here instead (?) */}
            Cart ({totalItems})
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              {/* close button */}
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 "
              >
                &times;
              </button>
              {cart.length === 0 ? (
                <p className="text-center">Cart is Empty</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12"
                      />
                      <div>
                        <p>{item.name}</p>
                        <div className="flex items-center ">
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
                  <Link
                    to={browserRoutes.CHECKOUT}
                    className="block mt-4 text-center bg-blue-500 text-white py-2 rounded"
                    onClick={() => setIsDropdownOpen(false)} // to close modal after checking out
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Login Button */}
        {/* Account/Login Button */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="text-white"
            >
              Account
            </button>
            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <Link
                  to={browserRoutes.PROFILE}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Account Details
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-white"
          >
            Login
          </button>
        )}

        {isLoginModalOpen && (
          <SignIn
            onClose={() => {
              setIsLoginModalOpen(false);
            }}
          />
        )}
      </div>
    </nav>
  );
}
