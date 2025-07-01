// Fonction permettant l'affichage ou le masquage d'un élément quand son icône est cliqué
function toggleDisplay(e, id) {
    document.getElementById(id).classList.toggle("hidden");
}

// Masque automatiquement le menu burger si la fenêtre fait moins de 992px (= 62em) et affiche le menu si la fenêtre fait plus de 992px.
"load resize".split(" ").forEach(function(e){
    window.addEventListener(e, () => {
        if(window.innerWidth>=992) {
            if (document.getElementById("header_navbar")) {
                document.getElementById("header_navbar").classList.remove("hidden");
            }
            if (document.getElementById("header_navbar_account")) {
                document.getElementById("header_navbar_account").classList.add("hidden");
            }
        } else {
            if (document.getElementById("header_navbar")) {
                document.getElementById("header_navbar").classList.add("hidden");
            }
            if (document.getElementById("header_navbar_account")) {
                document.getElementById("header_navbar_account").classList.remove("hidden");
            }
        }
    })
})

export {toggleDisplay};