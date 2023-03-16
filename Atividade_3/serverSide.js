const net = require('net');

//cria o servidor
const server = net.createServer();

//cria uma lista de sockets
let sockets = [];
//cria a "matriz" do jogo da velha
let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
//cria o player atual como X
let currentPlayer = 'X';

//assim que o socket se conecta, uma mensagem no servidor é lançada
server.on('connection', (socket) => {
  console.log('New client connected');

  //na linha abaixo o socket que se conectou ao servidor, e inserido na lista de sockets
  sockets.push(socket);

  //se a lista de sockets chegar ao tamanho 2, o jogo se inicia e uma mensagem é enviada aos jogadores
  if (sockets.length === 2) {
    broadcast(`Player 1 (X) turn`);
  }

  //O on 'data', é para tratar dadps recebidos pelo servidor (que o socket envia com write)
  socket.on('data', (data) => {
    //transforma a resposta do socket em inteiro (para que se adeque à posição da matriz de 0 à 8)
    if (data.toString() === 'end'){
        sockets.forEach((s) => s.destroy());
    }

    const move = parseInt(data, 10);
    
    //verifica se o movimento realizado é valido
    if (isNaN(move) || move < 0 || move > 8 || board[move] !== '-') {
      socket.write('Invalid move\n');
      return;
    }
    
    //aqui atualiza a lista/matriz do jogo da velha, com o valor do player atual
    board[move] = currentPlayer;
    
    //verifica vencedor passando como parâmetro o player atual
    if (checkWinner(currentPlayer)) {
      //envia a mensagem para o vencedor
      broadcast(`${currentPlayer} wins!`);
      broadcast('Game over');
      //para cada socket na lista de sockets, eles serão destruídos após a checagem caso o jogo tenha terminado
      sockets.forEach((s) => s.destroy());
      return;
    }
    
    /*
    aqui altera o player atual, após a jogada feita na linha 37, o player será alterado para 'O' se
    o player atual é o 'X' e para 'X' se o atual é o 'O', operador ternário
    */
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayer = nextPlayer;
    
    //manda a informação de quem é o jogador que ira jogar
    broadcast(`Player ${nextPlayer} (${currentPlayer}) turn`);
    broadcastBoard();
  });
  
  //quando o socket for desconectado
  socket.on('close', () => {
    console.log('Client disconnected');
    //envia um a mensagem aos outros sockets informando que um foi desconectado
    sockets = sockets.filter((s) => s !== socket);
    broadcast('Other player disconnected');
    sockets.forEach((s) => s.destroy());
  });

  //envia uma mensagem para cada socket na lista de sockets
  function broadcast(message) {
    sockets.forEach((s) => s.write(`${message}\n`));
  }

  //envia a lista/matriz do jogo da velha como uma matriz 3 X 3
  function broadcastBoard() {
    let boardMessage = '';
    for (let i = 0; i < 9; i++) {
      boardMessage += `${board[i]} `;
      if ((i + 1) % 3 === 0) {
        boardMessage += '\n';
      }
    }
    broadcast(boardMessage);
  }
  
  //verifica se o player atual é o vencedor
  function checkWinner(player) {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    /*
    pega todos as colunas que possivelmente fariam um vencedor e analizam se algumas dessas listas tem 
    o mesmo símbolo em sequencia, se sim, o jogo tem um vencedor
    */
    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    
    return false;
  }
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});