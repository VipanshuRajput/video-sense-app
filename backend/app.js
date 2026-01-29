const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));

const authMiddleware = require("./middleware/authMiddleware");
app.get("/api/test", authMiddleware, (req, res)=> {
    res.json({message:"JWT is Working!", user: req.user});
});

app.get("/",(req,res)=> {
    res.send("API Running,,");
});

const http = require("http");
const{Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {cors:{origin: "*"}});
app.set("io", io);
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

