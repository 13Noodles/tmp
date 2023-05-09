const { Client } = require('pg');

const client = new Client({
	//user: 'postgres',
	//password: 'root',
	database: 'photo',
	port : process.env.UID
});

//Connection à la base de données
client.connect()
	.then(() => {
		console.log('Connected to database');
	})
	.catch((e) => {
		console.log('Error connecting to database');
		console.log(e);
	});

async function run_query(query){
	const query_result = await client.query(query);
	return query_result.rows;
}

async function query_photographe(photographe_id) {
	const query = `
		SELECT *
		FROM photographes
		WHERE photographes.id = ${photographe_id}
		LIMIT 1;
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0];
	}
	return undefined;
}

async function query_photographe_likes(photographe_id) {
	const query = `
		SELECT SUM(likes)
		FROM photos
		WHERE photos.id_photographe = ${photographe_id};
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0].sum;
	}
	return undefined;
}

async function query_photographe_views(photographe_id) {
	const query = `
		SELECT SUM(views)
		FROM photos
		WHERE photos.id_photographe = ${photographe_id};
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0].sum;
	}
	return undefined;
}

async function query_photographe_totals(photographe_id) {
	const query = `
		SELECT SUM(likes) AS likes, SUM(views) AS views
		FROM photos
		WHERE photos.id_photographe = ${photographe_id};
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0];
	}
	return undefined;
}

async function query_photographes() {
	const query = `
		SELECT *
		FROM photographes
		ORDER BY id ASC;
	`;
	return await run_query(query);
}

async function query_photographe_from_name(nom, prenom) {
	const query = `
		SELECT *
		FROM photographes
		WHERE photographes.nom = '${nom}'
			AND photographes.prenom = '${prenom}'
		LIMIT 1;
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0];
	}
	return undefined;
}

async function query_photographe_photos(photographe_id) {
	const query = `
		SELECT *
		FROM photos
		WHERE photos.id_photographe = ${photographe_id}
		ORDER BY id ASC
	`;
	return await run_query(query);
}

async function query_photos() {
	const query = `
		SELECT *
		FROM photos
		ORDER BY id ASC;
	`;
	return await run_query(query);
}

async function query_photo(photo_id) {
	const query = `
		SELECT *
		FROM photos
		WHERE photos.id = ${photo_id}
		LIMIT 1;
	`;
	const query_result = await run_query(query);
	if( query_result.length == 1 ) {
		return query_result[0];
	}
	return undefined;
}

async function query_photo_comments(photo_id) {
	const query = `
		SELECT *
		FROM comments
		WHERE comments.id_photo = ${photo_id};
	`;
	return await run_query(query);
}

async function add_photo_view(photo_id) {
	const query = `
		UPDATE photos
		SET views = views+1
		WHERE photos.id = ${photo_id};
	`;
	return await run_query(query);
}

async function add_photo_like(photo_id) {
	const query = `
		UPDATE photos
		SET likes = likes+1
		WHERE photos.id = ${photo_id};
	`;
	return await run_query(query);
}

async function add_photo_comment(photo_id, comment_text) {
	const query = `
		INSERT INTO comments (texte, id_photo)
		VALUES ('${comment_text}', ${photo_id});
	`;
	return await run_query(query);
}

async function add_photographe(nom, prenom) {
	const photographe_search_result = await query_photographe_from_name(nom, prenom);
	if( photographe_search_result == undefined){
		const query = `
			INSERT INTO photographes (nom, prenom)
			VALUES ('${nom}', '${prenom}');
		`;
		return await run_query(query);
	} else {
		return undefined;
	}
}

module.exports = {
	query_photographe,
	query_photographe_from_name,
	query_photographes,
	query_photographe_likes,
	query_photographe_views,
	query_photographe_totals,
	query_photographe_photos,
	query_photo,
	query_photos,
	query_photo_comments,

	add_photo_view,
	add_photo_like,
	add_photo_comment,
	add_photographe,
};
