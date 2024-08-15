import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../constants/endpoints";

import editIcon from "/src/assets/edit.png";

export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  // setting to either email, or empty if no one logged in
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedPassword, setEditedPassword] = useState(""); // Initialize as empty string
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleEmailChange = async () => {
    try {
      // Check if the email is empty or only contains whitespace
      if (!editedEmail.trim()) {
        alert("Email cannot be empty.");
        return;
      }
      const updatedUser = { ...user, email: editedEmail }; // Use editedEmail for updating
      await axios.put(`${API.USERS_URL}/${user.id}`, updatedUser);
      setUser(updatedUser);
      setIsEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!editedPassword.trim()) {
        alert("Password cannot be empty.");
        return;
      }
      const updatedUser = { ...user, password: editedPassword }; // Update the password while keeping other fields intact
      await axios.put(`${API.USERS_URL}/${user.id}`, updatedUser);
      setUser(updatedUser);
      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        {/* check to see if user signed in */}
        {user ? (
          <>
            <div className="mb-4 flex items-center">
              <p className="text-lg font-semibold">Email:</p>
              <span className="ml-2">{user.email}</span>{" "}
              {/* Display the updated user.email */}
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="ml-2"
              >
                <img src={editIcon} alt="Edit" className="w-6 h-6" />
              </button>
            </div>

            {isEditingEmail && (
              <div className="mb-4 flex items-center">
                <input
                  type="email"
                  value={editedEmail} // Use editedEmail for the input field
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="p-2 border rounded"
                />
                <button
                  onClick={handleEmailChange}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            )}

            <div className="mb-4 flex items-center">
              <p className="text-lg font-semibold">Password:</p>
              <span className="ml-2">{user.password}</span>
              <button
                onClick={() => setIsEditingPassword(!isEditingPassword)}
                className="ml-2"
              >
                <img src={editIcon} alt="Edit" className="w-6 h-6" />
              </button>
            </div>

            {isEditingPassword && (
              <div className="mb-4 flex items-center">
                <input
                  type="password"
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                  className="p-2 border rounded"
                  placeholder="New password"
                />
                <button
                  onClick={handlePasswordChange}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            )}

            <div className="mb-4 flex items-center">
              <p className="text-lg font-semibold">Role:</p>
              <span className="ml-2">{user.role}</span>
            </div>
          </>
        ) : ( 
                    
          <p className="text-center text-lg">No user is currently signed in.</p>
        )}
      </div>
    </div>
  );
}
