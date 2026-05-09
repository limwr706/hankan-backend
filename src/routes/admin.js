const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/auth');
const { getAllSquares, confirmSquare, deleteSquare } = require('../controllers/admin');

router.get('/squares', adminAuth, getAllSquares);
router.patch('/squares/:id/confirm', adminAuth, confirmSquare);
router.delete('/squares/:id', adminAuth, deleteSquare);

module.exports = router;