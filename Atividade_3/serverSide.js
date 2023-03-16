const net = require('net');

//cria o servidor
const server = net.createServer();

//cria uma lista de sockets
let sockets = [];
//cria a "matriz" do jogo da velha
let jogo = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
//cria o player atual como X
let jogadorAtual = 'X';

var placar = {'X': 0, 'O': 0, 'Empate': 0};

//assim que o socket se conecta, uma mensagem no servidor é lançada
server.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  //na linha abaixo o socket que se conectou ao servidor, e inserido na lista de sockets
  sockets.push(socket);

  //se a lista de sockets chegar ao tamanho 2, o jogo se inicia e uma mensagem é enviada aos jogadores
  if (sockets.length === 2) {
    broadcast(`Sua vez: Jogador 1 (X)`);
  }

  //O on 'data', é para tratar dadps recebidos pelo servidor (que o socket envia com write)
  socket.on('data', (data) => {
    //transforma a resposta do socket em inteiro (para que se adeque à posição da matriz de 0 à 8)
    if (data.toString() === 'end'){
        sockets.forEach((s) => s.destroy());
    }

    const jogada = parseInt(data, 10);
    
    //verifica se o movimento realizado é valido
    if (isNaN(jogada) || jogada < 0 || jogada > 8 || jogo[jogada] !== '-') {
      socket.write('Movimento Inválido\n');
      return;
    }
    
    //aqui atualiza a lista/matriz do jogo da velha, com o valor do player atual
    jogo[jogada] = jogadorAtual;
    
    //verifica vencedor passando como parâmetro o player atual
    if (checkWinner(jogadorAtual)) {
      //envia a mensagem para o vencedor
      broadcast(`${jogadorAtual} wins!`);
      broadcast('Fim de jogo');
      //para cada socket na lista de sockets, eles serão destruídos após a checagem caso o jogo tenha terminado
      sockets.forEach((s) => s.destroy());
      console.log(placar);
      return;
    }
    
    /*
    aqui altera o player atual, após a jogada feita na linha 37, o player será alterado para 'O' se
    o player atual é o 'X' e para 'X' se o atual é o 'O', operador ternário
    */
    const proximoJogador = jogadorAtual === 'X' ? 'O' : 'X';
    jogadorAtual = proximoJogador;
    
    //manda a informação de quem é o jogador que ira jogar
    broadcast(`Sua vez jogador ${proximoJogador} (${jogadorAtual})`);
    broadcastBoard();
  });
  
  //quando o socket for desconectado
  socket.on('close', () => {
    console.log('Cliente Desconectado');
    //envia um a mensagem aos outros sockets informando que um foi desconectado
    sockets = sockets.filter((s) => s !== socket);
    broadcast('O outro jogador desconectou');
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
      boardMessage += `${jogo[i]} `;
      if ((i + 1) % 3 === 0) {
        boardMessage += '\n';
      }
    }
    broadcast(boardMessage);
  }
  
  //verifica se o player atual é o vencedor
  function checkWinner(jogador) {
    const linhas = [
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
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if (jogo[a] === jogador && jogo[b] === jogador && jogo[c] === jogador) {
        placar[jogador] += 1;
        jogo = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
        return true;
      } else if (jogo.includes('-') === false){
        placar['Empate'] += 1;
        draw();
      }
    }
    
    return false;
  }

  function draw(){
    broadcast(`Empate`);
    broadcast('Fim de jogo');
    //para cada socket na lista de sockets, eles serão destruídos após a checagem caso o jogo tenha terminado
    sockets.forEach((s) => s.destroy());
    jogo = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    console.log(placar);
    return;
  }
    
});

server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});