const express = require('express');
const router = express.Router();
const queries = require('./queries');

const photo_per_page = 10;


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

router.get('/photos/:sort/:page/', async (req, res) => {
	try {
		const page_id = Number(req.params.page);
		const sort_kind = req.params.sort;
		if(page_id < 0){
			res.sendStatus(404, "seriously ?");
			return;
		}
		let data;
		switch (sort_kind.toLowerCase()) {
			case "date":
				data = await queries.query_photos_sort_date();
				break;
			case "likes":
				data = await queries.query_photos_sort_likes();
			break;
			case "views":
				data = await queries.query_photos_sort_views();
			break;
			case "photographe":
				data = await queries.query_photos_sort_photographe();
			break;
			case "id":
				data = await queries.query_photos();
				break;
			default:
				res.sendStatus(400);
				return;
		}
		if( data === undefined ){
			res.sendStatus(500);
		} else {
			const photos = data.slice(page_id*photo_per_page, (page_id+1)*photo_per_page);
			if(photos === []){
				res.sendStatus(500);
			} else {
				res.json(photos);
			}
		}
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
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
