import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API } from '../../constants/endpoints';

export function Modal({ isOpen, onClose, shoe, fetchShoes, isEditing, setIsEditing }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

  useEffect(() => {
    if (isEditing && shoe) {
      setFormData({
        name: shoe.name || '',
        price: shoe.price || '',
        quantity: shoe.quantity || '',
      });
    }
  }, [isEditing, shoe]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role !== 'admin') {
      return; // Only admin can edit or add
    }
  
    try {
      const response = isEditing
        ? await axios.patch(`${API.SHOES_URL}/${shoe.id}`, formData)
        : await axios.post(API.SHOES_URL, formData);

      if (response.status === 200 || response.status === 201) {
        fetchShoes(); // Refetch shoes to update UI
        onClose();
      }
    } catch (error) {
      console.error('Error updating shoe:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Shoe' : 'Add Shoe'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
