const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.use((req,res,next) => {
	console.log(`fetch router : ${req.url}`);
	next();
});


router.get('/photo/:id', async (req, res) => {
	const photo_id = req.params.id;
	const data = await queries.query_photo(photo_id);
	if( data === undefined ){
		res.sendStatus(500);
	} else {
		res.json(data);
	}
});

router.get('/comments/:id', async (req, res) => {
	const photo_id = req.params.id;
	const data = await queries.query_photo_comments(photo_id);
	if( data === undefined ){
		res.sendStatus(500);
	} else {
		res.json(data);
	}
});

router.get('/photographe/:id', async (req, res) => {
	const photographe_id = req.params.id;
	console.log("boop");
	const photographe_data = await queries.query_photographe(photographe_id);
	const stats_data = await queries.query_photographe_totals(photographe_id);
	if( photographe_data === undefined || stats_data === undefined ){
		res.sendStatus(500);
	} else {
		// {...a, ...b} : merge a and b into one object
		res.json({...photographe_data, ...stats_data});
	}
});


module.exports = router;
