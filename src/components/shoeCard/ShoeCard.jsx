import { useContext, useState } from "react";
import axios from "axios";

import plusIcon from "/src/assets/plus.png";
import minusIcon from "/src/assets/minus.png";
import editIcon from "/src/assets/edit.png";
import deleteIcon from "/src/assets/delete.png";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../constants/endpoints";

import { Modal } from "./Modal";
import { DeleteModal } from "./DeleteModal";

export function ShoeCard({ shoe, addToCart, removeFromCart, fetchShoes }) {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`${API.SHOES_URL}/${shoe.id}`)
      .then(() => {
        fetchShoes(); // Refresh the list of shoes
        setIsDeleteModalOpen(false);
        alert("Shoe has been deleted.");
      })
      .catch((error) => {
        console.error("There was an error deleting the shoe!", error);
        alert("There was an error deleting the shoe."); // Display error message
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(shoe);
    } catch (err) {
      console.log(err.message); // Set the error message
    }
  };

  return (
    <div className=" card border border-secondary-border rounded-xl border-solid p-2">
      <div className="relative">
        <img className="w-full max-h-[350px]" src={shoe.image} alt="shoe" />
        {/* Out of Stock Overlay */}
        {parseInt(shoe.quantity) === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl text-white text-xl font-bold z-10 pointer-events-none">
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      <div className="py-2 mt-3 flex justify-between rounded-xl px-3 items-center">
        <div className="flex flex-col gap-1">
          
            <p>{ shoe.name}</p>
          
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm xl:text-base flex gap-1 items-center">
            <div className="flex gap-1">
              <span>$</span>
              <p>{shoe.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button
          onClick={() => removeFromCart(shoe.id)}
          className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-500 transition-colors"
        >
          <img src={minusIcon} alt="minus" className="w-4 h-4" />
        </button>

        {user?.role === "admin" && (
          <img
            src={editIcon}
            alt="edit"
            className="w-6 h-6 cursor-pointer ml-2"
            onClick={handleEditClick}
          />
        )}
        {user?.role === "admin" && (
          <img
            src={deleteIcon}
            alt="delete"
            className="w-6 h-6 cursor-pointer ml-2"
            onClick={handleDeleteClick}
          />
        )}
        <button
          onClick={handleAddToCart}
          className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-500 transition-colors"
        >
          <img src={plusIcon} alt="plus" className="w-4 h-4" />
        </button>
      </div>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        shoe={shoe}
        fetchShoes={fetchShoes}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        className="z-20"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        className="z-20"
      />
    </div>
  );
}
