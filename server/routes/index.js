const router = require('express').Router();
const glyphs = require('./glyphs');

router.use('/glyphs', glyphs);

module.exports = router;
