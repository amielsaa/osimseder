const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken');
const {validateAccess, accessGroup} = require('../../utils/Accesses');
const StaffTaskLogic = require('../../domain/StaffTaskLogic');
const {Groups, Staffs, Areas, Schools, Cities, Houses, Tasks} = require('../../models');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const houseId = req.body.houseId;
    if (!houseId) {
      return cb(new Error('houseId is required'));
    }
    cb(null, houseId + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image'); // 'image' is the key in FormData

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// TODO: validateToken
router.post('/upload', /*validateToken, validateAccess(accessGroup.B),*/ (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file.filename,
    });
  });
});

module.exports = router;
