const WebSocket = require('ws');
let Client = require("./Client.js");
global.clients = [];
global.userids = 0;

const wss = new WebSocket.Server({
  port: 1919
});
console.log("Server started on port " + wss.options.port);

function noop() {}

wss.on('connection', function connection(ws) {
clients.push(new Client(ws));

});

//handle broken connections
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      return ws.terminate();
      console.log("Terminated");
    }
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);
