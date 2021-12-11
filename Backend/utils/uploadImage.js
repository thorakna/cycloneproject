const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: async (req, file, cb) => {
    const extension=file.mimetype.split("/")
    cb(null, uuidv4() +"."+extension[1]);
  }
});
const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype==='image/gif') {
    cb(null, true);
  } else {
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
   // cb(null, false);
  }
};
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


