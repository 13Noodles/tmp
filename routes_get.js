const express = require('express')
const router = express.Router();
const queries = require('./queries');

const photo_per_page = 10;

router.use((req,res,next) => {
	console.log(`get router : ${req.url}`);
	next();
});

router.get('/', (req, res) => {
	// res.redirect('/public/index.html');
	res.redirect('/mur-images');
});

router.get('/index', (req, res) => {
	res.redirect('/public/index.html');
});

router.get('/favicon.ico', (req, res) => {
	res.redirect('/public/images/favicon.ico');
})
router.get('/mur-images', async (req, res) => {
	res.redirect('/mur-images/0');
});


router.get('/mur-images/:page', async (req, res) => {
	res.redirect(`/mur-images/${req.params.page}/id`);
});

router.get('/mur-images/:page/:sort', async (req, res) => {
	const page_id = Number(req.params.page);
	const sort = req.params.sort || "id";
	if(page_id === undefined || page_id < 0){
		res.redirect('/mur-images/0');
	} else {
		let next_page_id = page_id+1;
		const next_photo_data = await queries.query_photo(photo_per_page*(page_id+1)+1);
		if(next_photo_data === undefined){
			next_page_id = undefined;
		}
		let previous_page_id = page_id-1;
		if(previous_page_id < 0){
			previous_page_id = undefined;
		}
		res.render('mur', {
			current_page_id: page_id,
			next_page_id: next_page_id,
			previous_page_id: previous_page_id,
			sorting: sort
		});
	}
});

router.get('/image/:id',  async (req, res) => {
	try {
		const photo_id = req.params.id;
		const photo_data = await queries.query_photo(photo_id);
		const comments_data = await queries.query_photo_comments(photo_data.id);
		const photographe_data = await queries.query_photographe(photo_data.id_photographe);
		await queries.add_photo_view(photo_id);
		res.render('photo', {
			photo: photo_data,
			comments: comments_data,
			photographe: photographe_data,
		});
	} catch(e){
		console.error(e);
		res.send(e);
	}
});

router.get('/profile/:id',  async (req, res) => {
	try {
		const photographe_id = req.params.id;
		const photographe_data = await queries.query_photographe(photographe_id);
		const photo_data = await queries.query_photographe_photos(photographe_id);
		const totals_data = await queries.query_photographe_totals(photographe_id)
		res.render('profile', {
			photos: photo_data,
			photographe: photographe_data,
			likes: totals_data.likes,
			views: totals_data.views,
		});
	} catch(e){
		console.error(e);
		res.send(e);
	}
});

router.get('/add-image', async (req, res) => {
	try {
		const photographes_data = await queries.query_photographes();
		res.render('add-image', { 
			photographes: photographes_data 
		}); 
	} catch(e){
		console.error(e);
		res.send(e);
	}
});

router.get('/add-photographe', async (req, res) => {
	res.render('add-photographe');
});

module.exports = router;
