const WebSocket = require('ws');
let Client = require("./Client.js");
global.clients = [];
global.userids = 0;

const wss = new WebSocket.Server({
  port: 1919
});
console.log("Server started on port " + wss.options.port);

wss.on('connection', function connection(ws) {
clients.push(new Client(ws));

});
