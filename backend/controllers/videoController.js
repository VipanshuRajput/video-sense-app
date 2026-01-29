const Video = require("../models/Video");
const processVideo = require("../services/videoProcessor");

exports.uploadVideo = async(req, res)=>{
    try{
        const{title}= req.body;
        const video = await Video.create({
            title,filename: req.file.filename, owner: req.user.id, status: "processing"
        });
        const io = req.app.get("io");
        processVideo(video._id, io);
        res.json({message:"video uploaded and processing started", video});
    } catch(err) {res.status(500).json(err.message);}
};
exports.getMyVideos = async(req, res) =>{
    const videos = await Video.find({owner:req.user.id});
    res.json(videos);
}