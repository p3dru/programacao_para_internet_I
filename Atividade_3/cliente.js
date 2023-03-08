"use strict";
exports.__esModule = true;
var net = require("net");
var readline_1 = require("readline");
var HOST = 'localhost';
var PORT = 3000;
var client = new net.Socket();
var readline = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
client.connect(PORT, HOST, function () {
    //console.log(`Conectado ao servidor: ${HOST}:${PORT}`);
    console.log('Conectou');
    readline.addListener('line', line => {
        client.write(line);
    });
});
client.on('data', function (data) {
    console.log("Mensagem recebida do servidor: ".concat(data));
});
client.on('close', function () {
    console.log('Conexão com o servidor fechada');
});
