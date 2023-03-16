/*
var clients = [];
var contador = 0;

clients[contador] = 'arroz';
contador += 1;
clients[contador] = 'feijão';

console.log(clients.length);
*/

const list = [[''], [''], [''], [''], [''], [''], [''], [''], ['']];
const rows = 3;
const cols = 3;

numero = 1;
if (numero === 1){
    list[0][0] = 1;
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const index = i * cols + j;
    if (index < list.length) {
      process.stdout.write(`${list[index]} `);
    } else {
      process.stdout.write('  ');
    }
  }
  process.stdout.write('\n');
}

