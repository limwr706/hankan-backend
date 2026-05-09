const express = require('express');
const router = express.Router();
const { getSquares, createSquare } = require('../controllers/squares');

router.get('/', getSquares);
router.post('/', createSquare);

module.exports = router;