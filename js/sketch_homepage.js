/*************
 * DESTAQUES *
 *************/
function exibir_games_destaques(data) {
    let str = ''
    
    //Inclusao de novo slide no corrousel
    for (let i = 0; i < 3; i++){
        let jogo = data.results[i]

        if (i == 0) {
            str += `<div class="carousel-item active">`
        } else {
            str += `<div class="carousel-item">`
        }

        str += `    <div class="slide-destaque" style="background-image: url(${jogo.background_image});">
                        <div class="destaque-filtro-image">
                            <div class="col-lg-5 col-9 destaque1-conteudo">
                                <h1>${jogo.name}</h1>
                                <!--<p id="destaque-conteudo-detalhamento">
                                    <strong>Lançamento:</strong> ${jogo.released}<br>
                                    <strong>Plataformas:</strong> <br>
                                    <strong>Avaliação:</strong> ${jogo.rating} <br>
                                </p>-->
                            </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('destaque-slide').innerHTML = str
    
    return data;
}

/***************
 * LANCAMENTOS *
 ***************/

function exibir_card_game_lancamento (jogo, id, complemento) {
    let str = '';

    str = `<div class="col-lg-3 col-md-4 col-sm-12 area-card">
                <div class="card" style="background-image: url(${jogo.background_image});">
                    <div class="card-conteudo">
                        <h5>${jogo.name}</h5>
                        <div class="info-card">
                            
                                <p>Avaliação: ${jogo.rating}</p>
                                <p>Lançamento: ${jogo.released}</p>
                            
                                <div><a id="lancamento-maisDetalhe" href="./detalhes.html?id=${jogo.id}&num=${id}&adicional=${complemento}">Mais Detalhes...</a></div>
                        </div>
                    </div>
                </div>
            </div>`

    return str
}

function exibir_titulo_filtro_genero() {
    document.getElementById("filtro-genero").innerHTML ="Genero";
}

function exibir_titulo_filtro_ordem() {
    document.getElementById("filtro-ordem").innerHTML = "Ordem";
}

function exibir_todos_lancamentos (data) {
    let str = '';

    //Exibe 6 cards
    for (let i = 0; i < 8; i++) {
        let jogo = data.results[i];
        str += exibir_card_game_lancamento(jogo, 0, '');
    }

    document.getElementById('pesquisa_cards').innerHTML = str;

    str = '';

    for (let i = 6; i < data.results.length; i++) {
        let jogo = data.results[i];
        str += exibir_card_game_lancamento(jogo, 0, '');
    }
    
    document.getElementById('mostrar_mais_cards').innerHTML = str;
    
    return data;
}

function ver_mais_lancamentos() {
    let cards_escondidos = document.getElementById("mostrar_mais_cards");
    let icone = document.getElementById("jogos-ver-mais-icone");
    let btn_txt = document.getElementById("jogos-ver-mais-text");

    if (cards_escondidos.style.display == "none" || cards_escondidos.style.display == "") {
        cards_escondidos.style.display = "flex";
        icone.style.rotate = "180deg";
        btn_txt.innerHTML = "Ver menos";
    } else {
        cards_escondidos.style.display = "none";
        icone.style.rotate = "0deg";
        btn_txt.innerHTML = "Ver mais";
    }
}

function barra_de_busca(){
    let barra_de_busca = document.getElementById("campo_buscar").value;

    exibir_titulo_filtro_genero();
    exibir_titulo_filtro_ordem();
    requisicao_games_lancamentos(barra_de_busca.toLowerCase())
}

function filtrar_genero(genero, nome_genero) {
    let button_filtro = document.getElementById("filtro-genero");
    let button_ver_mais = document.getElementById("lancamentos-ver-mais");
    let cards_escondidos = document.getElementById("mostrar_mais_cards");

    button_filtro.innerHTML = nome_genero

    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => {
            let str = '';
            cards_escondidos.style.display = "none";
            button_ver_mais.style.display = "none";

            for (let i = 0; i < data.results.length; i++) {
                let jogo = data.results[i]

                for (let j = 0; j < jogo.genres.length; j++) {
                    if(`${jogo.genres[j].name}`.toLowerCase().startsWith(genero.toLowerCase())){
                        str += exibir_card_game_lancamento (jogo, 0, '')
                        break;
                    }
                }
                
            }
            document.getElementById('pesquisa_cards').innerHTML = str
        }); 
}

function exibir_games_filtro_ordem (data, id, complemento) {
    let str = '';

    for (let i = 0; i < data.results.length; i++) {
        str += exibir_card_game_lancamento (data.results[i], id, complemento);
    }

    document.getElementById('pesquisa_cards').innerHTML = str

    return data;
}

function exibir_games_lancamentos(data, filtroBusca) {
    let str = '';
    let button_ver_mais = document.getElementById("lancamentos-ver-mais");
    let cards_escondidos = document.getElementById("mostrar_mais_cards");

    if (filtroBusca == '') {
        button_ver_mais.style.display = "inline";
        exibir_todos_lancamentos(data);

    } else {
        //Deixa o sistema de visualizacao de mais cards oculto
        cards_escondidos.style.display = "none";
        button_ver_mais.style.display = "none";

        //Pesquisa dos jogos
        for (let i = 0; i < data.results.length; i++) {
            let jogo = data.results[i]
            if(`${jogo.name}`.toLowerCase().startsWith(filtroBusca)){
                str += exibir_card_game_lancamento (jogo, 0, '')
            }
        }
        document.getElementById('pesquisa_cards').innerHTML = str
    }

    return data;
}

function exibir_resultado_pesquisa (data, pesquisa) {
    let str = ''
    let button_ver_mais = document.getElementById("lancamentos-ver-mais");
    let cards_escondidos = document.getElementById("mostrar_mais_cards");

    exibir_titulo_filtro_genero();
    exibir_titulo_filtro_ordem();
    cards_escondidos.style.display = "none";
    button_ver_mais.style.display = "none";

    for (let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i]
        str += exibir_card_game_lancamento (jogo, 1, pesquisa)
    }

    document.getElementById('pesquisa_cards').innerHTML = str

    return data;
}

function exibir_detalhes_games_lancamento (data, id) {
    let str = ''
    let i = data.results.findIndex (elem => elem.id == id)
    
    if (i != -1) {
        let jogo = data.results[i]
        str = `<div class="Informacoes">
                        <h1>${jogo.name}</h1>
                        <div class="especificacoes">
                            <p><strong>Plataformas disponíveis:</strong> ${jogo.platforms[0].platform.name}`
        
        for(let j = 1; j < jogo.platforms.length; j++) {
            str += `, ${jogo.platforms[j].platform.name}`
        }

        str += `</p>
                <p><strong>Gênero:</strong> ${jogo.genres[0].name}`

        for (let j = 1; j < jogo.genres.length; j++) {
            str+= `, ${jogo.genres[j].name}`
        }

        str +=         `</p>
                        <p><strong>Data de lançamento: </strong>${jogo.released}</p>
                        <p><strong>Avaliação: </strong>${jogo.rating}</p>
                    </div>
                </div>
                <div class="cartaz" style="background-image: url(${jogo.background_image});"><div class="filtro"></div></div>`
                            
        document.querySelector('#card').innerHTML = str   
    }
    else {
        document.querySelector('#card').innerHTML = `<div class="jogo-nao-encontrado">
                                                        <h1>Jogo não encontrado</h1>
                                                        <a href="./index.html">Voltar para Homepage</a>
                                                    </div>`
    }
}

/***************
 * PLATAFORMAS *
 ***************/
function exibir_plataformas (data) {
    let str = ''
    let index = 0

    //Inclusao de novo slide no corrousel
    for (let i = 0; i < 4; i++){
        str += `<div class="carousel-item row no-gutters`

        if (i == 0) {
            str += ` active">`
        } else {
            str += `">`
        }

        for (let j = 0; j < 4; j++) {
            let jogo = data.results[index]

            str += `<div class="col-3 float-left plataforma-slide-card">
                        <div class="plataforma-card-conteudo" style="background-image: url(${jogo.image_background});">
                            <div class="plataforma-card-titulo">
                                <h2 id="plataforma-titulo">${jogo.name}</h2>
                            </div>
                        </div>
                    </div>`
            
            index++;
        }

        str += `</div>`
    }
    
    document.getElementById('plataforma-cards').innerHTML = str
    return data;
}

/*************
 * PUBLISHER *
 *************/

function exibir_publisher () {
    fetch ('https://api.rawg.io/api/publishers?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => {
            let str = ''
            let index = 0

            //Inclusao de novo slide no corrousel
            for (let i = 0; i < 3; i++){
                str += `<div class="carousel-item row no-gutters`

                if (i == 0) {
                    str += ` active">`
                } else {
                    str += `">`
                }

                for (let j = 0; j < 4; j++) {
                    let jogo = data.results[index]
                    if (index < 10) {
                        str += `<div class="col-3 float-left publisher-slide">
                                    <div class="publisher-slide">
                                        <div class="publisher-card">
                                            <div class="publisher-card-banner" style="background-image: url(${jogo.image_background});">
                                                <div class="publisher-card-banner-filtro">
                                                    <h2>${jogo.name}</h2>
                                                </div>
                                            </div>
                                            
                                            <div class="publisher-card-conteudo"> 
                                                <h4>Jogos:</h3>
                                                
                                                <ul id="publisher-card-conteudo-topicos">`

                                                for (let k = 0; k < jogo.games.length; k++) {
                                                    str+=`<li>${jogo.games[k].name}</li>`
                                                }
                                                    
                                                str += `</ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                    }
                    index++;
                }

                str += `</div>`
            }
            
            document.getElementById('publisher-carousel-cards').innerHTML = str
        }); 
}
/***************
 * REQUISIÇÕES *
 ***************/
function requisicao_games_destaques () {
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17&ordering=-rating')
        .then(res => res.json ())
        .then(data => exibir_games_destaques(data)); 
}

function requisicao_games_lancamentos(filtroBusca){
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => exibir_games_lancamentos(data, filtroBusca)); 
}

function requisicao_plataformas(){
    fetch ('https://api.rawg.io/api/platforms?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => exibir_plataformas(data)); 
}

function requisicao_games_lancamento_pesquisa () {
    let barra_de_busca = document.getElementById("campo_buscar").value;

    fetch(`https://api.rawg.io/api/games?search=${barra_de_busca}&key=0ae278d26fd24463b3d3c454be18cb17`)
        .then(res => res.json())
        .then(data => exibir_resultado_pesquisa(data, barra_de_busca))
}

function requisicao_filtro_ordem (type, ordem, nome_ordem) {
    let button_filtro = document.getElementById("filtro-ordem");
    let button_ver_mais = document.getElementById("lancamentos-ver-mais");
    let cards_escondidos = document.getElementById("mostrar_mais_cards");
    let id = 0;
    let complemento = ``;
    let caminho = 'https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17&'
    
    button_filtro.innerHTML = nome_ordem;
    cards_escondidos.style.display = "none";
    button_ver_mais.style.display = "none";

    switch (type) {
        case 'rating':
            id = 2;
            complemento = ordem;
            caminho += `ordering=${ordem}`;
            break;
        case 'data':
            id = 3;
            caminho += `dates=2020-12-01,2021-12-19`;
            break;
    }
    
    fetch (caminho)
        .then(res => res.json ())
        .then(data => exibir_games_filtro_ordem(data, id, complemento));   
}

function requisicao_games_lancamento_detalhes (id, url_num, complemento) {
    let url = '';

    switch (url_num) {
        case 0:
            //url normal
            url = 'https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17';
            break;
        case 1:
            //url com pesquisa
            url = `https://api.rawg.io/api/games?search=${complemento}&key=0ae278d26fd24463b3d3c454be18cb17`;
            break;
        case 2:
            //url com filtro rating
            url = `https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17&ordering=${complemento}`;
            break;
        case 3:
            //url com filtro lancamento
            url = 'https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17&dates=2020-12-01,2021-12-19';
            break;
    }
    console.log(url)
    fetch (url)
        .then(res => res.json ())
        .then(data => exibir_detalhes_games_lancamento(data, id))
}

onload = () => {
    requisicao_games_destaques();
    requisicao_games_lancamentos('');
    requisicao_plataformas();
    exibir_publisher();
}