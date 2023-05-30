const {Postagem, Microblog} = require('./classes');
const {Pool} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
//const {v4: uuidv4} = require('uuid');
const ejs = require('ejs');

const app = express();

var posts = [];
var timelineInicial = 'Nenhum Post adicionado';
const postagens = new Microblog();

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: '',
    user: 'postgres',
    password: ''
})

//permite a renderização dos arquivos ejs
app.set('view engine', 'ejs');
//app.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

//busca todos os registros de postagem e atribui à posts cada registro encontrado
pool.query('select * from postagem')
    .then((result) => {
        var dados = result.rows;
        var dadosJson = JSON.stringify(dados);
        //transforma os registros em json
        dadosJson = JSON.parse(dadosJson);
        //console.log(typeof(dadosJson));
        //console.log(dadosJson.length);
        //res.send(dadosJson);
        dadosJson.forEach(element => {
            //insere cada postagem no posts
            posts.push(element);           
        });

        //console.log(posts);

    })
    .catch((err) => {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({error: "erro ao buscar dados"});
    });

//gets
app.get('/', function(req, res){
    console.log(posts);
    res.render("home", {
        allPosts: posts,
        initialMessage: timelineInicial
    });

});

app.get('/posts', function(req, res){
    const pool = req.pool;

    pool.query('select * from postagem')
    .then((result) => {
        var dados = result.rows;
        var dadosJson = JSON.stringify(dados);
        dadosJson = JSON.parse(dadosJson);
        //console.log(typeof(dadosJson));
        //console.log(dadosJson[0]);
        res.send(dadosJson);
    })
    .catch((err) => {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({error: "erro ao buscar dados"});
    });
});

app.get('/posts/:id', function(req, res){
    //retorna um json com o id pesquisado
    var postId = req.params.id;
    //console.log(postId);

    var dadoObtido = postagens.retrieve(postId);
    //console.log(typeof(dadoObtido));
    if (dadoObtido !== '[]'){
        dadoObtido = JSON.parse(dadoObtido);
        res.render('post', {
            postTitle: dadoObtido.title,
            postText: dadoObtido.text,
            postLikes: dadoObtido.likes,
            postDate: dadoObtido.date
        });
    } else {
        res.status(404).send('Error 404');
    }
});

app.get('/create', function(req, res){
    res.render('create');
})


app.get('/api/posts', function(req, res){
    pool.query('select * from postagem')
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.error('Erro ao executar a consulta', err);
            res.status(500).json({error: "erro ao buscar dados"});
        });
});



//delete
app.delete('/posts/:id', function(req, res){
    var postId = req.params.id;
    //console.log(postId);

    var dadoObtido = postagens.retrieve(postId);

    if (dadoObtido !== '[]'){
        postagens.delete(postId);
        res.status(204).send('No content');
    } else {
        res.status(404).send('Not Found');
    }
});

//post
app.post('/create', function(req, res){
    const pool = req.pool;

    var postTitle = req.body.title;
    var postText = req.body.text;

    const newPost = {
        id: '',
        title: postTitle,
        text: postText,
        likes: 0,
        date: 'current_timestamp(0)'
    }
    //console.log(newPost);

    //postagens.create(new Postagem(newPost.id, newPost.title, newPost.text, newPost.likes, newPost.date));
    //console.log(newPost.title);
    //console.log(typeof(newPost.title));

    pool.query(`select inserir_retornar_id('${newPost.title}', '${newPost.text}', ${newPost.likes}, ${newPost.date}) as id`)
        .then((result) => {
            //res.write('Dados inseridos com sucesso');
            console.log('Dados inseridos com sucesso');
            var dados = result.rows;
            var dadosJson = JSON.stringify(dados);
            dadosJson = JSON.parse(dadosJson);

            var novoId = dadosJson[0].id;
            //console.log(dadosJson[0].id);
            res.redirect('/posts/'+ novoId);
        })
        .catch((err) => {
            console.error('Erro ao inserir dados: ', err);
            res.status(500).json({ error: 'Erro ao inserir dados' });
        });
    
    
    //posts.push(newPost);
    //console.log(postagens);
    //res.status(201).redirect('/posts/'+newPost.id);
});

//put
app.put('posts/:id', function(req, res){
    //CRIAR UM LOCAL PARA RECEBER O ID e altera a postagem
    var postId = req.params.id;
    var newTitle = 'Novo titulo';
    var newText = 'Novo texto';
    var newLike = 768;
    var actualDate = getTimestamp();

    var dataObtained = postagens.retrieve(postId);
    //console.log(dataObtained);
    if (dataObtained === '[]'){
        res.status(404).send('Not found');
    } else {
        var actualPost = {
            id: postId,
            title: newTitle,
            text: newText,
            likes: newLike,
            date: actualDate
        };

        postagens.update(actualPost);
    }

    res.status(200).send('Success');
});

//patch
app.patch('/posts/:id', function(req, res){
    const postId = req.params.id;
    const updates = req.body;

    var dataObtained = postagens.retrieve(postId);
    if (dataObtained === "[]"){
        res.status(404).send('Not found');
    } else {
        console.log(updates);

        var newText = 'Novo texto';
        
        updates.text = newText;
        updates.date = getTimestamp();

        postagens.update(updates);

        res.status(200).send('Success');
    }
});

app.patch('posts/:id/likes', function(req, res){
    const postId = req.params.id;
    const updates = req.body;

    var dataObtained = postagens.retrieve(postId);
    if (dataObtained === '[]'){
        res.status(404).send('Not found');
    } else {
        var dataObtained = JSON.parse(dataObtained);
        console.log(dataObtained);
        dataObtained.likes += 1;
        console.log(dataObtained);
        res.status(200).send('Updated');
    }
});


app.listen(3000, function(req, res){
    console.log('Server running on 3000');
})