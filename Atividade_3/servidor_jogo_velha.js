const net = require('net');

let clients = [];
let currentTurn = 0;
let board = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-'],
];

const server = net.createServer((socket) => {
  console.log('Client connected');
  
  clients.push(socket);
  
  socket.write('Welcome to Tic Tac Toe!\n');
  socket.write(`You are player ${clients.length}\n`);
  socket.write(`Waiting for another player...\n`);
  
  if (clients.length === 2) {
    clients.forEach((client) => {
      client.write('Both players connected. Game starts!\n');
      client.write(`Player ${currentTurn + 1}'s turn.\n`);
      client.write(`  1 2 3\n1 ${board[0].join(' ')}\n2 ${board[1].join(' ')}\n3 ${board[2].join(' ')}\n`);
    });
  }
  
  socket.on('data', (data) => {
    if (clients.length !== 2) {
      socket.write('Waiting for another player...\n');
      return;
    }
    
    const input = data.toString().trim();
    const row = parseInt(input[0]) - 1;
    const col = parseInt(input[1]) - 1;
    
    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== '-') {
      socket.write('Invalid move. Try again.\n');
      return;
    }
    
    board[row][col] = currentTurn === 0 ? 'X' : 'O';
    
    clients.forEach((client) => {
      client.write(`Player ${currentTurn + 1} made a move.\n`);
      client.write(`  1 2 3\n1 ${board[0].join(' ')}\n2 ${board[1].join(' ')}\n3 ${board[2].join(' ')}\n`);
      if (checkWin() || checkDraw()) {
        endGame();
        return;
      }
      client.write(`Player ${currentTurn + 1 === 1 ? 2 : 1}'s turn.\n`);
    });
    
    currentTurn = currentTurn === 0 ? 1 : 0;
  });
  
  socket.on('end', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== socket);
    if (clients.length === 1) {
      clients[0].write('Other player disconnected. Game over.\n');
      clients[0].end();
      clients = [];
      board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ];
      currentTurn = 0;
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

//implementar checkwin, check draw e 
function checkWin() {
  if (board[0][0] !== '-' && board[0][0
