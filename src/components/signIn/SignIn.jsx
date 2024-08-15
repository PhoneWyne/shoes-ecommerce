import { useState, useContext } from "react";
import axios from "axios";

import { API } from "../../constants/endpoints";
import { AuthContext } from "../../contexts/AuthContext";

export function SignIn({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", //default role is customer
  });
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext); // use AuthContext here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API.USERS_URL}`, {
        params: {
          email: formData.email,
          password: formData.password,
        },
      });
      const user = response.data[0];
      if (user) {
        alert(`${user.email} Logged in as ${user.role}`);
        login(user);
        onClose();
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occured while logging in.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${API.USER}`, {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      alert("Signup successful");
      setIsSignup(false); // Switch back to login form after signup
    } catch (error) {
      setError("An error occurred while signing up");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* based on isSignup, onSubmit switches to handleSignup(true) or handleLogin(false) */}
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* assuming isSignup=true, then display form fields for confirmpassword and role */}
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-500"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Not signed up?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-blue-500"
              >
                Sign up
              </button>
            </>
          )}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
