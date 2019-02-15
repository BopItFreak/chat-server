process.on('uncaughtException', error => console.error(error.stack));
process.on("unhandledRejection", console.error);
require("./connectionHandle.js");
