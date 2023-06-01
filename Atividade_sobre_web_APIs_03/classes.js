const {Pool} = require('pg');

class Postagem{
    constructor(id, title, text, likes, date){
        this.id = id;
        this.title = title;
        this.text = text;
        this.likes = likes;
        this.date = date;
    }
}

class Microblog{
    constructor(){
        this.postagens = [];
    }

    create(postagem){
        //cria uma postagem adicionando ela ao array de postagens
        this.postagens.push(postagem);
    }

    retrieve(id){
        
    }

    update(postagem){
        //busca uma postagem por id e torna a postagem recebida, a postagem com o id passado
        var id = postagem.id;
        
        for (var i = 0; i < this.postagens.length; i++){
            if (id == this.postagens[i].id){
                this.postagens[i] = postagem;
            }
        }
    }

    delete(id){
        //filtra todas as postagens e retorna apenas aquelas que não tem o id passado
        this.postagens = this.postagens.filter((postagem) => postagem.id != id);
    }

    retrieveAll(){
        //busca todos os posts e armazena cada um deles em um array que ao final se transformará em um json
        var dados = [];

        if (this.postagens.length > 0){
            this.postagens.forEach((postagem) => {
                dados.push(this.makeJSON(postagem));
            });
        } else {
            dados = [];
        }

        const json = JSON.stringify(dados);
        //console.log(json);
        return json;
    }

    makeJSON(postagem){
        var dados = {
            id: postagem.id,
            title: postagem.title,
            text: postagem.text,
            likes: postagem.likes,
            date: postagem.date
        }

        return dados;
    }

}


module.exports = {Postagem, Microblog}