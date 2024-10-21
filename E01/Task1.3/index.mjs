import http from 'http';
import fs from 'fs';
import os from 'os';
import { formatSystemInfo } from './systemUtils.mjs';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                console.log(err)
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.url === '/data') {
        const uptime = os.uptime();
        const totalMemory = os.totalmem() / (1024 * 1024); 

        const systemInfo = formatSystemInfo(uptime, totalMemory);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(systemInfo));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

