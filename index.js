const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

/* API */
let count = 5;
const api_key = "XNBAhyYdyUAD-EGveqC8RE2eOyT7dF1CIaGxFw32m5s";
let API_URL = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;

let photos_array = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

/* Check image loaded or not */
function imageLoaded() {
    imagesLoaded++;
    if(Math.floor(totalImages/2) === imagesLoaded) {
        loader.hidden = true;
    }
    if(imagesLoaded === totalImages) {
        ready = true;
        count = 30;
        API_URL = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;
    }
}

/* Helper Function */
function set_ItemAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/* Create Element for Photos and Links and Add to DOM */
function displayPhotos() {
    loader.hidden = false;
    imagesLoaded = 0;
    totalImages = photos_array.length;
    /* Iterating over photos array to get each image */
    photos_array.forEach((photo) => {
        /* Create <a> link to Unsplash */
        const photo_item = document.createElement("a");
        set_ItemAttributes(photo_item, {
            href: photo.links.html,
            target: "_blank",
        });
        /* Creating image element */
        const image = document.createElement("img");
        set_ItemAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        /* Check if all images are loaded */
        image.addEventListener('load', imageLoaded);

        photo_item.appendChild(image);
        imageContainer.appendChild(photo_item);
    });
}

/* Get Photos form the API */
async function getPhotos() {
    try {
        const response = await fetch(API_URL);
        photos_array = await response.json();
        displayPhotos();
    }
    catch (err) {
        console.log(err.message);
    }
}

/* Added event listener */
window.addEventListener("scroll", (evt) => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


/* On load */
getPhotos();