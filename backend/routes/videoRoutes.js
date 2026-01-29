const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/multer");
const {uploadVideo} = require("../controllers/videoController");
const {streamvideo, streamVideo} = require("../controllers/streamController");
const {getMyVideos} = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/stream/:id", streamVideo);
router.get("/mine", authMiddleware, getMyVideos);
module.exports = router;