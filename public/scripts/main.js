async function fetch_jayson(url){
	try {
		const data = await fetch(url)
		if(data.status != 200){
			console.error(`jayson fetch of ${url} has returned status=${data.status}`);
			return undefined;
		} else {
			return data.json();
		};
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

async function send_form_jayson(form) {
	const data = Object.fromEntries(new FormData(form));
	console.info(`sending form data (json, ${form.method}): ${JSON.stringify(data)}`);
	const result = await fetch(form.action, {
		method: form.method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return result;
}

async function send_like(photo_id){
	try {
		console.info(`sending like to photo ${photo_id}`);
	const result = await fetch("/like/"+photo_id, {
		method: "POST"
	});
		return result.status;
	} catch (e) {
		console.error(e);
		return 500;
	}
}

async function send_comment(photo_id, text){
	if( text != ""){
		console.info(`sending comment to photo ${photo_id} : "${text}"`);
		const result = await fetch("/comment/"+photo_id, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: text
			})
		});
		console.info("comment status : "+result.status);
		return data.status;
	}
}

async function fetch_photo_data(photo_id) {
	console.info(`fetching photo ${photo_id} data`);
	return await fetch_jayson("/fetch/photo/"+photo_id);
}

async function fetch_photo_comments(photo_id) {
	console.info(`fetching photo ${photo_id} comments`);
	return await fetch_jayson("/fetch/comments/"+photo_id);
}


async function fetch_photographe_data(photographe_id) {
	console.info(`fetching photographe ${photographe_id} data`);
	return await fetch_jayson("/fetch/photographe/"+photographe_id);
}

async function send_form_multipart(form) {
	const data = Object.fromEntries(new FormData(form));
	console.dir(data.fichier);
	const result = await fetch(form.action, {
		method: form.method,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: data,
	});
	return result.status;
}

async function fetch_photos_by_id(page){
	console.info("fetching photo by ids");
	return await fetch_jayson(`/fetch/photos/id/${page}`);
}
async function fetch_photos_by_date(page){
	console.info("fetching photos by dates");
	return await fetch_jayson(`/fetch/photos/date/${page}`);

}
async function fetch_photos_by_likes(page){
	console.info("fetching photo by likes");
	return await fetch_jayson(`/fetch/photos/likes/${page}`);
}
async function fetch_photos_by_views(page){
	console.info("fetching photo by likes");
	return await fetch_jayson(`/fetch/photos/views/${page}`);
}
async function fetch_photos_by_photographe(page){
	console.info("fetching photo by photographes");
	return await fetch_jayson(`/fetch/photos/photographe/${page}`)
}

console.info("main.js loaded");
