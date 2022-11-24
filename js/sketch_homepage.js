let bancoGames =  JSON.parse(localStorage.getItem("games"));

if(!bancoGames){

    bancoGames = [
        {
            "nome": "Ratchet & Clank",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/ai3o0XtrnM8",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/ratchet-and-clank-rift-apart/"
        },
        {
            "nome": "Spider-Man: Miles Morales",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/qjRzm9A7DU4",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/marvels-spider-man-miles-morales/"
        },
        {
            "nome": "Kena: Bridge of Spirits",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/pWh5388AEHw",
            "linkDetalhes" : "https://store.epicgames.com/pt-BR/p/kena-bridge-of-spirits"
        },
        {
            "nome": "Guardians of the Galaxy",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/3PnAnIT4f68",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/marvels-guardians-of-the-galaxy/"
        },
        {
            "nome": "The Last of Us",
            "avaliacao": "94",
            "linkVideo": "https://www.youtube.com/embed/WxjeV10H1F0",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/the-last-of-us-part-i/"
        },
        {
            "nome": "Stray",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/XgPRPi--F5E",
            "linkDetalhes" : "https://stray.game/"
        },
        {
            "nome": "Pokémon UNITE",
            "avaliacao": "90",
            "linkVideo": "https://www.youtube.com/embed/Q3WMddjkuwM",
            "linkDetalhes" : "https://unite.pokemon.com/pt-br/"
        }
    ]
}

function filtro(){
    var filtro = document.getElementById("campo_buscar").value;
    exibirGames(filtro.toLowerCase())
}

function exibirGames(filtroBusca){

    var strCard = "";

    for (let i = 0; i < bancoGames.length; i++) {
        const game = bancoGames[i];
        if(game.nome.toLowerCase().startsWith(filtroBusca)){
            strCard += `<div class="col-lg-3 col-md-4 col-sm-12 card">
                            <div class="titulo-card-lancamento">
                                <h5>${game.nome}</h5>
                                <h5>${game.avaliacao}</h5>
                            </div>
                            <iframe 
                                width="100%" 
                                src="${game.linkVideo}" 
                                title="YouTube video player" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                            <a id="lancamento-maisDetalhe" href="${game.linkDetalhes}">Mais detalhes...</a>
                        </div>`
        }
    }
    document.querySelector('#teste_pesquisa').innerHTML = strCard;
}

onload = () =>{
    exibirGames('');
}