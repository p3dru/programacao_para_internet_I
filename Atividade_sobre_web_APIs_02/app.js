const {Postagem, Microblog} = require('./classes');
const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');

const app = express();

const postagens = new Microblog();

const postagem1 = new Postagem(1, 'Arroz é maravilhoso', 24);
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
//const postagem7 = new Postagem(2, 'Feijão é vida', 39239);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//gets
app.get('/', function(req, res){
    res.sendFiles('public/index.html');
});

app.get('/posts', function(req, res){
    var dadosObtidos = postagens.retrieveAll();
    res.send(dadosObtidos);
});

app.get('/posts/:id', function(req, res){
    var postId = req.params.id;
    console.log(postId);


    var dadoObtido = postagens.retrieve(postId);
    if (dadoObtido !== '[]'){
        res.send(dadoObtido);   
    } else {
        res.status(404).send('Error 404');
    }
});

//delete
app.delete('/posts/:id', function(req, res){
    var postId = req.params.id
    console.log(postId);

    var dadosObtidos = postagens.retrieve(postId)

    if (dadosObtidos !== '[]'){
        postagens.delete(postId);
        res.status(204).send('No content');
    } else {
        res.status(404).send('Not found');
    }

});


//post
app.post('/posts', function(req, res){
    var conteudo = req.body.conteudo;
    
    //criar o JSON
    const jsonCriado = {
        id: uuidv4(),
        text: conteudo,
        likes: 0
    }
    console.log(jsonCriado);

    //adicionar ao microblog
    postagens.create(new Postagem(jsonCriado.id, jsonCriado.text, jsonCriado.likes));
    res.status(201).redirect(`/posts/`+jsonCriado.id);
    //res.send(postagens.retrieve(jsonCriado.id));

});

//put
app.put('/posts/:id', function(req, res){
    var postId = req.params.id;
    var novoConteudo = 'Minha postagem nova';
    var novoLike = 12345678;

    var dadosObtidos = postagens.retrieve(postId);
    console.log(dadosObtidos);
    if (dadosObtidos === '[]'){
        res.status(404).send('Not found');
    } else {
        var novoJson = {
            id: postId,
            text: novoConteudo,
            likes: novoLike
        }

        postagens.update(novoJson);
    }

    res.status(200).send('Success');
    //res.redirect('/posts');
});

//patch
app.patch('/posts/:id', function(req, res){
    const postId = req.params.id;
    const atualizacoes = req.body;

    var dadosObtidos = postagens.retrieve(postId);
    if (dadosObtidos === "[]"){
        res.status(404).send('Not found');
    } else {
        console.log(atualizacoes);
        var novoConteudo = ' milhao';
        
        atualizacoes.id = postId;
        atualizacoes.text = novoConteudo;
        atualizacoes.likes = 93203;
        console.log(atualizacoes)
        //postagens.update(atualizacoes);
        postagens.update(atualizacoes);

        res.status(200).send("Success");
    }
});

app.patch('/posts/:id/likes', function(req, res){
});

//listen
app.listen(3000, function(req, res){
    console.log('Server running on 3000');
})

