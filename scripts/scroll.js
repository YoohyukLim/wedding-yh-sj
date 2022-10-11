const covers = document.querySelectorAll(".cover_view");
const shortcuts = document.querySelector(".shortcuts");
const blankDiv = document.getElementById("blank_div");
const coverHeight = (window.innerHeight > 0) ? window.innerHeight : window.screen.availHeight;
const FULLVIEW_POSITION = coverHeight * 0.2;
const HAFLVIEW_POSITION = coverHeight * 0.5;

let lastKnownScrollPosition = 0;
let ticking = false;
let scrollDown = true;
let posMap = new Map();

blankDiv.style.height = (coverHeight * covers.length + coverHeight * 0.5) + "px";

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

function applyOpacityOfShortcuts(scrollPos) {
    const targetPos = window.scrollY + blankDiv.getBoundingClientRect().bottom;
    if (scrollPos >= targetPos) {
        shortcuts.style.opacity = 0;
    } else {
        shortcuts.style.opacity = 1;
    }
}

function handleScrollEvent(scrollPos) {
    for (let i = 0; i < covers.length; i++) {
        applyOpacityOfCover(i, scrollPos);
    }

    applyOpacityOfShortcuts(scrollPos);
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

function scrollToPosition(name) {
    const element = document.getElementById(name);
    window.scrollTo({top: window.scrollY + element.getBoundingClientRect().top, behavior: "smooth"});
}

// finish loading
const topCover = document.getElementById("cover");
setTimeout(() => {
    topCover.style.transition = "0.2s";
    topCover.style.opacity = 0;
}, 500);
setTimeout(() => {
    topCover.remove();
}, 700);
