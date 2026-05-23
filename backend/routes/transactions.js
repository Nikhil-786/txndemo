const express = require('express');
const multer = require('multer');
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
});

// Upload file route (Protected)
router.post('/upload', auth, upload.single('file'), transactionController.uploadFile);

// Get transactions route (Protected)
router.get('/', auth, transactionController.getTransactions);

// Get transaction summary route (Protected)
router.get('/summary', auth, transactionController.getTransactionSummary);

module.exports = router;
