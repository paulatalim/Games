var button = document.getElementById("ler-mais")

function lermais () {
    let pontos = document.getElementById("pontos")
    let texto = document.getElementById("escondido")
    
    if (pontos.style.display === "none") {
        pontos.style.display = "inline";
        texto.style.display = "none";
        button.innerHTML="Ler mais";
    } else {
        pontos.style.display = "none";
        texto.style.display = "inline";
        button.innerHTML="Ler menos";
    }
}