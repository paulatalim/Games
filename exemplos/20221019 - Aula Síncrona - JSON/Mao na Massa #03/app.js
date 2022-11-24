const dbMock = {
    pets: [ 
        { id: 1, 
          nome: 'Amora', 
          descricao: 'Magni deleniti odio commodi tempora, corporis explicabo.', 
          estado: 'MG', 
          cidade: 'Belo Horizonte', 
          idEspecie: 2, 
          imagem: 'https://source.unsplash.com/random/120x120?animals&1' 
        }, 
        { id: 2, nome: 'Bento', descricao: 'Illo dicta accusantium praesentium incidunt qui doloremque rerum! ', estado: 'MG', cidade: 'Betim', idEspecie: 2, imagem: 'https://source.unsplash.com/random/120x120?animals&2' }, 
        { id: 3, nome: 'Billy', descricao: 'Velit sint perferendis rem, consequatur adipisci deleniti cum officiis rerum ', estado: 'SP', cidade: 'São Paulo', idEspecie: 2, imagem: 'https://source.unsplash.com/random/120x120?animals&3' }, 
        { id: 4, nome: 'Biscoito', descricao: 'Facilis ab animi explicabo vitae voluptates accusamus dolore atque? ', estado: 'RJ', cidade: 'Magé', idEspecie: 1, imagem: 'https://source.unsplash.com/random/120x120?animals&4' }, 
        { id: 5, nome: 'Bob', descricao: 'Error dolores eius dignissimos animi molestias quidem enim officiis minus non, ullam ab, odit cupiditate aspernatur at id.', estado: 'SP', cidade: 'São Paulo', idEspecie: 1, imagem: 'https://source.unsplash.com/random/120x120?animals&5' }  
    ],

    especies: [
        { id: 1, descricao: 'Gato' },
        { id: 2, descricao: 'Cachorro' },
        { id: 3, descricao: 'Roedores' },
        { id: 4, descricao: 'Coelhos' },
    ]
}
let db = JSON.parse (localStorage.getItem('dbPets'))
if (!db) {
    db = dbMock
}

let FILTRO_ESPECIE = 0
let FILTRO_ESTADO = ""

function getDescricaoEspecie (id) {
    let idx = db.especies.findIndex (elem => elem.id == id)
    if (idx != -1)
        return db.especies[idx].descricao
    else    
        return 'Não identificado'
}

function alteraImagem (event) {

}

function exibePets () {
    let str = ''
    for (let i=0; i < db.pets.length; i++) {
        let pet = db.pets[i]
        if (  ((FILTRO_ESPECIE == 0) || pet.idEspecie == FILTRO_ESPECIE) &&  
              ((FILTRO_ESTADO == "") || pet.estado == FILTRO_ESTADO)) {
            str += `<div class="card col-md-4" >
            <img src="${pet.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${pet.nome}</h5>
              <p class="card-text"><span class="text-danger">${getDescricaoEspecie(pet.idEspecie)}</span><br>
              ${pet.descricao}</p>
              <a href="exibe_pet.html?id=${pet.id}" class="btn btn-primary">Mais detalhes</a>
            </div>
          </div>`
        }
    }
    document.querySelector('#tela').innerHTML = str
}

function exibePet (id) {
    let idx = db.pets.findIndex (elem => elem.id == id)
    if (idx != -1) {
        let pet = db.pets[idx]
        let str = `<div class="card col-md-4" >
            <img src="${pet.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${pet.nome}</h5>
                <p class="card-text"><span class="text-danger">${getDescricaoEspecie(pet.idEspecie)}</span><br>
                ${pet.descricao}</p>
            </div>
            </div>`
    
        document.querySelector('#tela').innerHTML = str    
    }
    else {
        document.querySelector('#tela').innerHTML = '<h1>Pet não encontrado</h1>'    
    }

}

function alterarImagem (id, imageURI) {    
    let idx = db.pets.findIndex (elem => elem.id == id)
    if (idx != -1) {
        db.pets[idx].imagem = imageURI
        localStorage.setItem('dbPets', JSON.stringify (db))
    }
}