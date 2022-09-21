function openPopup(name) {
    const element = document.getElementById(name)
    element.style.display = 'block'
}

function closePopup(element) {
    element.parentNode.parentNode.style.display = 'none'
}
