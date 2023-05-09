async function like(event, form, photo_id){
    event.preventDefault();
    const result_code = await send_like(photo_id);
    if( result_code === 200 ) {
        const elem = document.querySelector("#likeCount");
        const photo_data = await fetch_photo_data(photo_id);
        if( elem != undefined && photo_data != undefined ){
            elem.textContent = photo_data.likes;
            form.remove()
        }
    }
}
async function fcomment(event, form, photo_id){
    event.preventDefault();
    const result_code = await send_form_jayson(form);
    if(result_code === 200){
        form.reset();
        const comments_elem_container = document.getElementById("comments");
        const comments = await fetch_photo_comments(photo_id);
        if( comments.length == 0 ) {
            comments_elem_container.innerHTML = '<div>Aucun commentaire</div>';
        } else {
            comments_elem_container.innerHTML = "";
            comments.forEach(comment => {
                let comment_elem = document.createElement("div");
                comment_elem.innerText = comment.texte;
                comments_elem_container.appendChild(comment_elem);
            });
        }
    }
}

async function update_stats(photo_id){
    const photo_data = await fetch_photo_data(photo_id);
    if(photo_data != undefined){
        const likes_elem = document.querySelector("#likeCount");
        const views_elem = document.querySelector("#viewCount");
        if(likes_elem != undefined){
            likes_elem.textContent = photo_data.likes;
        }
        if(views_elem != undefined){
            views_elem.textContent = photo_data.views;
        }
    }
}