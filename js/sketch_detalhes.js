onload = () => {
    const urlParams = new URLSearchParams(location.search);
    let idJogo = parseInt(urlParams.get('id'))
    let num_url = parseInt(urlParams.get('num'))
    let complemento = urlParams.get('adicional')
    requisicao_games_lancamento_detalhes (idJogo, num_url, complemento)
}