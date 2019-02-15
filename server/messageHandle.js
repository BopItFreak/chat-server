module.exports = function handleMessage(msg,cl) {
try {
  msg = JSON.parse(msg);
} catch (err) {
  cl.servermsg("err parsing message");
  console.error(err);
}
  switch (msg.type) {
    case "chat": {
      msg.message ? cl.chat(msg.message) : {};
      break;
    }
    case "nick": {
      msg.message ? cl.setNick(msg.message) : {};
      break;
    }
  }
}
