const express = require('express');
const router = express.Router();
const multer = require('multer');
const CVController = require('../controllers/cv.controller');

// Configuration de multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté. Utilisez PDF ou DOCX.'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// Routes
router.post('/upload', upload.single('cv'), CVController.uploadCV);
router.post('/adapt', CVController.adaptCV);
router.post('/suggest-tools', CVController.suggestTools);

module.exports = router; 