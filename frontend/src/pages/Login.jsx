import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("/auth/login", { email, password });
    login(res.data.token);
    navigate("/upload");
  };

  return (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-10 rounded-xl shadow-xl w-96">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

      <input
        className="w-full border p-3 mb-4 rounded"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-3 mb-6 rounded"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  </div>
);

}
