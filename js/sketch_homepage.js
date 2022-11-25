let bancoGames =  JSON.parse(localStorage.getItem("games"));

if(!bancoGames){

    bancoGames = [
        {
            "nome": "Ratchet & Clank",
            "id" : "1",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/ai3o0XtrnM8",
        },
        {
            "nome": "Spider-Man: Miles Morales",
            "id" : "2",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/qjRzm9A7DU4"
        },
        {
            "nome": "Kena: Bridge of Spirits",
            "id" : "3",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/pWh5388AEHw"
        },
        {
            "nome": "Guardians of the Galaxy",
            "id" : "4",
            "avaliacao": "96",
            "linkVideo": "https://www.youtube.com/embed/3PnAnIT4f68"
        },
        {
            "nome": "The Last of Us",
            "id" : "5",
            "avaliacao": "94",
            "linkVideo": "https://www.youtube.com/embed/WxjeV10H1F0"
        },
        {
            "nome": "Stray",
            "id" : "6",
            "avaliacao": "80",
            "linkVideo": "https://www.youtube.com/embed/XgPRPi--F5E"
            
        },
        {
            "nome": "Pokémon UNITE",
            "id" : "7",
            "avaliacao": "90",
            "linkVideo": "https://www.youtube.com/embed/Q3WMddjkuwM"
        }
    ]
}

function filtro(){
    var filtro = document.getElementById("campo_buscar").value;
    exibirGames(filtro.toLowerCase())
}

function exibirGames(filtroBusca){
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => {
            let str = ''
            for (let i = 0; i < data.results.length; i++) {
                let jogo = data.results[i]
                let title = `${jogo.name}`
                if(`${jogo.name}`.toLowerCase().startsWith(filtroBusca)){
                    str += `<div class="col-lg-3 col-md-4 col-sm-12 novo_card" style="background-image: url(${jogo.background_image});">
                                <h5>${jogo.name}</h5>
                                <div class="info-card">
                                    <p>Avaliação: ${jogo.rating}</p>
                                    <p>Lançamento: ${jogo.released}</p>
                                    <a id="lancamento-maisDetalhe" href="./detalhes.html?id=${jogo.id}">Mais Detalhes...</a>
                                </div>
                            </div>`                    
                  }
            }
            document.getElementById('pesquisa_cards').innerHTML = str
        })    
}

function exibirGame (id) {
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => {
            let str = ''
            let i = data.results.findIndex (elem => elem.id == id)
            if (i != -1) {
                let jogo = data.results[i]
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
        })
}

onload = () =>{
    exibirGames('');
}