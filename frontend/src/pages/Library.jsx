import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Library() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    axios.get("/videos/mine", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setVideos(res.data))
    .catch(err => console.log(err));

  }, [token]);

  if (!token) return <p>Please login again</p>;

  const filteredVideos = videos.filter(v =>
    filter === "all" ? true : v.status === filter
  );

  return (
  <div className="bg-gray-100 min-h-screen p-10">
    <div className="mb-6">
      <h2 className="text-3xl font-bold">My Videos</h2>
    </div>

    {/* Filter */}
    <div className="mb-6">
      <label className="mr-3 font-semibold">Filter:</label>
      <select
        className="border p-2 rounded"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="safe">Safe</option>
        <option value="flagged">Flagged</option>
      </select>
    </div>

    {/* Video Cards */}
    {filteredVideos.map((v) => (
      <div
        key={v._id}
        className="bg-white p-5 rounded-lg shadow mb-4 flex justify-between items-center"
      >
        <div>
          <p className="font-bold text-lg">{v.title}</p>
          <p>
            Status:{" "}
            <span
              className={`font-semibold ${
                v.status === "safe"
                  ? "text-green-600"
                  : v.status === "flagged"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {v.status}
            </span>
          </p>
        </div>

        <Link
          to={`/player/${v._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ▶ Play
        </Link>
      </div>
    ))}
  </div>
);
}
