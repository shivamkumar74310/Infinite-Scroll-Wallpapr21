const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// to check imageg are loaded or not 

// checking wheather imageg are loaded or not 
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArrey = [];

console.log("helloooooooooooooooooooo")
// Unsplash API for getting permission and API url is for the address 
const count = 10;

const apiKey = '4cGOnGptnKtgg8WAA6EXy2_cPh0_DcHsJ0oFGNcbXfw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if  all image are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create Element for links & photos
// for  targeting the id in html 
// for adding images into the div or container 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArrey.length;
    // Run function for each object in photosArrey
    photosArrey.forEach((photo) => {
        // Creating <a> to link to uplash
        const item = document.createElement('a');
        item.setAttribute('herf', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo 
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        // for showing aavout the imageg
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside image imageContainer Element
        item.appendChild(img);
        // for adding 10 more imageg 
        imageContainer.appendChild(item);
    });
}

// Get photos form unsplash API for use try catching error 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        // json javascript object notation
        photosArrey = await response.json();
        displayPhotos();
// fr print in inspect console 
    } catch (error) {
        console.log(err)
        // Catch error
    }
}
// Function for infinite scrolling:
window.addEventListener('scroll', () => {
     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
         ready = false;
         getPhotos(); 
     }
});
// Onload
getPhotos();