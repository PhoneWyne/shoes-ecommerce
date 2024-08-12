import { Link } from "react-router-dom";


export function Navbar () {
    return (
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">Insert Logo Later</div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/marketplace" className="text-white hover:text-gray-300">Marketplace</Link>
              <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
            </div>
          </div>
        </nav>
      );
}