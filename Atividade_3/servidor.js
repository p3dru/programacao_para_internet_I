"use strict";
exports.__esModule = true;
var net = require("net");
var PORT = 3000;
//inicia o server
var server = net.createServer();
//armazena todos os sockets na coleção de valores set
var clients = new Set();
server.on('connection', function (socket) {
    console.log("Novo cliente conectado: ".concat(socket.remoteAddress, ":").concat(socket.remotePort));
    // adiciona o novo cliente ao conjunto de clientes
    clients.add(socket);
    socket.on('data', function (data) {
        var str = data.toString();
        if (str === 'end') {
            console.log("Desconectando cliente: ".concat(socket.remoteAddress, ":").concat(socket.remotePort));
            socket.end();
        }
        console.log(str);
        // encaminha a mensagem para todos os outros clientes conectados excluindo o que enviou (para não ter redundância)
        clients.forEach(function (client) {
            if (client !== socket) {
                client.write("".concat(socket.remoteAddress, ":").concat(socket.remotePort, " diz: ").concat(data));
            }
        });
    });
    socket.on('end', function () {
        console.log("Cliente desconectado: ".concat(socket.remoteAddress, ":").concat(socket.remotePort));
        // remove o cliente desconectado do conjunto de clientes
        clients["delete"](socket);
    });
});
server.listen(PORT, function () {
    console.log("Servidor iniciado na porta ".concat(PORT));
});
