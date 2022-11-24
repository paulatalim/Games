let bancoContatos =  JSON.parse(localStorage.getItem("contatos"));

if(!bancoContatos){

    bancoContatos = [
        {
            "nomeContato": "João",
            "cidadeContato": "BH",
            "telContato": "999-999-999"
        },
        {
            "nomeContato": "Maria",
            "cidadeContato": "BH",
            "telContato": "998-998-998"
        }
    ]
}

function limparForm(){
    document.getElementById("nome").value="";
    document.getElementById("cidade").value="";
    document.getElementById("telefone").value="";
}


function filtro(){
    var filtro = document.getElementById("textoFiltro").value;
    exibirContatos(filtro.toLowerCase())
}

function cadastrarNovo(){
    var nome = document.getElementById("nome").value;
    var cidade = document.getElementById("cidade").value;
    var telefone = document.getElementById("telefone").value;

    var novoContato = {
        "nomeContato": nome,
        "cidadeContato": cidade,
        "telContato": telefone
    }

    bancoContatos.push(novoContato);
    localStorage.setItem("contatos",  JSON.stringify(bancoContatos));
    limparForm();
    exibirContatos('');
}

function exibirContatos(filtroBusca){

    var strCard = "";

    for (let index = 0; index < bancoContatos.length; index++) {
        const contato = bancoContatos[index];
        if(contato.nomeContato.toLowerCase().startsWith(filtroBusca)){
            strCard += ` <div class="card mx-2 my-1 col-sm-3" >
                            <img src="https://source.unsplash.com/random/?people/${index}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${contato.nomeContato}</h5>
                            <p class="card-text">${contato.cidadeContato}</p>
                            <p class="card-text">Telefone: ${contato.telContato}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>`
        }
    }
    document.querySelector('#tela').innerHTML = strCard;
}

onload = () =>{
    exibirContatos('');
}
