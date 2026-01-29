import { useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";
import {Link} from "react-router-dom";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const { token, role } = useContext(AuthContext);

  // Guard
  if (!token) return <h3>Please login again</h3>;
  if (role === "viewer") {
    return <h3>You do not have permission to upload videos</h3>;
  }

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("processing_update", (data) => {
      if (data.videoId === currentVideoId) {
        setProgress(data.progress);
      }
    });

    socket.on("processing_done", (video) => {
      if (video._id === currentVideoId) {
        setStatus(`Done! Status: ${video.status}`);
        setProgress(100);
      }
    });

    return () => socket.disconnect();
  }, [currentVideoId]);

  const handleUpload = async () => {
    if (!title || !file) return alert("Title and file required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    setProgress(0);
    setStatus("Uploading & Processing...");

    const res = await axios.post("/videos/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCurrentVideoId(res.data.video._id);
  };

  return (
  <div className="bg-gray-100 min-h-screen p-10">
    <div className="bg-white p-8 rounded-xl shadow w-2/3 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload Video</h2>

      <input
        className="border p-3 rounded w-full mb-4"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        className="border p-3 rounded w-full mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={!file || !title}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
      >
        Upload
      </button>

      <div className="mt-6">
        <Link to="/library" className="inline-block mt-6 bg-blue-600 text-white ps-5 py-2 rounded hover:bg-blue-700 transition">
        📚 Go to Library 
        </Link>
      </div>

      <h3 className="mt-6 font-semibold">{status}</h3>

      <div className="w-full bg-gray-200 h-4 rounded mt-4">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2">{progress}%</p>
    </div>
  </div>
);
}
