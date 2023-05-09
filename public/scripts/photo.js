async function reload_comments() {
	const comments = await fetch("/fetch/comments/<%= photo_data.id %>").then(
		(data) => {return data.json();}
	);
	const comments_container = document.getElementById("comments");
	if( comments.length == 0) {
		comments_container.textContent = "Aucun commentaire"
	} else {
		comments_container.innerHTML = "commentaires :"
		comments.forEach(comment => {
			comments_container.innerHTML += `<div class="align-left">${comment.texte}</div>`
		});
	}
}
async function reload_stats() {
	const stats = await fetch("/fetch/photo/<%= photo_data.id %>").then(
		(data) => {return data.json();}
	);
	document.querySelector("#likeCount").innerHTML = stats.likes+"&hearts;";
	document.querySelector("#viewCount").innerHTML = stats.views+"&#128065;";

}

async function send_like(){
	const data = await fetch("/like/<%= photo_data.id %>", {
		method: "POST"
	});
	if(data.status === 200){
		reload_stats();
	}
}

async function send_comment(){
	const comment_input = document.getElementById("comment");
	if( comment_input.value != ""){
		const data = await fetch("/comment/<%= photo_data.id %>", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comment: "cookie"
			})
		});
		if(data.status === 200){
			comment_input.value = "";
			reload_comments();
		}
	}
}
