// Fonction permettant l'affichage ou le masquage d'un élément quand son icône est cliqué
function toggleDisplay(e, id) {
    document.getElementById(id).classList.toggle("hidden");
}

// Masque automatiquement le menu burger si la fenêtre fait moins de 992px (= 62em).
// Affiche le menu si la fenêtre fait plus de 992px.
window.addEventListener('load', () => {
    if(window.innerWidth>=992) {
        document.getElementById("header_navbar").classList.remove("hidden")
        document.getElementById("header_navbar_account").classList.add("hidden");
    } else {
        document.getElementById("header_navbar").classList.add("hidden");
        document.getElementById("header_navbar_account").classList.remove("hidden");
    }
})

window.addEventListener('resize', () => {
    if(window.innerWidth>=992) {
        document.getElementById("header_navbar").classList.remove("hidden")
        document.getElementById("header_navbar_account").classList.add("hidden");
    } else {
        document.getElementById("header_navbar").classList.add("hidden");
        document.getElementById("header_navbar_account").classList.remove("hidden");
    }
})

export {toggleDisplay}