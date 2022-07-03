const router = require('express').Router();
const { Review } = require('../../../models');

const { getAll, getOne } = Review;

router.get('/', async (req, res) => {});

router.get('/:id', async (req, res) => {
	try {
		const { rows, rowCount } = await Review.getOne({
			id: req.params.id,
		});

		if (rowCount > 0) {
			res.status(200).json(rows[0]);
		} else {
			res.status(404).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.patch('/:id', async ({ body, params }, res) => {
	try {
		const { rowCount } = await Review.updateVotes({
			id: params.id,
			helpful_votes: body.helpful_votes,
		});
		res.status(rowCount ? 204 : 400).end();
	} catch (err) {
		console.error(err);
		res.status(err.table ? 400 : 500).end();
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { rowCount } = await Review.update({
			id: req.params.id,
			...req.body,
		});

		res.status(rowCount === 0 ? 404 : 204).end();
	} catch (err) {
		console.error(err);
		res.status(err.table ? 400 : 500).end();
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { rowCount } = await Review.delete({
			id: req.params.id,
		});

		res.status(rowCount === 0 ? 404 : 204).end();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
