import * as net from 'net';

const PORT = 3000;

//inicia o server
const server = net.createServer();

//armazena todos os sockets na coleção de valores set
const clients = new Set<net.Socket>();

server.on('connection', (socket: net.Socket) => {
  console.log(`Novo cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);

  // adiciona o novo cliente ao conjunto de clientes
  clients.add(socket);

  socket.on('data', (data) => {
    const str = data.toString();
    if (str === 'end'){
      console.log(`Desconectando cliente: ${socket.remoteAddress}:${socket.remotePort}`);
      socket.end();
    }
    console.log(str)

    // encaminha a mensagem para todos os outros clientes conectados excluindo o que enviou (para não ter redundância)
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`${socket.remoteAddress}:${socket.remotePort} diz: ${data}`);
      }
    });
  });

  socket.on('end', () => {
    console.log(`Cliente desconectado: ${socket.remoteAddress}:${socket.remotePort}`);

    // remove o cliente desconectado do conjunto de clientes
    clients.delete(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
