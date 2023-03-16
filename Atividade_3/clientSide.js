const net = require('net');

//cria um novo socket
const socket = new net.Socket();

//cria a lista/matriz do jogo da velha
let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

//mensagem que lança assim que o socket se conecta ao server
socket.connect(3000, 'localhost', () => {
  console.log('Connected to server');
});

//printa os dados recebidos do servidor (quando o server manda com o write)
socket.on('data', (data) => {
  console.log(data.toString());
});

//faz a função que verifica o movimento realizado pelo jogador atual (socket atual)
function makeMove(move) {
  //se o local enviado for diferente do "valor padrão do jogo", ele retorna como movimento inválido
  if (board[move] !== '-') {
    console.log('Invalid move');
    return;
  }
  
  /*
  caso o valor padrão esteja o local, é substituído pelo valor do player atual 
  (que é alterado nas linhas 53 e 54 no arquivo serverSide.js)
  */
  board[move] = 'X';
  //transforma o valor recebido em string e envia para a matriz/lista do jogo da velha
  socket.write(move.toString());
}

//função para printar a lista/matriz do jogo da velha como uma matriz 3 X 3
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


//solicita o valor para que seja passado como movimento para a matriz
process.stdin.on('data', (data) => {
  const move = parseInt(data.toString(), 10);
  //faz a verificação se o movimento é válido
  if (isNaN(move) || move < 0 || move > 8) {
    console.log('Invalid move');
    return;
  }
  
  //faz o movimento baseado na resposta
  makeMove(move);
  //printa a matriz 3 x 3
  printBoard();
});