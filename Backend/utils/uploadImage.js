const multer = require('multer');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: async (req, file, cb) => {
    //TODO: username değişkenini postmanden gelince okuyor frontend gönderince görmüyor!
    const extension=file.mimetype.split("/")
    cb(null, uuidv4() +"."+extension[1]);
    //console.log(req.body);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
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
  fileFilter: fileFilter
});


