const multer = require('multer');
//var mime = require('mime-magic');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    
//console.log(req);
    // reject a file
    console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype==='image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


exports.upload = multer({
    storage: storage, 
    limits: {
             fileSize: 1024 * 1024 * 5 
    }, 
    fileFilter:fileFilter
       
});