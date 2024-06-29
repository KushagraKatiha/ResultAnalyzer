const express = require('express');
const multer = require('multer');
const { UPLOAD_DIR } = require('../constants');
const { uploadFile, downloadFile } = require('../controllers/fileController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:format', downloadFile);

module.exports = router;
