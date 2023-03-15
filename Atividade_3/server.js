const net = require('net');

var clients = {};

var server = net.createServer(function (socket) {
  // adiciona o cliente à lista de clientes
  socket.id = Math.random().toString().substring(2, 8);
  clients[socket.id] = socket;

  // lógica para lidar com as solicitações dos clientes
  socket.on('data', function(data) {
    //validar se o usuário quer sair:
    //mensagem que vai cair no servidor
    console.log('Dados recebidos do cliente ' + socket.id + ': ' + data);

    //mensagem que irá para os clientes
    broadcast(socket.id + ' diz: ' + data);
  });

  // remove o cliente da lista de clientes quando ele desconectar
  socket.on('end', function() {
    console.log('Cliente ' + socket.id + ' desconectado');
    delete clients[socket.id];
  });
});

server.listen(3000, 'localhost');

function broadcast(message) {
  for (var clientId in clients) {
    clients[clientId].write(message);
  }
}
