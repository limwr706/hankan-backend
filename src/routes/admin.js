const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/auth');
const { getAllSquares, confirmSquare, deleteSquare } = require('../controllers/admin');

router.get('/pending', adminAuth, getAllSquares);
router.patch('/confirm/:id', adminAuth, confirmSquare);
router.delete('/reject/:id', adminAuth, deleteSquare);

module.exports = router;