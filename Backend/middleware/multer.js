const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');


const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
})

module.exports = upload