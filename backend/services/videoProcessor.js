const Video = require("../models/Video");
const processVideo = async(videoId, io)=> {
    let progress = 0;
    const interval = setInterval(async()=> {
        progress +=20;

        if(progress > 100) progress = 100;
        io.emit("processing_update", {videoId: videoId.toString(), progress});

        if(progress === 100){clearInterval(interval);
            const video = await Video.findById(videoId);
            video.status = Math.random() > 0.5? "safe": "flagged";
            video.sensitivityScore = Math.floor(Math.random()* 100);
            await video.save();
            io.emit("processing_done", video);
        }
    }, 2000);
};
module.exports = processVideo;