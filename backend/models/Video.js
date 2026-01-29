const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
    title:String, filename: String, owner:{type:mongoose.Schema.Types.ObjectId, ref: "user"},
    status:{type: String, enum:["uploading", "processing", "safe", "flagged"], default: "uploading"},
    sensitivityScore: {type:Number, default:0},
    uploadDate:{type:Date, default: Date.now}
});
module.exports = mongoose.model("Video", videoSchema);