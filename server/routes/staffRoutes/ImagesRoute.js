const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PhotoLogic = require('../../domain/PhotoLogic'); 
const {housesLogger} = require('../../utils/Logger');
const { validateToken } = require('../../utils/JsonWebToken');
const { validateAccess , accessGroup} = require('../../utils/Accesses');

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
router.post('/upload/:houseId',validateToken, validateAccess(accessGroup.B), (req, res) => {
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
      housesLogger.error(`Failed Adding photo to house: ${req.params.houseId}: ${error.message}`);
      res.json({ error: error.message });
    }
  });
});

//get all photos by houseId
router.get('/photo/:houseId', async (req, res) => {
    try {
        const houseId = req.params.houseId;
        const photos = await PhotoLogic.getPhotos(houseId);

        res.json(photos);
    } catch (error) {
        housesLogger.error(`Failed to retrieve photos: ${req.params.houseId}: ${error.message}`);
        res.json({ error: 'Failed to retrieve photos' });
    }
  });

//get a single photo by photoName
router.get('/photo/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        res.sendFile(filePath, err => {
            if (err) {
                housesLogger.error(`Failed to send file: ${filename}: ${err.message}`);
                res.json({ error: 'Failed to send file' });
            }
        });
    } catch (error) {
        housesLogger.error(`Failed to retrieve photo: ${req.params.filename}: ${error.message}`);
        res.json({ error: 'Failed to retrieve photo' });
    }
});

router.delete('/photo/:filename', validateToken, validateAccess(accessGroup.B), async (req, res) => {
  try {
    const filename = req.params.filename;

    // Delete the photo record from the database
    await PhotoLogic.removePhoto(filename);

    res.json(true)
  } catch (error) {
    housesLogger.error(`Failed to delete photo: ${req.params.filename}: ${error.message}`);
    res.json({ error: 'Failed to delete photo' + error });
  }
});
  

module.exports = router;
