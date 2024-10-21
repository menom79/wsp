const process = require('node:process');
let user = process.env.USER || ""
let currentDir = process.env.PWD || ""
let nodeversion = process.version || ""
let platForm = process.platform || ""

console.log('LOG: ', user, currentDir, nodeversion, platForm);
