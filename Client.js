class Client {
  constructor(ws,user) {
//    super(ws,user);
    if (!ws) ws = {};
    if (!user) user = {
      nick: null,
      id: null
    };
    this.ws = ws;
    this.user = user;
    this.initevents();
  }

  //initevents
  initevents() {
    let fixedthis = this;
    this.ws.onmessage = function (msg) {
      msg = JSON.parse(msg.data);
        switch (msg.type) {
          case "servermsg": {
            console.log(msg.message);
            break;
          }
          case "chat": {
            console.log(msg.message);
            break;
          }
          case "id": {
            fixedthis.user.id = msg.id;
            break;
          }
          case "nick": {
            fixedthis.user.nick = msg.nick;
            break;
          }
        }
      }
      function heartbeat() {
          clearTimeout(this.ws.pingTimeout);
          this.ws.pingTimeout = setTimeout(() => {
            this.ws.terminate();
          }, 30000 + 1000);
      }

    this.ws.onclose = (code) => {
      console.warn(`ONCLOSE:`, code)
    }

    this.ws.onerror = error => {
      console.error(`WS ERR`,error);
    }
    this.ws.onopen, heartbeat);
    this.ws.onping, heartbeat);
    this.ws.onclose, function clear() {
      clearTimeout(this.ws.pingTimeout);
    });
  }


  chat(msg) {
    this.ws.send(`{"type": "chat", "message": "${msg}"}`);
  }

  setNick(nick) {
    this.ws.send(`{"type": "nick", "message": "${nick}"}`);
    this.nick = nick;
  }

};
