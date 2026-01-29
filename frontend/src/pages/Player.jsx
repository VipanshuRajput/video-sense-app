import { useParams, Link } from "react-router-dom";

export default function Player() {
  const { id } = useParams();

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="bg-white p-8 rounded-xl shadow w-4/5 mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Video Player</h2>

          <Link
            to="/library"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬅ Back to Library
          </Link>
        </div>

        {/* Video */}
        <div className="rounded overflow-hidden">
          <video
            controls
            className="w-full rounded-lg shadow"
          >
            <source
              src={`http://localhost:5000/api/videos/stream/${id}`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
}
