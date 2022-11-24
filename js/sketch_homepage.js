let bancoGames =  JSON.parse(localStorage.getItem("games"));

if(!bancoGames){

    bancoGames = [
        {
            "nome": "Ratchet & Clank",
            "id" : "1",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/ai3o0XtrnM8",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/ratchet-and-clank-rift-apart/"
        },
        {
            "nome": "Spider-Man: Miles Morales",
            "id" : "2",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/qjRzm9A7DU4",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/marvels-spider-man-miles-morales/"
        },
        {
            "nome": "Kena: Bridge of Spirits",
            "id" : "3",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/pWh5388AEHw",
            "linkDetalhes" : "https://store.epicgames.com/pt-BR/p/kena-bridge-of-spirits"
        },
        {
            "nome": "Guardians of the Galaxy",
            "id" : "4",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/3PnAnIT4f68",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/marvels-guardians-of-the-galaxy/"
        },
        {
            "nome": "The Last of Us",
            "id" : "5",
            "avaliacao": "94",
            "linkVideo": "https://www.youtube.com/embed/WxjeV10H1F0",
            "linkDetalhes" : "https://www.playstation.com/pt-br/games/the-last-of-us-part-i/"
        },
        {
            "nome": "Stray",
            "id" : "6",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/XgPRPi--F5E",
            "linkDetalhes" : "https://stray.game/"
        },
        {
            "nome": "Pokémon UNITE",
            "id" : "7",
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
                            <a id="lancamento-maisDetalhe" href="./detalhes.html?id=${game.id}">Mais detalhes...</a>
                        </div>`
        }
    }
    document.querySelector('#pesquisa_cards').innerHTML = strCard;
}

function exibirGame (id) {
    let i = bancoGames.findIndex (elem => elem.id == id)
    if (i != -1) {
        let game = bancoGames[i]
        let str =  `<div class="col-lg-3 col-md-4 col-sm-12 card">
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
                    </div>`
    
        document.querySelector('#card-game').innerHTML = str    
    }
    else {
        document.querySelector('#card-game').innerHTML = '<h1>Jogo não encontrado</h1>'    
    }
}

onload = () =>{
    exibirGames('');
}