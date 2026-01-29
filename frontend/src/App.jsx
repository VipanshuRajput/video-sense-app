import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";

function App(){
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;