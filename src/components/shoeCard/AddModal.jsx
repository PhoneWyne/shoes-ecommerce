import { useState } from "react";
import axios from "axios";
import { API } from "../../constants/endpoints";

export function AddModal({ isOpen, onClose, fetchShoes }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert price and quantity to numbers
    const price = parseFloat(formData.price);
    const quantity = parseInt(formData.quantity, 10);

    // Validate inputs
    if (isNaN(price) || isNaN(quantity)) {
      alert("Please enter valid numbers for price and quantity.");
      return;
    }

 
    axios.post(API.SHOES_URL, { ...formData, price, quantity })
      .then(() => {
        fetchShoes(); // Refresh the list of shoes
        onClose(); // Close the modal
        alert("New shoe added successfully.");
      })
      .catch((error) => {
        console.error("There was an error adding the shoe!", error);
        alert("There was an error adding the shoe.");
      });
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20 ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Shoe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
            {/* for image, i am just entering the relative path by manually typing it in, which is stored in db.json */}
            {/* for a new shoe like air jordan, that would be "src/assets/shoes/nike-air-jordan-retro-high.png"*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Shoe
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
