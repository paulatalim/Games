/*** Variaveis globais */
let link = 'https://api.rawg.io/api/';
let chave = '0ae278d26fd24463b3d3c454be18cb17';

/*************
 * DESTAQUES *
 *************/
function exibir_games_destaques(data) {
    var str = '';

    //Inclusao de novo slide no corrousel
    for (var i = 0; i < 3; i++){
        var jogo = data.results[i]
        let lancamento;

        if(jogo.released != null) {
            lancamento = jogo.released.split("-");
        }

        str+='<div class="carousel-item';

        if (i == 0) {
            str += ' active';
        }

        str += `"><div class="slide-destaque" style="background-image: url(${jogo.background_image});">
                    <div class="destaque-filtro-image">
                        <div class="col-lg-5 col-9 destaque-conteudo">
                            <h1>${jogo.name}</h1>
                            <p id="destaque-conteudo-detalhamento">`
                                
        if(jogo.released != null) {
            str += `<strong>Lançamento:</strong> ${lancamento[2]}/${lancamento[1]}/${lancamento[0]}<br>`
        }

        str += `<strong>Plataformas:</strong> ${jogo.platforms[0].platform.name}`
                                
        //Coloca as plataformas
        for (var j = 1; j < jogo.platforms.length; j++) {
            str += `, ${jogo.platforms[j].platform.name}`
        }

        str += `<br><strong>Avaliação:</strong> ${jogo.rating}</p></div></div></div></div>`
    }

    document.getElementById('destaque-slide').innerHTML = str;
    requisicao_games_jogos('');

    document.querySelector('.destaque-carregamento').style.display = "none";
    document.querySelector('.destaque-carousel').style.display = 'block';
    document.querySelector('.jogos').style.display = "flex";
    
    return data;
}

/*********
 * JOGOS *
 *********/
/*** Exibe os cards ***/
function exibir_card_game_jogo (jogo, id, complemento) {
    var str = '';
    var data;

    if (jogo.released != null) {
        data = jogo.released.split("-");
    }
    
    str = `<div class="col-lg-3 col-md-4 col-sm-6 col-s-12 area-card">
                <div class="card" style="background-image: url(${jogo.background_image});">
                    <div class="card-conteudo">
                        <h5>${jogo.name}</h5>
                        <div class="info-card">
                            
                                <p>Avaliação: ${jogo.rating}</p>`
                                if (jogo.released != null) {
                                    str += `<p>Lançamento: <span id="jogo-card-info-jogo">${data[2]}/${data[1]}/${data[0]}</span></p>`
                                }

    str += `<div><a id="jogo-maisDetalhe" href="./detalhes.html?id=${jogo.id}&num=${id}&adicional=${complemento}">Mais Detalhes...</a></div>
            </div></div></div></div>`

    return str
}

function exibir_todos_jogos (data) {
    var qnt_cards_exibidos = 0;
    var viewport = window.screen.width;

    //Deixa o layout responsivo
    if (viewport >= 992) {
        qnt_cards_exibidos = 8;
    } else if (viewport >= 576) {
        qnt_cards_exibidos = 6;
    } else {
        qnt_cards_exibidos = 3;
    }

    var str = '';

    //Exibe cards em destaque
    for (var i = 0; i < qnt_cards_exibidos; i++) {
        var jogo = data.results[i];
        str += exibir_card_game_jogo(jogo, 0, '');
    }

    document.getElementById('pesquisa_cards').innerHTML = str;

    str = '';

    for (var i = qnt_cards_exibidos; i < data.results.length; i++) {
        var jogo = data.results[i];
        str += exibir_card_game_jogo(jogo, 0, '');
    }
    
    document.getElementById('mostrar_mais_cards').innerHTML = str;
    
    return data;
}

function ver_mais_jogos() {
    var cards_escondidos = document.getElementById("mostrar_mais_cards");
    var icone = document.getElementById("jogos-ver-mais-icone");
    var btn_txt = document.getElementById("jogos-ver-mais-text");

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

function exibir_games_jogos(data, filtroBusca) {
    var str = '';
    var button_ver_mais = document.getElementById("jogos-ver-mais");
    var cards_escondidos = document.getElementById("mostrar_mais_cards");

    if (filtroBusca == '') {
        button_ver_mais.style.display = "inline";
        exibir_todos_jogos(data);

    } else {
        //Deixa o sistema de visualizacao de mais cards oculto
        cards_escondidos.style.display = "none";
        button_ver_mais.style.display = "none";

        //Pesquisa dos jogos
        for (var i = 0; i < data.results.length; i++) {
            var jogo = data.results[i]
            if(`${jogo.name}`.toLowerCase().startsWith(filtroBusca)){
                str += exibir_card_game_jogo (jogo, 0, '')
            }
        }
        document.getElementById('pesquisa_cards').innerHTML = str
    }

    document.getElementById('jogos-carregamento').style.display = "none";
    document.getElementById('pesquisa_cards').style.display = "flex";
    requisicao_plataformas();
    document.getElementById('div-ondas').style.display = "block";
    document.querySelector('.plataformas').style.display = "flex";

    return data;
}

/*** Filtros ***/
function exibir_titulo_filtro_genero() {
    document.getElementById("filtro-genero").innerHTML ="Genero";
}

function exibir_titulo_filtro_ordem() {
    document.getElementById("filtro-ordem").innerHTML = "Ordem";
}

function filtrar_genero(genero, nome_genero) {
    var button_filtro = document.getElementById("filtro-genero");
    var button_ver_mais = document.getElementById("jogos-ver-mais");
    var cards_escondidos = document.getElementById("mostrar_mais_cards");

    button_filtro.innerHTML = nome_genero

    fetch (`${link}games?key=${chave}`)
        .then(res => res.json ())
        .then(data => {
            var str = '';
            cards_escondidos.style.display = "none";
            button_ver_mais.style.display = "none";

            for (var i = 0; i < data.results.length; i++) {
                var jogo = data.results[i]

                for (var j = 0; j < jogo.genres.length; j++) {
                    if(`${jogo.genres[j].name}`.toLowerCase().startsWith(genero.toLowerCase())){
                        str += exibir_card_game_jogo (jogo, 0, '')
                        break;
                    }
                }
                
            }
            document.getElementById('pesquisa_cards').innerHTML = str
        }); 
}

function exibir_games_filtro_ordem (data, id, complemento) {
    var str = '';

    for (var i = 0; i < data.results.length; i++) {
        str += exibir_card_game_jogo (data.results[i], id, complemento);
    }

    document.getElementById('pesquisa_cards').innerHTML = str

    return data;
}

/*** Pesquisa ***/
function barra_de_busca(){
    var barra_de_busca = document.getElementById("campo_buscar").value;

    exibir_titulo_filtro_genero();
    exibir_titulo_filtro_ordem();
    requisicao_games_jogos(barra_de_busca.toLowerCase())
}

function exibir_resultado_pesquisa (data, pesquisa, origem) {
    var str = ''
    var button_ver_mais = document.getElementById("jogos-ver-mais");
    var cards_escondidos = document.getElementById("mostrar_mais_cards");
    var mensagem_nenhum_jogo_encontrado = document.querySelector (".jogos-nenhum-encontrado");
    var sessao_cards = document.getElementById('pesquisa_cards');
    var repeticao;

    exibir_titulo_filtro_genero();
    exibir_titulo_filtro_ordem();
    cards_escondidos.style.display = "none";
    button_ver_mais.style.display = "none";

    if (data.results.length == 0) {
        mensagem_nenhum_jogo_encontrado.style.display = "flex";
        sessao_cards.style.display = "none";
    } else {
        if (origem === 1) {
            repeticao = 4;
        } else {
            repeticao = data.results.length
        }

        for (var i = 0; i < repeticao; i++) {
            var jogo = data.results[i]
            str += exibir_card_game_jogo (jogo, 1, pesquisa)
        }

        sessao_cards.innerHTML = str;
    }
    
    return data;
}

//Ativa o botao enter
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        requisicao_games_jogo_pesquisa(0)
    }
})

/*** Detalhes ***/
function exibir_detalhes_games_jogo (data, id) {
    var str = ''
    var i = data.results.findIndex (elem => elem.id == id)
    
    if (i != -1) {
        var jogo = data.results[i]
        str = `<div class="Informacoes">
                        <h1>${jogo.name}</h1>
                        <div class="especificacoes">
                            <p><strong>Plataformas disponíveis:</strong> ${jogo.platforms[0].platform.name}`
        
        for(var j = 1; j < jogo.platforms.length; j++) {
            str += `, ${jogo.platforms[j].platform.name}`
        }

        str += `</p>
                <p><strong>Gênero:</strong> ${jogo.genres[0].name}`

        for (var j = 1; j < jogo.genres.length; j++) {
            str+= `, ${jogo.genres[j].name}`
        }

        str +=         `</p>
                        <p><strong>Data de lançamento: </strong>${jogo.released}</p>
                        <p><strong>Avaliação: </strong>${jogo.rating}</p>
                    </div>
                </div>
                <div class="cartaz" style="background-image: url(${jogo.background_image});"><div class="filtro"></div></div>`
                            
        document.querySelector('#card').innerHTML = str;
    }
    else {
        document.querySelector('#card').style.display = 'none';
        document.querySelector('.jogo-nao-encontrado').style.display = 'flex';
    }
}

/***************
 * PLATAFORMAS *
 ***************/
function exibir_plataformas (data) {
    var str = ''
    var index = 0

    //Inclusao de novo slide no corrousel
    for (var i = 0; i < Math.ceil(data.results.length/4); i++){
        str += `<div class="carousel-item`

        if (i == 0) {
            str += ` active`
        }

        str += '"><div class="plataforma-slide">'

        for (var j = 0; j < 4; j++) {
            var jogo = data.results[index]

            if (index >= data.results.length) {
                break;
            }

            var background = `background-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%), url(${jogo.image_background});`;

            str += ` <div class="col-12 col-sm-6 col-md-6 col-lg-3"> <div class=" plataforma-area-card">
                <div class="image-flip" >
                    <div class="mainflip flip-0">
                        <div class="frontside">
                            <div class="plataforma-card">
                                <div class="plataforma-card-frontside">
                                    <div class="plataforma-card-frontside-conteudo" style="${background}">
                                        <h2 id="plataforma-titulo-frontside">${jogo.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="backside">
                            <div class="plataforma-card">
                                <div class="plataforma-card-backside" style="${background}">
                                    <div class="plataforma-card-backside-content">
                                        <h2 id="plataforma-titulo-backside">${jogo.name}</h2>
                                        <div class="plataforma-card-backside-jogos">
                                            <h3>Jogos:</h3>
                                            <ul id="plataforma-card-backside-topicos">`

            for (var k = 0; k < 3 && k < jogo.games.length; k++) {
                str+=`<li>${jogo.games[k].name}</li>`
            }
                                            
            str+= `</ul></div></div></div></div></div></div></div></div></div>`
            
            index++;
        }

        str += `</div></div>`
    }
    
    document.querySelector('.plataforma-area-slide').innerHTML = str;
    document.getElementById('plataforma-carregamento').style.display = 'none';
    document.getElementById('plataformas').style.display = 'block'
    document.getElementById('plataforma-carousel').style.display = 'flex';
    requisicao_publisher();
    document.querySelector('.publisher').style.display = 'flex';
    
    return data;
}

function requisicao_plataformas(){
    fetch (`${link}platforms?key=${chave}`)
        .then(res => res.json ())
        .then(data => exibir_plataformas(data)); 
}

/*************
 * PUBLISHER *
 *************/

function exibir_publisher (data) {
    var str = '';
    var index = 0;

    //Inclusao de novo slide no corrousel
    for (var i = 0; i < Math.ceil(data.results.length/4); i++){
        str += `<div class="carousel-item`

        if (i == 0) {
            str += ` active`
        }
        
        str += `"><div class="publisher-slide">`

        for (var j = 0; j < 4; j++) {
            var jogo = data.results[index];

            if (index < data.results.length) {
                var background = `background-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%), url(${jogo.image_background});`;

                str += `<div class="col-12 col-sm-6 col-md-6 col-lg-3 publisher-area-card">
                            <div class="publisher-card">
                                <div class="publisher-card-banner" style="${background}">
                                    <h2 id="publisher-card-title">${jogo.name}</h2>
                                </div>
                                
                                <div class="publisher-card-conteudo"> 
                                    <h5>Jogos:</h5>
                                    <ul id="publisher-card-conteudo-topicos">`

                for (var k = 0; k < jogo.games.length && k < 3; k++) {
                    str+=`<li>${jogo.games[k].name}</li>`
                }
                                        
                str += `</ul></div></div></div>`
            }
            index++;
        }

        str += `</div></div>`
    }
            
    document.querySelector('.publisher-area-slide').innerHTML = str;

    document.getElementById('publisher').style.display = 'block';
    document.getElementById('publisher-carregamento').style.display = 'none'
    document.getElementById('publisher-carousel').style.display = 'flex'
    document.querySelector('.sobre').style.display = 'flex';
   
    return data;
}

function requisicao_publisher () {
    fetch (`${link}publishers?key=${chave}`)
        .then(res => res.json ())
        .then(data => exibir_publisher(data));
}

/***************
 * REQUISIÇÕES *
 ***************/
function requisicao_games_destaques () {
    fetch (`${link}games?key=${chave}&ordering=-rating`)
        .then(res => res.json ())
        .then(data => exibir_games_destaques(data)); 
}

function requisicao_games_jogos(filtroBusca){
    if (filtroBusca == '') {
        fetch (`${link}games?key=${chave}`)
            .then(res => res.json ())
            .then(data => exibir_games_jogos(data, filtroBusca)); 
    } else {
        fetch(`${link}games?search=${filtroBusca}&key=${chave}`)
            .then(res => res.json())
            .then(data => exibir_resultado_pesquisa(data, filtroBusca, 1))
            
    }
    
}

function requisicao_games_jogo_pesquisa (origem) {
    var barra_de_busca = document.getElementById("campo_buscar").value;

    fetch(`${link}games?search=${barra_de_busca}&key=${chave}`)
        .then(res => res.json())
        .then(data => exibir_resultado_pesquisa(data, barra_de_busca, origem))
}

function requisicao_filtro_ordem (type, ordem, nome_ordem) {
    var button_filtro = document.getElementById("filtro-ordem");
    var button_ver_mais = document.getElementById("jogos-ver-mais");
    var cards_escondidos = document.getElementById("mostrar_mais_cards");
    var id = 0;
    var complemento = ``;
    var caminho = `${link}games?key=${chave}&`
    
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

function requisicao_games_jogo_detalhes (id, url_num, complemento) {
    var url = '';

    switch (url_num) {
        case 0:
            //url normal
            url = `${link}games?key=${chave}`;
            break;
        case 1:
            //url com pesquisa
            url = `${link}games?search=${complemento}&key=${chave}`;
            break;
        case 2:
            //url com filtro rating
            url = `${link}games?key=${chave}&ordering=${complemento}`;
            break;
        case 3:
            //url com filtro jogo
            url = `${link}games?key=${chave}&dates=2020-12-01,2021-12-19`;
            break;
    }
    
    fetch (url)
        .then(res => res.json ())
        .then(data => exibir_detalhes_games_jogo(data, id))
}

function limpar_pesquisa () {
    document.getElementById('jogos-btn-limpar-pesquisa').style.display = "none";
    document.getElementById('campo_buscar').value = '';
    requisicao_games_jogos('');
    console.log('1')
}

/*******************
 * ANIMACAO SCROLL *
 *******************/
const animeScroll = () => {
    const window_top = window.pageYOffset + window.innerHeight * 0.85;
    const item = document.querySelectorAll("[data-anime]");
    
    item.forEach((element) => {
        if (window_top > element.offsetTop) {
            element.classList.add("animate");
        } else {
            element.classList.remove("animate")
        }
    })
}

onload = () => {
    requisicao_games_destaques();

    //Filtro Ordem
    document.getElementById('item-filtro-ordem-nenhum').onclick = () => {
        requisicao_games_jogos('');
        exibir_titulo_filtro_ordem();
    };
    document.getElementById('item-filtro-ordem-mais-papular').onclick = () => requisicao_filtro_ordem('rating', '-rating', 'Mais popular');
    document.getElementById('item-filtro-ordem-menos-popular').onclick = () => requisicao_filtro_ordem('rating', 'rating', 'Menos popular');
    document.getElementById('item-filtro-ordem-lancamento').onclick = () => requisicao_filtro_ordem('data', '', 'Lançamentos');

    //Filtro Gener
    document.getElementById('item-filtro-genero-nenhum').onclick = () => {
        requisicao_games_jogos('');
        exibir_titulo_filtro_genero();
    };
    document.getElementById('item-filtro-genero-acao').onclick = () => filtrar_genero('Action', 'Ação');
    document.getElementById('item-filtro-genero-aventura').onclick = () => filtrar_genero('Adventure', 'Aventura');
    document.getElementById('item-filtro-genero-plataforma').onclick = () => filtrar_genero('platformer', 'Plataforma');
    document.getElementById('item-filtro-genero-indie').onclick = () => filtrar_genero('indie', 'Indie');
    document.getElementById('item-filtro-genero-rpg').onclick = () => filtrar_genero('RPG', 'RPG');
    document.getElementById('item-filtro-genero-puzzle').onclick = () => filtrar_genero('Puzzle', 'Quebra-Cabeça');
    document.getElementById('item-filtro-genero-shooter').onclick = () => filtrar_genero('Shooter', 'Shooter');
    
    //Campo de busca pesquisa
    document.getElementById('campo_buscar').onfocus = () => {
        document.getElementById('jogos-btn-limpar-pesquisa').style.display = "inline";
    };
    document.getElementById('campo_buscar').oninput = () => barra_de_busca();
    document.getElementById('jogos-btn-limpar-pesquisa').onclick = () => limpar_pesquisa();
    document.getElementById('jogos-btn-pesquisar').onclick = () => requisicao_games_jogo_pesquisa(0);

    document.querySelector('.jogos-nenhum-encontrado-btn').onclick = () => {
        document.getElementById('pesquisa_cards').style.display = "flex";
        document.querySelector (".jogos-nenhum-encontrado").style.display = "none";
        requisicao_games_jogos('');
        limpar_pesquisa();
    }

    /* Animacao scroll */
    window.onscroll = animeScroll;
}