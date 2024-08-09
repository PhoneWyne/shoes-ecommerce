// ShoeAdd.jsx
import { useState } from "react";
import { Modal } from "../Modal";
import { CONSTANTS } from "../../../constants/constants";

// const IMG_SRC = 'src/assets/shoes/nike-dunk-retro.png'
export function ShoeAdd({ onAddShoe }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShoe = {
      ...formData,
      price: parseFloat(formData.price),
      image: CONSTANTS.IMG_SRC, // Hardcoded image path
    };
    onAddShoe(newShoe);
    handleClose();
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleShow}
      >
        Add New Shoe
      </button>

      {show && (
        <Modal
          formHeading={"Add New Shoe"}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          required={true}
        />
      )}
    </>
  );
}
