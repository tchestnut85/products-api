const router = require('express').Router();

const { Category } = require('../../../models');
const redis = require('../../../config/redis');

const { getAll, getOne, create, update, deleteOne } = Category;

router.get('/', async (req, res) => {
	try {
		const { rows } = await getAll();

		await redis.set(req.originalUrl, JSON.stringify(rows), 'EX', 3600);

		res.status(200).json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('/:id', async ({ params }, res) => {
	console.log('params:', params);
	try {
		const { rows, rowCount } = await getOne({ id: params.id });

		if (rowCount) {
			res.status(200).json(rows);
			return;
		}

		res.status(404).end();
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

router.put('/:id', async ({ body, params }, res) => {
	try {
		const { rowCount } = await update({ id: params.id, ...body });
		res.status(rowCount ? 204 : 404).end();
	} catch (err) {
		console.error(err);
		res.status(err.table ? 400 : 500).end();
	}
});

router.delete('/:id', async ({ params }, res) => {
	try {
		const { rowCount } = deleteOne({ id: params.id });
		res.status(rowCount ? 204 : 404).end();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
