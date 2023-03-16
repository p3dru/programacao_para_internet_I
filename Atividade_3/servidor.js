const net = require('net');

var clients = {};
var contador = 0;
var matriz = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

var server = net.createServer(function (socket) {
  // adiciona o cliente à lista de clientes
  socket.id = contador;
  contador += 1;
  clients[socket.id] = socket;

  socket.write('Bem-vindo ao Jogo da Velha!\n');
  socket.write(`Bem vindo, você é o jogador ${socket.id + 1}`);

  //fazer as funções fora do escopo principal, como é o broadcast
  //primeiro, definir quem vai ficar com x ou o (tem que ser passado antes);
  //depois tem que pegar a resposta do jogador e fazer a jogada no tabuleiro (isso aqui tem que ser no 'data')
  //depois, basta verificar se alguém ganhou também no 'data'
  //se ganhou, mostra na tela



  // lógica para lidar com as solicitações dos clientes
  socket.on('data', function(data) {
    const sender = socket;
    const senderId = socket.id;
    
    //validar se o usuário quer sair:
    //mensagem que vai cair no servidor
    console.log('Dados recebidos do cliente ' + socket.id + ': ' + data);

    //mensagem que irá para os clientes
    //broadcast(socket.id + ' diz: ' + data);
    message = `${socket.id} diz ${data}`;
    broadcast(message, senderId, clients);
  });

  // remove o cliente da lista de clientes quando ele desconectar
  socket.on('end', function() {
    let message = 'Cliente ' + socket.id + ' desconectado'; 
    //broadcast(message);
    delete clients[socket.id];
  });
});

server.listen(3000, 'localhost');

//manda mensagem apenas para os usuários que não são o socket que enviou
function broadcast(message, senderId, clients) {
    for (var clientId in clients){
        if(clients[clientId] !== clients[senderId]){
            clients[clientId].write(message);
        }
    }
}