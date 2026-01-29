import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">🎬 VideoSense</h1>
      
      <div className="space-x-6">
        <Link to="/upload" className="hover:text-gray-300">Upload</Link>
        <Link to="/library" className="hover:text-gray-300">Library</Link>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
