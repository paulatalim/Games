function exibir_games_destaques(data) {
    let str = ''
    for (let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i]
        let title = `${jogo.name}`
        
        str += `<div class="col-lg-3 col-md-4 col-sm-12 card" style="background-image: url(${jogo.background_image});">
                    <div class="card-conteudo">
                        <h5>${jogo.name}</h5>
                        <div class="info-card">
                            
                                <p>Avaliação: ${jogo.rating}</p>
                                <p>Lançamento: ${jogo.released}</p>
                            
                                <div><a id="lancamento-maisDetalhe" href="./detalhes.html?id=${jogo.id}">Mais Detalhes...</a></div>
                        </div>
                    </div>
                </div>`
            
    }
    document.getElementById('pesquisa_cards').innerHTML = str
    return data;
}

/***************
 * LANCAMENTOS *
 ***************/

function barra_de_busca(){
    var barra_de_busca = document.getElementById("campo_buscar").value;
    requisicao_games_lancamentos(barra_de_busca.toLowerCase())
}

function exibir_games_lancamentos(data, filtroBusca) {
    let str = ''
    for (let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i]
        let title = `${jogo.name}`
        if(`${jogo.name}`.toLowerCase().startsWith(filtroBusca)){
            str += `<div class="col-lg-3 col-md-4 col-sm-12 card" style="background-image: url(${jogo.background_image});">
                        <div class="card-conteudo">
                            <h5>${jogo.name}</h5>
                            <div class="info-card">
                                
                                    <p>Avaliação: ${jogo.rating}</p>
                                    <p>Lançamento: ${jogo.released}</p>
                                
                                    <div><a id="lancamento-maisDetalhe" href="./detalhes.html?id=${jogo.id}">Mais Detalhes...</a></div>
                            </div>
                        </div>
                    </div>`
            }
    }
    document.getElementById('pesquisa_cards').innerHTML = str
    return data;
}

function exibir_detalhes_games_lancamento (data, id) {
    let str = ''
    let i = data.results.findIndex (elem => elem.id == id)
    
    if (i != -1) {
        let jogo = data.results[i]
        let str = `<div class="Informacoes">
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

function requisicao_games_lancamentos(filtroBusca){
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => exibir_games_lancamentos(data, filtroBusca)); 
}

function requisicao_games_lancamento_detalhes (id) {
    fetch ('https://api.rawg.io/api/games?key=0ae278d26fd24463b3d3c454be18cb17')
        .then(res => res.json ())
        .then(data => exibir_detalhes_games_lancamento(data, id))
}

onload = () =>{
    requisicao_games_lancamentos('');
}