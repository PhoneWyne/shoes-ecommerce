import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { ShoeSection } from "../../components/shoeSection/ShoeSection";
import { CartContext } from "../../contexts/CartContext";

import { API } from "../../constants/endpoints";

export function MarketPlace() {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const [shoes, setShoes] = useState([]);
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const fetchShoes = async () => {
    try {
      const response = await axios.get(API.SHOES_URL);
      setShoes(response.data);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  // Get the search query from the URL
  const searchQuery = searchParams.get("search") || "";

  // filter a shoe, then pass it sortedShoes, to see if any sort was applied,
  // Filter shoes based on the name present in search query
  const filteredShoes = shoes.filter((shoe) =>
    shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort shoes based on sortOrder state
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortOrder === "price-high-low") {
      return b.price - a.price;
    } else if (sortOrder === "price-low-high") {
      return a.price - b.price;
    } else {
      return 0; // No sorting
    }
  });

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>

      {/* Sort Dropdown */}
      <div className="relative inline-block">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded inline-flex items-center"
          onClick={toggleDropdown} // Toggle the dropdown on click
        >
          Sort By
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && ( 
          <ul className="absolute text-gray-700 pt-1 bg-white shadow-lg rounded-lg mt-1">
            <li
              onClick={() => {
                setSortOrder("price-low-high");
                setIsDropdownOpen(false); // Close the dropdown after selection
              }}
              className="block px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              Price: Low-High
            </li>
            <li
              onClick={() => {
                setSortOrder("price-high-low");
                setIsDropdownOpen(false); // Close the dropdown after selection
              }}
              className="block px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              Price: High-Low
            </li>
          </ul>
        )}
      </div>

      <ShoeSection
        shoes={sortedShoes} // Pass sorted shoes to ShoeSection
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        fetchShoes={fetchShoes}
      />
    </div>
  );
}