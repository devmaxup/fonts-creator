const router = require('express').Router();
const createResponse = require('./_createResponse');
const Glyph = require('../models/Glyph');

router.get(
  '/',
  createResponse((req, respond) => Glyph.paginate(
    {},
    { page: req.query.page, limit: req.query.limit },
    respond
  )),
);

router.post(
  '/',
  createResponse((req, respond) => Glyph.create({
    symbol: req.body.symbol,
    data: req.body.data,
  }, respond)),
);

module.exports = router;
