onload = () => {
    const urlParams = new URLSearchParams(location.search);
    let idJogo = parseInt(urlParams.get('id'))
    requisicao_games_lancamento_detalhes (idJogo)
}