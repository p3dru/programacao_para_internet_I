const {Postagem, Microblog} = require('./classes');
const {selectAll} = require('./functions')
const {Pool} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
//const {v4: uuidv4} = require('uuid');
const ejs = require('ejs');

const app = express();

var posts = [];
var timelineInicial = 'Nenhum Post adicionado';
const postagens = new Microblog();
var contador = 0

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
    if (contador === 0){
        for (var i = 0; i < posts.length; i++){
            //carrega todos os posts para o objeto Miroblog
            postagens.create(posts[i]);
        }
    }

    //console.log(posts[9].postagem_id)

    //var dadoObtido = postagens.retrieve(10);
    //console.log(dadoObtido);
    //console.log(posts[0].postagem_id);

    
    contador +=  1;
    res.render("home", {
        allPosts: posts,
        initialMessage: timelineInicial
    });
    
});

app.get('/posts', function(req, res){
    selectAll()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        console.log('Erro na pesquisa: ', err);
    })
});

app.get('/posts/:id', function(req, res){
    var postId = req.params.id;
    //console.log(posts[postId]);
    //console.log(posts);
    res.render('post', {
        postTitle: posts[postId-1].postagem_title,
        postText: posts[postId-1].postagem_text,
        postLikes: posts[postId-1].postagem_likes,
        postId: posts[postId-1].postagem_id,
        postDate: posts[postId-1].postagem_date
    })
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

            selectAll()
                .then((result) =>{
                    posts.push(result);
                })
                .catch((err) => {
                    console.log('Erro na pesquisa: ', err);
                })
            //console.log(dadosJson[0].id);
            console.log(typeof(posts[posts.lenght].postagem_id))
            res.redirect('/posts/'+posts[posts.length].postagem_id);
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