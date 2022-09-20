const covers = document.querySelectorAll(".cover_view");
const coverHeight = (window.innerHeight > 0) ? window.innerHeight : window.screen.availHeight;
const FULLVIEW_POSITION = coverHeight * 0.2;
const HAFLVIEW_POSITION = coverHeight * 0.5;

let lastKnownScrollPosition = 0;
let ticking = false;
let scrollDown = true;
let currentCoverIdx = 0;
let posMap = new Map();

document.getElementById("blank_div").style.height = coverHeight * covers.length + "px";
const locationHeaderImage = document.getElementById("location_img");

covers.forEach((entry, idx) => {
    if (idx > 0) {
        entry.style.opacity = 0;
    }
    posMap.set(idx, idx * coverHeight)
})

function applyOpacityOfCover(coverIdx, scrollPos) {
    const element = covers[coverIdx];
    const elemPos = posMap.get(coverIdx);

    if (elemPos - FULLVIEW_POSITION <= scrollPos && scrollPos <= elemPos + FULLVIEW_POSITION) {
        element.style.opacity = 1;
    } else if (elemPos - HAFLVIEW_POSITION <= scrollPos && scrollPos <= elemPos + HAFLVIEW_POSITION) {
        element.style.opacity = 0.5;
    } else {
        element.style.opacity = 0;
    }
}

function applyOpacityOfLocationImage(scrollPos) {
    const locationPos = document.getElementById("location").offsetTop;
    
    console.log(scrollPos + ":" + locationPos + ":" + scrollDown);
    if (scrollDown) {
        if (scrollPos >= locationPos) {
            locationHeaderImage.style.opacity = 0;
        }
    } else {
        if (scrollPos <= locationPos) {
            locationHeaderImage.style.opacity = 1;
        }
    }
}

function handleScrollEvent(scrollPos) {
    for (let i = 0; i < covers.length; i++) {
        applyOpacityOfCover(i, scrollPos);
    }

    applyOpacityOfLocationImage(scrollPos);
}

document.addEventListener('scroll', (e) => {
    scrollDown = lastKnownScrollPosition <= window.scrollY;
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScrollEvent(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

// finish loading
const topCover = document.getElementById("cover");
setTimeout(() => {
    topCover.style.transition = "0.2s"
    topCover.style.opacity = 0;
}, 500);
setTimeout(() => {
    topCover.remove();
}, 700);
