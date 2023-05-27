class Postagem{
    constructor(id, text, likes){
        this.id = id;
        this.text = text;
        this.likes = likes;
    }
}

class Microblog{
    constructor(){
        this.postagens = [];
    }

    create(postagem){
        this.postagens.push(postagem);
    }

    retrieve(id){
        var dados = [];
        for (var i = 0; i < this.postagens.length; i++){
            if (id == this.postagens[i].id){
                dados = this.makeJSON(this.postagens[i]);
            }
        }

        const json = JSON.stringify(dados);
        return json;
    }

    update(postagem){
        var id = postagem.id;
        for (var i = 0; i < this.postagens.length; i++){
            if (id == this.postagens[i].id){
                this.postagens[i] = postagem;
            }
        }
    }

    delete(id){
        this.postagens = this.postagens.filter((postagem) => postagem.id != id);   
    }

    retrieveAll(){
        var dados = [];
        if (this.postagens.length > 0){
            this.postagens.forEach((postagem) => {
                dados.push(this.makeJSON(postagem));
            });
        } else {
            dados = [];
        }

        //console.log(dados);
        
        const json = JSON.stringify(dados);
        console.log(json);
        return json;
    }

    makeJSON(postagem){
        var dados = {
            id: postagem.id,
            conteudo: postagem.text,
            likes: postagem.likes
        };

        return dados;
    }
}

//const postagens = new Microblog();

/*const postagem1 = new Postagem(1, 'Arroz é maravilhoso', 24);
postagens.create(postagem1);
const postagem2 = new Postagem(2, 'Feijão é maravilhoso', 3);
postagens.create(postagem2);
const postagem3 = new Postagem(3, 'Nhoque é maravilhoso', 45);
postagens.create(postagem3);
const postagem4 = new Postagem(4, 'Arroz é preto', 314);
postagens.create(postagem4);
const postagem5 = new Postagem(5, 'Arroz é racista', 354);
postagens.create(postagem5);
const postagem6 = new Postagem(6, 'Arroz é tiranossauro', 1334);
postagens.create(postagem6);
const postagem7 = new Postagem(2, 'Feijão é vida', 39239);
*/
//postagens.retrieveAll();

//postagens.delete(1);

//postagens.retrieveAll();

//var postagemSelecionada = postagens.retrieve(1);
//console.log(postagemSelecionada);

//postagens.update(postagem7);

//postagens.retrieveAll();

module.exports = {Postagem, Microblog};