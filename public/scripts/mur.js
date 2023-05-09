async function like(button_elem, image_id){
    const liked = await send_like(image_id);
    if( liked ) {
        const elem = document.querySelector("#likes-photo-"+image_id);
        const photo_data = await fetch_photo_data(image_id);
        if( elem != undefined && photo_data != undefined ){
            elem.textContent = photo_data.likes;
            button_elem.remove();
        }
    }
}
async function update_wall_sort_select(select_elem, page){
    let sort_value = select_elem.value;
    refresh_wall(sort_value, page);
}
async function refresh_wall(sort_value, page){
    let photos_data = undefined;
    switch (sort_value.toLowerCase()) {
        case "date":
            photos_data = await fetch_photos_by_date(page);
            break;
        case "likes":
            photos_data = await fetch_photos_by_likes(page);
        break;
        case "views":
            photos_data = await fetch_photos_by_views(page);
        break;
        case "photographe":
            photos_data = await fetch_photos_by_photographe(page);
        break;
        case "id":
            photos_data = await fetch_photos_by_id(page);
    }
    if(photos_data != undefined){
        let wall_elem = document.getElementById("image-wall");
        if(wall_elem != undefined){
            wall_elem.innerHTML = "";
            photos_data.forEach((photo) => {
                console.log(photo)
                fichierSmallImage = photo.fichier.split('.')[0] + '_small.jpg';
                wall_elem.innerHTML += `
                    <figure class="imageSelect" style="width: 10%">
                        <a href="/image/${photo.id}">
                            <img title="${photo.nom}" class="image-wall-icon" src="/public/images/${fichierSmallImage}">
                        </a>
                        <figcaption class="image-info">
                            <span><span id="views-img-${photo.id}">${photo.views}</span>&#128065;</span>
                            <span><span id="likes-photo-${photo.id}">${photo.likes}</span><button class="like-btn" onclick="like(this,${photo.id})">&hearts;</button></span>
                        </figcaption>
                    </figure>
                `;
            })
        }
    }
}