import * as net from 'net';
import { ReadLine, createInterface } from 'readline';

const HOST = 'localhost';
const PORT = 3000;

const client = new net.Socket();
const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.connect(PORT, HOST, () => {
  //console.log(`Conectado ao servidor: ${HOST}:${PORT}`);
  console.log('Conectou');
    readline.addListener('line', line => {
        client.write(line);
    });
});

client.on('data', (data) => {
  console.log(`Mensagem recebida do servidor: ${data}`);
});

client.on('close', () => {
  console.log('Conexão com o servidor fechada');
});

process.stdin.on('data', (data) => {
  client.write(data);
});