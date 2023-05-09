const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.post('/like/:id', async (req, res) => {
	try {
		const photo_id = req.params.id;
		await queries.add_photo_like(photo_id);
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
});
router.post('/comment/:id', async (req, res) => {
	try {
		const photo_id = req.params.id;
		await queries.add_photo_comment(photo_id, req.body.comment);
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
});

router.post('/add/photographe', async (req, res) => {
	try {
		const received_data = req.body;
		const result = await queries.add_photographe(received_data.nom, received_data.prenom);
		if(result === undefined){
			res.sendStatus(204); // photographe already exists, nothing done
		} else {
			res.sendStatus(200); // photographe added
		}
	} catch(e){
		console.error(e);
		res.sendStatus(500);
	}
});

router.post('/add/photo', async (req, res) => {
	try {
		let data = "";
		req.on('data', (d) => {
			data += d;
		});
			req.on('end', () => {
				console.dir(data);
			});
		const received_data = req.body;
		console.log(received_data);
		/*
			const result = await queries.add_photographe(received_data.nom, received_data.prenom);
			console.log(result);
			if(result === undefined){
				res.sendStatus(204); // photo already exists, nothing done
			} else {
				res.sendStatus(200); // photo added
			}
		*/
		res.sendStatus(200);
	} catch(e){
		console.error(e);
		res.sendStatus(500);
	}
});


module.exports = router;
