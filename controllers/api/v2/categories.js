const router = require('express').Router();
const { Category } = require('../../../models');

const { getAll, getOne, create, update, deleteOne } = Category;

router.get('/', async (req, res) => {
	try {
		const { rows } = await getAll();
		res.status(200).json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/', async ({ body }, res) => {
	try {
		const { rows } = await create(body);
		res.status(200).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(err.table ? 400 : 500).end();
	}
});

module.exports = router;
