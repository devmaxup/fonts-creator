const router = require('express').Router();
const createResponse = require('./_createResponse');
const Glyph = require('../models/Glyph');

router.get(
  '/',
  createResponse((req, respond) => Glyph.paginate(
    {},
    { page: req.query.page || 1, limit: req.query.limit || 40 },
    respond,
  )),
);

router.post(
  '/',
  createResponse((req, respond) => Glyph.create({
    name: req.body.name,
    unicode: req.body.unicode,
    advanceWidth: req.body.advanceWidth,
    pathData: req.body.pathData,
  }, respond)),
);

module.exports = router;
