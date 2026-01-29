const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({destination: function(req, file, cb){cb(null, "uploads/");},
filename: function(req, file, cb){const uniqueName = Date.now()+ path.extname(file.originalname); cb(null, uniqueName);}
});
const fileFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith("video/")){
        cb(null, true);
    }else{
        cb(new Error("Only video files allowed"),false); 
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});
module.exports = upload;