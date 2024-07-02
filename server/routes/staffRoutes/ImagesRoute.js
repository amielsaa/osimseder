const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PhotoLogic = require('../../domain/PhotoLogic'); 
const {housesLogger} = require('../../utils/Logger');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const houseId = req.params.houseId;
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
}).single('file'); // Assuming 'file' is the field name in your form data

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

// Route handler for uploading photo
router.post('/upload/:houseId', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ error: err.message });
    }
    if (!req.file) {
      return res.json({ error: 'No file uploaded' });
    }

    try {
      const houseId = req.params.houseId;
      const photo = await PhotoLogic.addPhoto(houseId, req.file.filename);
      res.json({ message: 'Photo uploaded successfully', photo });
    } catch (error) {
    //   housesLogger.error(`Failed Adding photo to house: ${req.params.houseId}: ${error.message}`);
      res.json({ error: error.message });
    }
  });
});

module.exports = router;
