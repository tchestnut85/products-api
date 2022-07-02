const router = require('express').Router();
const { Review } = require('../../../models');

const { getAll, getOne } = Review;

router.get('/', async (req, res) => {});

module.exports = router;
