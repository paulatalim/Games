onload = () => {
    const urlParams = new URLSearchParams(location.search);
    let idJogo = parseInt(urlParams.get('id'))
    exibirGame (idJogo)
}