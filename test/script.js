function sla () {
    let card = document.getElementsByClassName("card1");
    let topicos = document.getElementById("topicos");

}


onload = () => {


    
    let btn_pesquisar = document.getElementById("btn-pesquisar");

    btn_pesquisar.addEventListener("click", () => {
        let txt_input = document.getElementById("campo_buscar").value;
        console.log(txt_input)})


        jQuery(document).ready(function($) {
 
            $('#myCarousel').carousel({
                    interval: 5000
            });
        
            //Handles the carousel thumbnails
            $('[id^=carousel-selector-]').click(function () {
            var id_selector = $(this).attr("id");
            try {
                var id = /-(\d+)$/.exec(id_selector)[1];
                console.log(id_selector, id);
                jQuery('#myCarousel').carousel(parseInt(id));
            } catch (e) {
                console.log('Regex failed!', e);
            }
        });
            // When the carousel slides, auto update the text
            $('#myCarousel').on('slid.bs.carousel', function (e) {
                     var id = $('.item.active').data('slide-number');
                    $('#carousel-text').html($('#slide-content-'+id).html());
            });
        });

}





// var button = document.getElementById("ler-mais")

// function lermais () {
//     let pontos = document.getElementById("pontos")
//     let texto = document.getElementById("escondido")
    
//     if (pontos.style.display === "none") {
//         pontos.style.display = "inline";
//         texto.style.display = "none";
//         button.innerHTML="Ler mais";
//     } else {
//         pontos.style.display = "none";
//         texto.style.display = "inline";
//         button.innerHTML="Ler menos";
//     }
// }

// function search_animal() {
//     let input = document.getElementById('searchbar').value
//     input=input.toLowerCase();
//     let x = document.getElementsByClassName('animals');
      
//     for (i = 0; i < x.length; i++) { 
//         if (x[i].innerHTML.toLowerCase().startsWith(input)) {
//             x[i].style.display="list-item";    
//         }
//         else {
//             x[i].style.display="none";                 
//         }
//     }
// }


// function barra_de_busca(){
//     var barra_de_busca = document.getElementById("campo_buscar").value;
//     requisicao_games_lancamentos(barra_de_busca.toLowerCase())
// }

// function exibir_games_lancamentos(data, filtroBusca) {
//     let str = '';
//     let button_ver_mais = document.getElementById("lancamentos-ver-mais");
//     let cards_escondidos = document.getElementById("mostrar_mais_cards");

//     // if (filtroBusca == '') {
//     //     button_ver_mais.style.display = "inline";
//     //     exibir_todos_lancamentos(data);

//     // } else {
//         //Deixa o sistema de visualizacao de mais cards oculto
//         cards_escondidos.style.display = "none";
//         button_ver_mais.style.display = "none";

//         //Pesquisa dos jogos
//         for (let i = 0; i < data.results.length; i++) {
//             let jogo = data.results[i]
//             if(`${jogo.name}`.toLowerCase().startsWith(filtroBusca)){
//                 str += exibir_card_game_lancamento (jogo)
//             }
//         }
//         document.getElementById('pesquisa_cards').innerHTML = str
//     // }

//     return data;
// }

// function requisicao_games_lancamentos(filtroBusca){
//     fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
//         .then(res => res.json ())
//         .then(data => exibir_games_lancamentos(data, filtroBusca)); 
// }

// onload = () => {
//     requisicao_games_lancamentos('');
// }