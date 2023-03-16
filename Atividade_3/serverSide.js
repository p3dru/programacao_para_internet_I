const net = require('net');

const server = net.createServer();

let sockets = [];
let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
let currentPlayer = 'X';

server.on('connection', (socket) => {
  console.log('New client connected');

  sockets.push(socket);

  if (sockets.length === 2) {
    broadcast(`Player 1 (X) turn`);
  }

  socket.on('data', (data) => {
    const move = parseInt(data, 10);
    
    if (isNaN(move) || move < 0 || move > 8 || board[move] !== '-') {
      socket.write('Invalid move\n');
      return;
    }
    
    board[move] = currentPlayer;
    
    if (checkWinner(currentPlayer)) {
      broadcast(`${currentPlayer} wins!`);
      broadcast('Game over');
      sockets.forEach((s) => s.destroy());
      return;
    }
    
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayer = nextPlayer;
    
    broadcast(`Player ${nextPlayer} (${currentPlayer}) turn`);
    broadcastBoard();
  });
  
  socket.on('close', () => {
    console.log('Client disconnected');
    sockets = sockets.filter((s) => s !== socket);
    broadcast('Other player disconnected');
    sockets.forEach((s) => s.destroy());
  });

  function broadcast(message) {
    sockets.forEach((s) => s.write(`${message}\n`));
  }

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
