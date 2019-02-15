process.on('uncaughtException', error => console.error(error.stack));
require("./connectionHandle.js");
