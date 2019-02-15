const EventEmitter = require("events").EventEmitter;
const WebSocket = require("ws");
const handleMessage = require("./messageHandle.js");
const deleteClient = require("./Clientdeleter.js");

module.exports = class Client extends EventEmitter {
  constructor(ws,user) {
    super(ws,user);
    if (!ws) ws = {};
    if (!user) user = {
      nick: "Anonymous",
      id: userids++
    };
    //this.nick = options.nick;
    //this.id = options.id;
    this.ws = ws;
    this.user = user;
    this.welcome();
    this.initevents();
  }

  //initevents
  initevents() {
    let fixedthis = this;
    function heartbeat() {
        this.isAlive = true;
    }
    this.ws.on("message", function (msg) {
      handleMessage(msg,fixedthis);
    });
    this.ws.on("close", function () {
      deleteClient(fixedthis,fixedthis.user.id);
    });
    this.ws.isAlive = true;
    this.ws.on('pong', heartbeat);
  }


  chat(msg) {
    this.allclientssend(`{"type": "chat", "message": "${this.user.nick}: ${msg}"}`)
  }

  setNick(nick) {
    this.ws.send(`{"type": "nick", "nick": "${nick}"}`);
    this.user.nick = nick;
  }

  setId(id) {
    this.ws.send(`{"type": "id", "id": "${id}"}`);
    this.user.id = id;
  }

  servermsg(msg) {
    this.ws.send(`{"type": "servermsg", "message": "Server: ${msg}"}`);
  }
  allclientssend(msg) {
    for (let cl of clients) {
      if (cl.ws.readyState !== WebSocket.OPEN) continue;
      cl.ws.send(msg);
    }
  }
  welcome() {
    this.setId(this.user.id);
    this.setNick(this.user.nick);
    this.servermsg(`Welcome ${this.user.id}!`);
    console.log(`New Client! ID: ${this.user.id}`);
  }

};
