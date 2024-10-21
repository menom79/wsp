
const os = require('node:os');

function getOsInfo(){
    const uptime = os.uptime(); 
    const totalMemory = os.totalmem(); 
    const platform = os.platform();
    const cpuArc = os.arch(); 

    return "uptime: " + uptime + " totalMemory: " + totalMemory + " platform: " + platform + " CPU Arc: " + cpuArc;
}
console.log("OS", getOsInfo())