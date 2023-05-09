const express = require('express')
const router = express.Router();
const queries = require('./queries');

router.use((req,res,next) => {
	console.log(`get router : ${req.url}`);
	next();
});

router.get('/', (req, res) => {
	res.redirect('/public/index.html');
});

router.get('/index', (req, res) => {
	res.redirect('/public/index.html');
});

router.get('/favicon.ico', (req, res) => {
	res.redirect('/public/favicon.ico');
})

router.get('/mur-images', async (req, res) => {
	try {
		const data = await queries.query_photos();
		res.render('mur', {
			photos: data
		})
	} catch (e) {
		console.error(e);
		res.send(e);
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
