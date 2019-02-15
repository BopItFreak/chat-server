console.log("Main script started.");
let ws = new WebSocket("ws://localhost:1919");
ws.onopen = () => {
console.log("CONNEC!");
}

var client = new Client(ws);
