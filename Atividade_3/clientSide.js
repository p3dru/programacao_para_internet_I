const net = require('net');

const socket = new net.Socket();

let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

socket.connect(3000, 'localhost', () => {
  console.log('Connected to server');
});

socket.on('data', (data) => {
  console.log(data.toString());
});

function makeMove(move) {
  if (board[move] !== '-') {
    console.log('Invalid move');
    return;
  }
  
  board[move] = 'X';
  socket.write(move.toString());
}

function printBoard() {
  let boardMessage = '';
  for (let i = 0; i < 9; i++) {
    boardMessage += `${board[i]} `;
    if ((i + 1) % 3 === 0) {
      boardMessage += '\n';
    }
  }
  console.log(boardMessage);
}

process.stdin.on('data', (data) => {
  const move = parseInt(data.toString(), 10);
  if (isNaN(move) || move < 0 || move > 8) {
    console.log('Invalid move');
    return;
  }
  
  makeMove(move);
  printBoard();
});
