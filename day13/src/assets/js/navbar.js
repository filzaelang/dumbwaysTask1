let isOpen = false
let hamburgerNavContainer = document.getElementById("hamburger-nav-container")

function openHamburger() {
    if (!isOpen) {
        hamburgerNavContainer.style.display = "flex"
        isOpen = true
    } else {
        hamburgerNavContainer.style.display = "none"
        isOpen = false
    }
}

function myFunction(x) {
    if (x.matches) { // If media query matches
        hamburgerNavContainer.style.display = "none"
        isOpen = false
    }
}

var x = window.matchMedia("(min-width: 501px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

