const { Socket } = require('dgram');
const net = require('net');
const readline = require('readline');


const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(3000, 'localhost', () =>{
  console.log('conectou');
  rl.addListener('line', line => {
    client.write(line);
    if (line.toString() === 'end'){
      //client.write(line);
      client.end();
    }
  });


client.on('data', function(data){
  console.log(`${data.toString()}`);
})

})