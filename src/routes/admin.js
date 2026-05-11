const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/auth');
const { getAllSquares, getPendingSquares, confirmSquare, deleteSquare, getExpiredSquares, getStats } = require('../controllers/admin');


router.get('/pending', adminAuth, getPendingSquares);
router.get('/squares', adminAuth, getAllSquares);
router.get('/expired', adminAuth, getExpiredSquares);
router.get('/stats', adminAuth, getStats);
router.patch('/confirm/:id', adminAuth, confirmSquare);
router.delete('/reject/:id', adminAuth, deleteSquare);

module.exports = router;