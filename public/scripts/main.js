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
	try {
		console.info(`fetching photo ${photo_id} data`);
		const data = await fetch("/fetch/photo/"+photo_id).then(
			(data) => {return data.json();}
		);
		return data;
	} catch (e) {
		console.error(e);
		return undefined;
	}

}

async function fetch_photo_comments(photo_id) {
	try {
		console.info(`fetching photo ${photo_id} comments`);
		const comments = await fetch("/fetch/comments/"+photo_id).then(
			(data) => {return data.json();}
		);
		return comments;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}


async function fetch_photographe_data(photographe_id) {
	try {
		console.info(`fetching photographe ${photographe_id} data`);
		const data = await fetch("/fetch/photographe/"+photographe_id).then(
			(data) => {return data.json();}
		);
		return data;
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
	return result.status;
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

console.info("main.js loaded");
